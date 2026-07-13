import React from 'react';
import { Camera } from 'lucide-react';
import type { ProfileUser } from '../types/profile.types';
import Avatar from '../../../components/ui/Avatar';

interface ProfileBannerProps {
    user: ProfileUser | null;
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({ user }) => {
    return (
        <div className="flex flex-col items-center gap-4 relative">
            <div className="relative">
                <div className="w-32 h-32 rounded-[2.5rem] bg-white shadow-premium p-1.5 border border-slate-100">
                    <Avatar
                        src={user?.profilePicture}
                        name={user?.username}
                        alt="Avatar"
                        className="w-full h-full rounded-[2.2rem] text-3xl"
                    />
                </div>
                <button 
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-2xl shadow-lg border-4 border-[#F8FAFC] flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="Change profile picture"
                >
                    <Camera size={18} strokeWidth={2.5} />
                </button>
            </div>
            
            <div className="text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{user?.username}</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Roomie since {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2023'}
                </p>
                <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                    {user?.role || 'Household Member'}
                </span>
            </div>
        </div>
    );
};

export default ProfileBanner;
