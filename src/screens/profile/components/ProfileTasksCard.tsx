import React from 'react';
import { motion } from 'framer-motion';
import type { ProfileUser } from '../types/profile.types';

interface ProfileTasksCardProps {
    user: ProfileUser | null;
    setIsTasksModalOpen: (val: boolean) => void;
    variants: any;
}

const ProfileTasksCard: React.FC<ProfileTasksCardProps> = ({
    user,
    setIsTasksModalOpen,
    variants
}) => {
    return (
        <motion.div variants={variants} className="bg-white p-6 rounded-[2.5rem] shadow-premium-sm border border-slate-50">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-slate-900 font-black tracking-tight">Preferred Tasks</h3>
                <button 
                    onClick={() => setIsTasksModalOpen(true)}
                    className="text-primary text-xs font-black uppercase tracking-widest hover:opacity-70 transition-opacity"
                >
                    Manage
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {user?.preferredTaskTypes && user.preferredTaskTypes.length > 0 ? (
                    user.preferredTaskTypes.map((type: any) => (
                        <span key={type.id} className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-black">
                            {type.name}
                        </span>
                    ))
                ) : (
                    <p className="text-xs font-bold text-slate-400 italic">No task preferences set yet</p>
                )}
            </div>
        </motion.div>
    );
};

export default ProfileTasksCard;
