import { Calendar } from 'lucide-react';
import { useRef } from 'react';
import type { AiTaskDateDropdownProps } from './AddTaskModal.types';

const AiTaskDateDropdown = ({ suggestion, index, suggestions, setSuggestions }: AiTaskDateDropdownProps) => {
    const dateInputRef = useRef<HTMLInputElement>(null);

    const handleContainerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Trigger the native date picker
        if (dateInputRef.current) {
            try {
                // @ts-ignore - showPicker is modern but not in all types
                if (dateInputRef.current.showPicker) {
                    // @ts-ignore
                    dateInputRef.current.showPicker();
                } else {
                    dateInputRef.current.click();
                }
            } catch (err) {
                dateInputRef.current.click();
            }
        }
    };

    return (
        <div 
            className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100 relative cursor-pointer group/date hover:bg-slate-100 transition-colors"
            onClick={handleContainerClick}
        >
            <Calendar size={8} className="text-slate-400" />
            <span className="text-[8px] font-black text-slate-600 uppercase">
                {suggestion.dueDate 
                    ? new Date(suggestion.dueDate).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' })
                    : new Date().toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' })
                }
            </span>
            <input 
                ref={dateInputRef}
                type="date"
                value={suggestion.dueDate || ''}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                    e.stopPropagation();
                    if (e.target.value) {
                        const updated = [...suggestions];
                        updated[index] = { ...updated[index], dueDate: e.target.value };
                        setSuggestions(updated);
                    }
                }}
                className="absolute inset-0 opacity-0 pointer-events-none"
            />
        </div>
    );
};

export default AiTaskDateDropdown;
