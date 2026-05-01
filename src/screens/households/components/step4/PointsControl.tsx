import { Minus, Plus, Star } from 'lucide-react';

import type { PointsControlProps } from './Step4.types';

const PointsControl: React.FC<PointsControlProps> = ({ points, onChange }) => {
    return (
        <div className="flex items-center gap-3 bg-gray-100/50 px-2 py-1 rounded-full border border-gray-100">
            <button 
                onClick={() => onChange(Math.max(1, points - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-transparent border-none text-charcoal hover:bg-white transition-all active:scale-90"
            >
                <Minus size={14} strokeWidth={2.5} />
            </button>
            
            <div className="flex items-center gap-1.5 min-w-[60px] justify-center">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <input 
                    type="number"
                    min="1"
                    max="10"
                    value={points}
                    onChange={(e) => onChange(parseInt(e.target.value) || 1)}
                    className="w-8 bg-transparent border-none p-0 focus:ring-0 text-xs font-bold text-charcoal text-center outline-none"
                />
                <span className="text-[10px] font-bold text-medium-gray uppercase tracking-tighter">Pts</span>
            </div>

            <button 
                onClick={() => onChange(Math.min(10, points + 1))}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-transparent border-none text-charcoal hover:bg-white transition-all active:scale-90"
            >
                <Plus size={14} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default PointsControl;
