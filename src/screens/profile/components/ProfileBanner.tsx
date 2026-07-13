import React, { useRef, useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import type { ProfileUser } from '../types/profile.types';
import Avatar from '../../../components/ui/Avatar';
import { fileToResizedDataUrl } from '../../../utils/image';

interface ProfileBannerProps {
    user: ProfileUser | null;
    onPictureChange?: (dataUrl: string) => Promise<void> | void;
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({ user, onPictureChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file || !onPictureChange) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        setIsUploading(true);
        try {
            const dataUrl = await fileToResizedDataUrl(file);
            await onPictureChange(dataUrl);
        } catch (err) {
            console.error('Failed to update profile picture', err);
        } finally {
            setIsUploading(false);
        }
    };

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
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-2xl shadow-lg border-4 border-[#F8FAFC] flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-60 disabled:hover:scale-100"
                    aria-label="Change profile picture"
                >
                    {isUploading ? (
                        <Loader2 size={18} strokeWidth={2.5} className="animate-spin" />
                    ) : (
                        <Camera size={18} strokeWidth={2.5} />
                    )}
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
