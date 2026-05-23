import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import type { HomeActionButtonsProps } from '../types/home.types';

const HomeActionButtons: React.FC<HomeActionButtonsProps> = ({ onCreateJoin, onHaveInviteCode }) => {
    return (
        <div className="flex flex-col items-center pb-2 pt-6 bg-white border-t border-gray-50 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] fixed bottom-24 left-0 right-0 z-50">
            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCreateJoin}
                className="w-full max-w-[280px] sm:max-w-[320px] bg-[#3B95EA] text-white py-4 rounded-[1.5rem] font-bold text-lg shadow-[0_10px_25px_rgba(59,149,234,0.25)] flex items-center justify-center gap-3 mb-2"
            >
                <PlusCircle size={24} strokeWidth={2.5} />
                <span>Create or Join a Household</span>
            </motion.button>

            <button 
                onClick={onHaveInviteCode}
                className="text-[#94A3B8] text-sm font-bold hover:text-primary transition-colors mb-0"
            >
                Have an invite code?
            </button>
        </div>
    );
};

export default HomeActionButtons;
