import { api } from './api';

export const calendarApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCalendarStatus: builder.query<{ connected: boolean; calendarSyncEnabled: boolean }, void>({
            query: () => '/google-calendar/status',
            providesTags: ['CalendarStatus'],
        }),
        getConnectUrl: builder.query<{ url: string }, void>({
            query: () => '/google-calendar/connect',
        }),
        toggleSync: builder.mutation<{ calendarSyncEnabled: boolean }, void>({
            query: () => ({
                url: '/google-calendar/toggle',
                method: 'PATCH',
            }),
            invalidatesTags: ['CalendarStatus'],
        }),
        disconnectCalendar: builder.mutation<void, void>({
            query: () => ({
                url: '/google-calendar/disconnect',
                method: 'DELETE',
            }),
            invalidatesTags: ['CalendarStatus'],
        }),
    }),
});

export const {
    useGetCalendarStatusQuery,
    useLazyGetConnectUrlQuery,
    useToggleSyncMutation,
    useDisconnectCalendarMutation,
} = calendarApi;
