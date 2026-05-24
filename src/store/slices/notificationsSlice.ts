import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

export const fetchMyNotifications = createAsyncThunk(
    'notifications/fetchMy',
    async () => notificationsApi.getMyNotifications()
);

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
            .addCase(fetchMyNotifications.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMyNotifications.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.items = action.payload;
                state.unreadCount = action.payload.length;
                state.loading = false;
            })
            .addCase(fetchMyNotifications.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { clearUnread } = notificationsSlice.actions;
export default notificationsSlice.reducer;
