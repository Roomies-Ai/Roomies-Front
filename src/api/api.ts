import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL || "http://localhost:3000/api",
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

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await rawBaseQuery(args, api, extraOptions);

    const errorData = result.error?.data as { code?: string } | undefined;

    if (result.error && result.error.status === 401 && errorData?.code === "TOKEN_EXPIRED") {

        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult = await rawBaseQuery(
                    {
                        url: "/auth/refresh",
                        method: "POST",
                    },
                    api,
                    extraOptions
                );

                if (refreshResult.data) {
                    const { accessToken } = refreshResult.data as { accessToken: string };

                    localStorage.setItem("token", accessToken);

                    result = await rawBaseQuery(args, api, extraOptions);
                } else {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await rawBaseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["CalendarStatus", "Household"],
    endpoints: () => ({}),
});