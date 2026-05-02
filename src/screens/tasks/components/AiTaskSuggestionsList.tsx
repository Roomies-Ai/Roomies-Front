import type { AiTaskSuggestionsListProps } from './AddTaskModal.types';
import SuggestionItem from './SuggestionItem';

const AiTaskSuggestionsList = ({ 
    suggestions, 
    handleToggleSuggestion, 
    setSuggestions, 
    setAiMessage, 
    handleConfirmAi,
    activeHousehold
}: AiTaskSuggestionsListProps) => (
    <div className="space-y-4">
        <div className="p-4 bg-blue-50 border-2 border-primary/10 rounded-3xl">
            <p className="text-xs font-black text-primary uppercase tracking-widest mb-3">AI extracted these tasks:</p>
            <div className="space-y-2">
                {suggestions.map((s, i) => (
                    <SuggestionItem 
                        key={i}
                        s={s}
                        i={i}
                        suggestions={suggestions}
                        setSuggestions={setSuggestions}
                        handleToggleSuggestion={handleToggleSuggestion}
                        activeHousehold={activeHousehold}
                    />
                ))}
            </div>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={() => { setSuggestions([]); setAiMessage(''); }}
                className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold transition-all hover:bg-slate-200"
            >
                Clear
            </button>
            <button 
                onClick={handleConfirmAi}
                disabled={suggestions.filter(s => s.isApproved).length === 0}
                className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 transition-all hover:shadow-primary/40 active:scale-95"
            >
                Confirm ({suggestions.filter(s => s.isApproved).length} Tasks)
            </button>
        </div>
    </div>
);

export default AiTaskSuggestionsList;
