import { Sparkles, Loader2 } from 'lucide-react';
import type { AiTaskGeneratorFormProps } from './AddTaskModal.types';

const AiTaskGeneratorForm = ({ aiMessage, setAiMessage, isParsing, handleAiParse }: AiTaskGeneratorFormProps) => (
    <>
        <textarea 
            placeholder="Tell me what happened in free text (e.g. Felix cooked dinner and David did the dishes, add those to our list)"
            value={aiMessage}
            onChange={(e) => setAiMessage(e.target.value)}
            rows={4}
            className="w-full p-5 bg-slate-50 rounded-[1.5rem] border-2 border-transparent focus:border-primary focus:bg-white outline-none font-medium text-slate-900 transition-all placeholder:text-slate-300 resize-none"
        />
        <button 
            onClick={handleAiParse}
            disabled={!aiMessage.trim() || isParsing}
            className="w-full py-5 bg-primary text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
        >
            {isParsing ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {isParsing ? 'Magic in progress...' : 'Generate with AI'}
        </button>
    </>
);

export default AiTaskGeneratorForm;
