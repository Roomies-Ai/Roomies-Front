import { motion } from 'framer-motion';
import { Plus, Loader2, Check, X } from 'lucide-react';
import TaskIcon from '../../households/components/ui/TaskIcon';
import type { TaskTypeSelectorProps } from './AddTaskModal.types';

const TaskTypeSelector = ({
    selectedTaskType, setSelectedTaskType,
    taskTypes,
    isAddingType, setIsAddingType,
    newTypeName, setNewTypeName,
    isCreatingType, handleAddType
}: TaskTypeSelectorProps) => (
    <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Task Category</label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <div className="shrink-0 flex items-center gap-2">
                {isAddingType ? (
                    <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 'auto', opacity: 1 }} className="flex items-center gap-2 bg-white border-2 border-primary/20 rounded-2xl px-3 py-1.5">
                        <input autoFocus type="text" placeholder="New Category..." value={newTypeName} onChange={(e) => setNewTypeName(e.target.value)} className="bg-transparent outline-none text-xs font-bold text-slate-900 w-24" onKeyDown={(e) => e.key === 'Enter' && handleAddType()} />
                        <button onClick={handleAddType} disabled={!newTypeName.trim() || isCreatingType} className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center disabled:opacity-50">{isCreatingType ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}</button>
                        <button onClick={() => setIsAddingType(false)} className="w-6 h-6 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center"><X size={12} /></button>
                    </motion.div>
                ) : (
                    <button onClick={() => setIsAddingType(true)} className="w-10 h-10 rounded-2xl border-2 border-dashed border-slate-200 text-slate-300 flex items-center justify-center hover:border-primary hover:text-primary transition-all"><Plus size={18} /></button>
                )}
            </div>
            {taskTypes?.map((type: any) => (
                <button key={type.id} onClick={() => setSelectedTaskType(type.id)} className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 transition-all font-bold text-xs ${selectedTaskType === type.id ? 'border-primary bg-primary/5 text-primary' : 'border-slate-50 bg-white text-slate-400'}`}>
                    <TaskIcon title={type.name} size={14} />{type.name}
                </button>
            ))}
        </div>
    </div>
);

export default TaskTypeSelector;
