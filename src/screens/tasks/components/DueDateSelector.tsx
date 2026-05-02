import { Calendar } from 'lucide-react';
import type { DueDateSelectorProps } from './AddTaskModal.types';

const DueDateSelector = ({ dueDate, setDueDate }: DueDateSelectorProps) => (
    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-[1.5rem] border-2 border-transparent focus-within:border-primary focus-within:bg-white transition-all">
        <div className="flex items-center gap-3 ml-1">
            <div className="w-10 h-10 rounded-xl bg-blue-400/10 text-blue-600 flex items-center justify-center">
                <Calendar size={20} />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</p>
                <p className="text-xs font-bold text-slate-900">Completion deadline</p>
            </div>
        </div>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required className="font-black text-slate-900 bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-100 outline-none text-xs" />
    </div>
);

export default DueDateSelector;
