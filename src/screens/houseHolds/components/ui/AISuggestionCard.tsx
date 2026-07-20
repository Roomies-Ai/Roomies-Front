import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import type { AISuggestionCardProps } from '../../HouseholdDetail.types';

const AISuggestionCard = ({ suggestion }: AISuggestionCardProps) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border-2 border-[#3B95EA]/20 p-4 rounded-[2.5rem] mb-4"
        >
            <div className="flex items-center gap-3 mb-2">
                <Sparkles size={18} className="text-[#3B95EA]" />
                <span className="text-sm font-black text-[#3B95EA] uppercase tracking-wider">AI Recommendation</span>
            </div>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
                I recommend <span className="font-black text-slate-900">{suggestion.username}</span> {suggestion.reason}
            </p>
        </motion.div>
    );
};

export default AISuggestionCard;
