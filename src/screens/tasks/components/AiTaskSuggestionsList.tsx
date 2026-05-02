import { MessageSquare, Tag, Check } from 'lucide-react';
import type { AiTaskSuggestionsListProps } from './AddTaskModal.types';

const AiTaskSuggestionsList = ({ 
    suggestions, 
    handleToggleSuggestion, 
    setSuggestions, 
    setAiMessage, 
    handleConfirmAi 
}: AiTaskSuggestionsListProps) => (
    <div className="space-y-4">
        <div className="p-4 bg-blue-50 border-2 border-primary/10 rounded-3xl">
            <p className="text-xs font-black text-primary uppercase tracking-widest mb-3">AI extracted these tasks:</p>
            <div className="space-y-2">
                {suggestions.map((s, i) => (
                    <div 
                        key={i} 
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
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-[10px] text-slate-400 font-bold">{s.assignee ? `Assign to ${s.assignee}` : 'Unassigned'}</p>
                                {s.taskType && (
                                    <div className="flex items-center gap-1 bg-primary/5 px-2 py-0.5 rounded-lg">
                                        <Tag size={8} className="text-primary" />
                                        <span className="text-[8px] font-black text-primary uppercase">{s.taskType}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                s.isApproved 
                                ? 'bg-green-500 text-white shadow-lg shadow-green-200' 
                                : 'bg-slate-200 text-slate-400'
                            }`}>
                                <Check size={18} strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={() => { setSuggestions([]); setAiMessage(''); }}
                className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold"
            >
                Clear
            </button>
            <button 
                onClick={handleConfirmAi}
                disabled={suggestions.filter(s => s.isApproved).length === 0}
                className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
                Confirm ({suggestions.filter(s => s.isApproved).length} Tasks)
            </button>
        </div>
    </div>
);

export default AiTaskSuggestionsList;
