import React from 'react';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileSecurityCardProps {
    setIsPasswordModalOpen: (val: boolean) => void;
    variants: any;
}

const ProfileSecurityCard: React.FC<ProfileSecurityCardProps> = ({ 
    setIsPasswordModalOpen, 
    variants 
}) => {
    return (
        <motion.div variants={variants} className="bg-white p-6 rounded-[2.5rem] shadow-premium-sm border border-slate-50">
            <h3 className="text-slate-900 font-black tracking-tight mb-6">Security</h3>
            <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400">
                        <Lock size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900">Password</p>
                        <p className="text-xs font-bold text-slate-400">••••••••••••</p>
                    </div>
                </div>
                <button 
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors"
                >
                    Change
                </button>
            </div>
        </motion.div>
    );
};

export default ProfileSecurityCard;
