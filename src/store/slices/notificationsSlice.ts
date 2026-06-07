import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { notificationsApi } from '../../api/notifications.api';

interface NotificationsState {
    items: any[];
    unreadCount: number;
    loading: boolean;
}

const initialState: NotificationsState = {
    items: [],
    unreadCount: 0,
    loading: false,
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        clearUnread: (state) => {
            state.unreadCount = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(notificationsApi.endpoints.getMyNotifications.matchPending, (state) => {
                state.loading = true;
            })
            .addMatcher(notificationsApi.endpoints.getMyNotifications.matchFulfilled, (state, action: PayloadAction<any[]>) => {
                state.items = action.payload;
                state.unreadCount = action.payload.length;
                state.loading = false;
            })
            .addMatcher(notificationsApi.endpoints.getMyNotifications.matchRejected, (state) => {
                state.loading = false;
            });
    },
});

export const { clearUnread } = notificationsSlice.actions;
export default notificationsSlice.reducer;
