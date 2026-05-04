import { MessageSquare, Check } from 'lucide-react';
import AiTaskAssigneeDropdown from './AiTaskAssigneeDropdown';
import AiTaskTypeDropdown from './AiTaskTypeDropdown';
import AiTaskDateDropdown from './AiTaskDateDropdown';
import type { SuggestionItemProps } from './AddTaskModal.types';

const SuggestionItem = ({ s, i, suggestions, setSuggestions, handleToggleSuggestion, activeHousehold }: SuggestionItemProps) => {
    return (
        <div 
            onClick={() => handleToggleSuggestion(i)}
            className={`group relative flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                s.isApproved 
                ? 'bg-white border-blue-100 shadow-sm' 
                : 'bg-slate-50 border-transparent opacity-60'
            }`}
        >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                s.isApproved ? 'bg-blue-50 text-primary' : 'bg-slate-200 text-slate-400'
            }`}>
                <MessageSquare size={16} />
            </div>
            <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold text-slate-900 truncate ${!s.isApproved ? 'line-through text-slate-400' : ''}`}>{s.title}</p>
                
                {s.description && (
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-tight line-clamp-2">{s.description}</p>
                )}

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <AiTaskAssigneeDropdown 
                        suggestion={s}
                        index={i}
                        suggestions={suggestions}
                        setSuggestions={setSuggestions}
                        activeHousehold={activeHousehold}
                    />

                    <AiTaskTypeDropdown 
                        suggestion={s}
                        index={i}
                        suggestions={suggestions}
                        setSuggestions={setSuggestions}
                        activeHousehold={activeHousehold}
                    />

                    <AiTaskDateDropdown 
                        suggestion={s}
                        index={i}
                        suggestions={suggestions}
                        setSuggestions={setSuggestions}
                    />
                </div>
            </div>
            <div className="shrink-0 ml-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    s.isApproved 
                    ? 'bg-green-500 text-white shadow-lg shadow-green-200' 
                    : 'bg-slate-200 text-slate-400'
                }`}>
                    <Check size={18} strokeWidth={3} />
                </div>
            </div>
        </div>
    );
};

export default SuggestionItem;
