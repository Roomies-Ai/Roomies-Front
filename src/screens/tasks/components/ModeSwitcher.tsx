import { ListPlus, Sparkles } from 'lucide-react';
import type { ModeSwitcherProps } from './AddTaskModal.types';

const ModeSwitcher = ({ mode, setMode }: ModeSwitcherProps) => (
    <div className="flex p-1.5 bg-slate-100 rounded-3xl">
        <button 
            onClick={() => setMode('MANUAL')}
            className={`flex-1 py-3 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${mode === 'MANUAL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
        >
            <ListPlus size={18} />
            Manual
        </button>
        <button 
            onClick={() => setMode('AI')}
            className={`flex-1 py-3 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${mode === 'AI' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
        >
            <Sparkles size={18} />
            Magic AI
        </button>
    </div>
);

export default ModeSwitcher;
