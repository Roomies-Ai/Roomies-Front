import React, { useState } from 'react';
import { Moon, Plus, X, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProfileFormState } from '../types/profile.types';

interface ProfileVibesCardProps {
    editForm: ProfileFormState;
    isEditing: boolean;
    addVibe: (vibe: string) => void;
    removeVibe: (vibe: string) => void;
    togglePreference: (key: string) => void;
    variants: any;
}

const ProfileVibesCard: React.FC<ProfileVibesCardProps> = ({
    editForm,
    isEditing,
    addVibe,
    removeVibe,
    togglePreference,
    variants
}) => {
    const [isAddingVibe, setIsAddingVibe] = useState(false);
    const [newVibe, setNewVibe] = useState('');

    const confirmAddVibe = () => {
        if (newVibe.trim()) addVibe(newVibe);
        setNewVibe('');
        setIsAddingVibe(false);
    };

    return (
        <motion.div variants={variants} className="bg-white p-6 rounded-[2.5rem] shadow-premium-sm border border-slate-50">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-slate-900 font-black tracking-tight">Roomie Vibes</h3>
                <div className="w-8 h-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center">
                    <Moon size={16} />
                </div>
            </div>

            {/* Vibe Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
                {editForm.vibes.map((vibe: string, idx: number) => (
                    <motion.span 
                        key={idx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-4 py-2 bg-[#FEF3C7] text-[#92400E] rounded-xl text-xs font-black flex items-center gap-2"
                    >
                        {vibe === 'Night Owl' && <Moon size={12} />}
                        {vibe}
                        {isEditing && (
                            <button onClick={() => removeVibe(vibe)} className="hover:text-red-500">
                                <X size={12} />
                            </button>
                        )}
                    </motion.span>
                ))}
                {isAddingVibe ? (
                    <input
                        autoFocus
                        value={newVibe}
                        onChange={(e) => setNewVibe(e.target.value)}
                        onBlur={confirmAddVibe}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') confirmAddVibe();
                            if (e.key === 'Escape') {
                                setNewVibe('');
                                setIsAddingVibe(false);
                            }
                        }}
                        placeholder="e.g. Night Owl"
                        className="px-4 py-2 bg-white text-slate-900 rounded-xl text-xs font-black border-2 border-primary/40 outline-none w-28"
                    />
                ) : (
                    <button
                        onClick={() => setIsAddingVibe(true)}
                        className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-xs font-black flex items-center gap-2 border-2 border-dashed border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                        <Plus size={12} /> Add Vibe
                    </button>
                )}
            </div>

            {/* Preferences Toggles */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center transition-colors ${editForm.preferences.loudMusic ? 'bg-blue-50 text-primary' : 'bg-white text-slate-400'}`}>
                            {editForm.preferences.loudMusic ? <Volume2 size={18} /> : <VolumeX size={18} />}
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-900">Loud Music?</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Okay during the day</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => togglePreference('loudMusic')}
                        className={`w-12 h-6 rounded-full transition-all relative ${editForm.preferences.loudMusic ? 'bg-primary shadow-inner shadow-blue-600' : 'bg-slate-200'}`}
                    >
                        <motion.div 
                            animate={{ x: editForm.preferences.loudMusic ? 24 : 4 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileVibesCard;
