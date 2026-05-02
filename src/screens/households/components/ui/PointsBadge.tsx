import { motion } from 'framer-motion';

import type { PointsBadgeProps } from '../../HouseholdDetail.types';

const PointsBadge = ({ points, onClick, interactive = false }: PointsBadgeProps) => {
    return (
        <motion.button 
            whileHover={interactive ? { scale: 1.05 } : {}}
            whileTap={interactive ? { scale: 0.95 } : {}}
            onClick={onClick}
            className={`px-3 py-1.5 rounded-xl border transition-all ${
                interactive 
                ? 'bg-blue-50 border-blue-100 text-[#3B95EA] hover:bg-blue-100 cursor-pointer' 
                : 'bg-slate-50 border-slate-100 text-slate-900 cursor-default'
            }`}
        >
            <span className="text-xs font-black">{points} pts</span>
        </motion.button>
    );
};

export default PointsBadge;
