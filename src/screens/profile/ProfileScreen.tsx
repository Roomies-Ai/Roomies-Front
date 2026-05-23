import { motion } from 'framer-motion';
import { useAppDispatch } from '../../store/hooks';
import { setUser as setReduxUser } from '../../store/slices/authSlice';

// Components
import ProfileHeader from './components/ProfileHeader';
import ProfileBanner from './components/ProfileBanner';
import ProfileDetailsCard from './components/ProfileDetailsCard';
import ProfileSecurityCard from './components/ProfileSecurityCard';
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
        togglePreference,
        addVibe,
        removeVibe
    } = useProfile();

    return (
        <div className="bg-[#F8FAFC] min-h-screen pb-24">
            <ProfileHeader />

            {!user ? (
                <ProfileSkeleton />
            ) : (
                <motion.div 
                    variants={CONTAINER_VARIANTS}
                    initial="hidden"
                    animate="visible"
                    className="px-6 py-8 flex flex-col gap-8 max-w-lg md:max-w-2xl mx-auto"
                >
                    <ProfileBanner user={user} />

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

                    <ProfileVibesCard 
                        editForm={editForm}
                        isEditing={isEditing}
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
