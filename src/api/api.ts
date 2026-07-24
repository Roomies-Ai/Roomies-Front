import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

// 1. יצירת Mutex למניעת כפילויות של בקשות Refresh במקביל
const mutex = new Mutex();

// 2. ה-BaseQuery המקורי שלך
const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL || "http://localhost:3000",
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        if (!headers.has("Content-Type")) {
            headers.set("Content-Type", "application/json");
        }
        return headers;
    },
});

// 3. ה-"Interceptor" שיושב באמצע ומטפל ב-401 מסוג TOKEN_EXPIRED
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // ממתינים במידה ובקשה אחרת כבר מריצה כרגע Refresh
    await mutex.waitForUnlock();

    // ביצוע הבקשה המקורית
    let result = await rawBaseQuery(args, api, extraOptions);

    // חילוץ השגיאה מתוך התשובה
    const errorData = result.error?.data as { code?: string } | undefined;

    // בדיקה: האם חזרה שגיאת 401 והשרת ציין שהטוקן פג תוקף?
    if (result.error && result.error.status === 401 && errorData?.code === "TOKEN_EXPIRED") {

        // אם ה-Mutex אינו נעול, אנחנו הבקשה הראשונה שמנסה לרענן
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                // שליחת בקשה לקבלת Token חדש (למשל מנתיב refresh)
                const refreshResult = await rawBaseQuery(
                    {
                        url: "/auth/refresh",
                        method: "POST",
                    },
                    api,
                    extraOptions
                );

                if (refreshResult.data) {
                    const { newToken } = refreshResult.data as { newToken: string };

                    // שמיעת הטוקן החדש ב-localStorage (או ב-Redux State)
                    localStorage.setItem("token", newToken);

                    // הרצה חוזרת של הבקשה המקורית שנכשלה
                    result = await rawBaseQuery(args, api, extraOptions);
                } else {
                    // ה-Refresh נכשל -> מוחקים את הטוקן ומפנים ל-Login
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
            } finally {
                // שחרור הנעילה כדי לתת לבקשות האחרות להמשיך
                release();
            }
        } else {
            // במידה ובקשה אחרת כבר ריעננה את הטוקן, פשוט נריץ מחדש עם הטוקן החדש ב-Storage
            await mutex.waitForUnlock();
            result = await rawBaseQuery(args, api, extraOptions);
        }
    }

    return result;
};

// 4. הגדרת ה-API הראשי
export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth, // <--- שימוש ב-baseQuery המוטמע
    tagTypes: ["CalendarStatus", "Household"],
    endpoints: () => ({}),
});