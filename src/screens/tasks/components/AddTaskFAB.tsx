import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';

interface AddTaskFABProps {
    onClick: () => void;
}

const AddTaskFAB: React.FC<AddTaskFABProps> = ({ onClick }) => {
    return (
        <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="fixed bottom-32 right-8 w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] shadow-2xl shadow-slate-900/20 flex items-center justify-center z-50 group overflow-hidden"
        >
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Plus size={32} strokeWidth={3} className="relative z-10" />
            <div className="absolute top-0 right-0 p-1">
                <Sparkles size={12} className="text-white/40" />
            </div>
        </motion.button>
    );
};

export default AddTaskFAB;
