import { api } from "./api";

export const notificationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMyNotifications: builder.query<any[], void>({
            query: () => '/notifications/my',
        }),
    }),
});

export const { useGetMyNotificationsQuery } = notificationsApi;
