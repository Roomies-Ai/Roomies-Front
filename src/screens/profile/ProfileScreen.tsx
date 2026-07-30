import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { setUser as setReduxUser, logout } from '../../store/slices/authSlice';
import { useLogoutMutation } from '../../api/auth.api';

// Components
import ProfileBanner from './components/ProfileBanner';
import ProfileDetailsCard from './components/ProfileDetailsCard';
import ProfileSecurityCard from './components/ProfileSecurityCard';
import ProfileTelegramCard from './components/ProfileTelegramCard';
import ProfileGoogleCalendarCard from './components/ProfileGoogleCalendarCard';
import ProfileVibesCard from './components/ProfileVibesCard';
import ProfileTasksCard from './components/ProfileTasksCard';
import ChangePasswordModal from './components/ChangePasswordModal';
import PreferredTasksModal from './components/PreferredTasksModal';
import ProfileSkeleton from './components/ProfileSkeleton';

// Hooks & Types
import { useProfile } from './hooks/useProfile';

import { CONTAINER_VARIANTS, ITEM_VARIANTS } from './constants/profile.constants';


const ProfileScreen = () => {
    const dispatch = useAppDispatch();
    const [logoutMutation] = useLogoutMutation();
    const {
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
        handleDeleteProfilePicture,
        togglePreference,
        addVibe,
        removeVibe,
        telegramToken,
        telegramLoading,
        handleUnlinkTelegram,
        calendarStatus,
        calendarLoading,
        handleConnectCalendar,
        handleToggleCalendar,
        handleDisconnectCalendar,
    } = useProfile();

    const handleLogout = async () => {
        await logoutMutation();
        dispatch(logout());
    };

    return (
        <div className="bg-[#F8FAFC] min-h-screen pb-24">

            {!user ? (
                <ProfileSkeleton />
            ) : (
                <motion.div
                    variants={CONTAINER_VARIANTS}
                    initial="hidden"
                    animate="visible"
                    className="relative px-6 py-8 flex flex-col gap-8 max-w-lg md:max-w-2xl mx-auto"
                >
                    <button
                        onClick={handleLogout}
                        className="absolute top-8 right-6 p-3 bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-2xl shadow-premium-sm active:scale-95 transition-all flex items-center justify-center border border-slate-100/80"
                        aria-label="Logout"
                    >
                        <LogOut size={20} />
                    </button>

                    <ProfileBanner
                        user={user}
                        onPictureChange={handleUpdateProfilePicture}
                        onPictureDelete={handleDeleteProfilePicture}
                    />

                    <ProfileDetailsCard
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        editForm={editForm}
                        setEditFormField={setEditFormField}
                        handleUpdateProfile={handleUpdateProfile}
                        loading={loading}
                        variants={ITEM_VARIANTS}
                    />

                    <ProfileSecurityCard
                        setIsPasswordModalOpen={setIsPasswordModalOpen}
                        variants={ITEM_VARIANTS}
                    />

                    <ProfileTelegramCard
                        user={user}
                        telegramToken={telegramToken}
                        telegramLoading={telegramLoading}
                        onUnlink={handleUnlinkTelegram}
                        variants={ITEM_VARIANTS}
                    />

                    <ProfileGoogleCalendarCard
                        calendarStatus={calendarStatus}
                        calendarLoading={calendarLoading}
                        onConnect={handleConnectCalendar}
                        onToggle={handleToggleCalendar}
                        onDisconnect={handleDisconnectCalendar}
                        variants={ITEM_VARIANTS}
                    />

                    <ProfileVibesCard
                        editForm={editForm}
                        addVibe={addVibe}
                        removeVibe={removeVibe}
                        togglePreference={togglePreference}
                        variants={ITEM_VARIANTS}
                    />

                    <ProfileTasksCard
                        user={user}
                        setIsTasksModalOpen={setIsTasksModalOpen}
                        variants={ITEM_VARIANTS}
                    />
                </motion.div>
            )}

            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
            />

            <PreferredTasksModal
                isOpen={isTasksModalOpen}
                onClose={() => setIsTasksModalOpen(false)}
                user={user}
                onUpdate={(updatedUser) => {
                    setUser(updatedUser);
                    dispatch(setReduxUser(updatedUser));
                }}
            />
        </div>
    );
};

export default ProfileScreen;
