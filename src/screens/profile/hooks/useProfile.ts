import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../../api/user.api";
import { calendarApi } from "../../../api/calendar.api";
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
  const [calendarStatus, setCalendarStatus] = useState<{
    connected: boolean;
    calendarSyncEnabled: boolean;
  } | null>(null);
  const [calendarLoading, setCalendarLoading] = useState(false);

  // Form State
  const [editForm, setEditForm] = useState<ProfileFormState>({
    username: reduxUser?.username || "",
    email: reduxUser?.email || "",
    phoneNumber: reduxUser?.phoneNumber || "",
    vibes: reduxUser?.vibes || [],
    preferences: reduxUser?.preferences || { loudMusic: false },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userApi.getMe();
        setUser(data);
        dispatch(setReduxUser(data)); // Sync with Redux & LocalStorage
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
  }, [dispatch]);

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

  useEffect(() => {
    calendarApi.getStatus().then(setCalendarStatus).catch(console.error);
  }, []);

  // Detect OAuth callback redirect (?calendar=connected) and refresh status
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("calendar") === "connected") {
      calendarApi.getStatus().then(setCalendarStatus).catch(console.error);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const handleConnectCalendar = useCallback(async () => {
    setCalendarLoading(true);
    try {
      const { url } = await calendarApi.getConnectUrl();
      window.location.href = url;
    } catch (err) {
      console.error("Calendar connect failed", err);
      setCalendarLoading(false);
    }
  }, []);

  const handleToggleCalendar = useCallback(async () => {
    setCalendarLoading(true);
    try {
      const result = await calendarApi.toggleSync();
      setCalendarStatus((prev) =>
        prev
          ? { ...prev, calendarSyncEnabled: result.calendarSyncEnabled }
          : null,
      );
    } catch (err) {
      console.error("Calendar toggle failed", err);
    } finally {
      setCalendarLoading(false);
    }
  }, []);

  const handleDisconnectCalendar = useCallback(async () => {
    setCalendarLoading(true);
    try {
      await calendarApi.disconnect();
      setCalendarStatus({ connected: false, calendarSyncEnabled: false });
    } catch (err) {
      console.error("Calendar disconnect failed", err);
    } finally {
      setCalendarLoading(false);
    }
  }, []);

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
