import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../../api/user.api";
import {
  useGetCalendarStatusQuery,
  useLazyGetConnectUrlQuery,
  useToggleSyncMutation,
  useDisconnectCalendarMutation,
} from "../../../api/calendar.api";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { setUser as setReduxUser } from "../../../store/slices/authSlice";
import type { ProfileUser, ProfileFormState } from "../types/profile.types";

export const useProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user: reduxUser } = useAppSelector((state) => state.auth);

  const [user, setUser] = useState<ProfileUser | null>(
    reduxUser as ProfileUser,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [telegramToken, setTelegramToken] = useState<string | null>(null);
  const [telegramLoading, setTelegramLoading] = useState(false);

  // RTK Query hooks
  const { data: calendarStatus, refetch: refetchCalendarStatus } = useGetCalendarStatusQuery();
  const [triggerGetConnectUrl, { isFetching: connectUrlLoading }] = useLazyGetConnectUrlQuery();
  const [toggleSync, { isLoading: toggleSyncLoading }] = useToggleSyncMutation();
  const [disconnectCalendar, { isLoading: disconnectLoading }] = useDisconnectCalendarMutation();

  const calendarLoading = connectUrlLoading || toggleSyncLoading || disconnectLoading;

  // Form State
  const [editForm, setEditForm] = useState<ProfileFormState>({
    username: reduxUser?.username || "",
    email: reduxUser?.email || "",
    phoneNumber: reduxUser?.phoneNumber || "",
    vibes: reduxUser?.vibes || [],
    preferences: reduxUser?.preferences || { loudMusic: false },
  });

  // Initial fetch — only if user data isn't already in Redux
  useEffect(() => {
    if (reduxUser?.id) {
      setUser(reduxUser as ProfileUser);
      return;
    }
    const fetchUser = async () => {
      try {
        const data = await userApi.getMe();
        setUser(data);
        dispatch(setReduxUser(data));
        setEditForm({
          username: data.username,
          email: data.email,
          phoneNumber: data.phoneNumber || "",
          vibes: data.vibes || [],
          preferences: data.preferences || { loudMusic: false },
        });
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, [dispatch, reduxUser?.id]);

  useEffect(() => {
    if (user && !user.telegramChatId) {
      userApi
        .getTelegramToken()
        .then(({ telegramToken }) => setTelegramToken(telegramToken))
        .catch(console.error);
    }
  }, [user?.telegramChatId]);

  // Poll for telegramChatId while not yet connected
  useEffect(() => {
    if (!user || user.telegramChatId) return;

    const interval = setInterval(async () => {
      try {
        const data = await userApi.getMe();
        if (data.telegramChatId) {
          setUser(data);
          dispatch(setReduxUser(data));
        }
      } catch {
        // silent — keep polling
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [user?.telegramChatId, dispatch]);

  // Detect OAuth callback redirect (?calendar=connected) and refresh status
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("calendar") === "connected") {
      refetchCalendarStatus();
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [refetchCalendarStatus]);

  const handleConnectCalendar = useCallback(async () => {
    try {
      const result = await triggerGetConnectUrl().unwrap();
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      console.error("Calendar connect failed", err);
    }
  }, [triggerGetConnectUrl]);

  const handleToggleCalendar = useCallback(async () => {
    try {
      await toggleSync().unwrap();
    } catch (err) {
      console.error("Calendar toggle failed", err);
    }
  }, [toggleSync]);

  const handleDisconnectCalendar = useCallback(async () => {
    try {
      await disconnectCalendar().unwrap();
    } catch (err) {
      console.error("Calendar disconnect failed", err);
    }
  }, [disconnectCalendar]);

  const handleUnlinkTelegram = useCallback(async () => {
    setTelegramLoading(true);
    try {
      await userApi.unlinkTelegram();
      const data = await userApi.getMe();
      setUser(data);
      dispatch(setReduxUser(data));
      setTelegramToken(null);
    } catch (err) {
      console.error("Unlink failed", err);
    } finally {
      setTelegramLoading(false);
    }
  }, [dispatch]);

  const handleUpdateProfile = useCallback(async () => {
    setLoading(true);
    try {
      const updated = await userApi.updateMe(editForm);
      setUser(updated);
      dispatch(setReduxUser(updated));
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  }, [editForm, dispatch]);

  const handleUpdateProfilePicture = useCallback(
    async (profilePicture: string) => {
      try {
        const updated = await userApi.updateMe({ profilePicture });
        setUser(updated);
        dispatch(setReduxUser(updated));
      } catch (err) {
        console.error("Profile picture update failed", err);
      }
    },
    [dispatch],
  );

  const togglePreference = useCallback((key: string) => {
    setEditForm((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key],
      },
    }));
  }, []);

  const addVibe = useCallback(() => {
    setEditForm((prev) => {
      const vibe = prompt("Enter a new vibe (e.g. Night Owl, Clean Freak)");
      if (vibe && !prev.vibes.includes(vibe)) {
        return { ...prev, vibes: [...prev.vibes, vibe] };
      }
      return prev;
    });
  }, []);

  const removeVibe = useCallback((vibe: string) => {
    setEditForm((prev) => ({
      ...prev,
      vibes: prev.vibes.filter((v: string) => v !== vibe),
    }));
  }, []);

  const setEditFormField = useCallback(
    (field: keyof ProfileFormState, value: any) => {
      setEditForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  return useMemo(
    () => ({
      user,
      setUser,
      isEditing,
      setIsEditing,
      isPasswordModalOpen,
      setIsPasswordModalOpen,
      isTasksModalOpen,
      setIsTasksModalOpen,
      loading,
      editForm,
      setEditFormField,
      handleUpdateProfile,
      handleUpdateProfilePicture,
      togglePreference,
      addVibe,
      removeVibe,
      navigate,
      telegramToken,
      telegramLoading,
      handleUnlinkTelegram,
      calendarStatus,
      calendarLoading,
      handleConnectCalendar,
      handleToggleCalendar,
      handleDisconnectCalendar,
    }),
    [
      user,
      setUser,
      isEditing,
      setIsEditing,
      isPasswordModalOpen,
      setIsPasswordModalOpen,
      isTasksModalOpen,
      setIsTasksModalOpen,
      loading,
      editForm,
      setEditFormField,
      handleUpdateProfile,
      handleUpdateProfilePicture,
      togglePreference,
      addVibe,
      removeVibe,
      navigate,
      telegramToken,
      telegramLoading,
      handleUnlinkTelegram,
      calendarStatus,
      calendarLoading,
      handleConnectCalendar,
      handleToggleCalendar,
      handleDisconnectCalendar,
    ],
  );
};
