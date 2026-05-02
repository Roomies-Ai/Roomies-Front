import { Calendar } from 'lucide-react';
import type { AiTaskDateDropdownProps } from './AddTaskModal.types';

const AiTaskDateDropdown = ({ suggestion, index, suggestions, setSuggestions }: AiTaskDateDropdownProps) => {
    return (
        <div 
            className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100 relative cursor-pointer group/date"
            onClick={(e) => e.stopPropagation()}
        >
            <Calendar size={8} className="text-slate-400" />
            <span className="text-[8px] font-black text-slate-600 uppercase">
                {suggestion.dueDate 
                    ? new Date(suggestion.dueDate).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' })
                    : new Date().toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' })
                }
            </span>
            <input 
                type="date"
                value={suggestion.dueDate}
                onChange={(e) => {
                    if (e.target.value) {
                        const updated = [...suggestions];
                        updated[index] = { ...updated[index], dueDate: e.target.value };
                        setSuggestions(updated);
                    }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
            />
        </div>
    );
};

export default AiTaskDateDropdown;
