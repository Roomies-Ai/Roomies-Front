import { motion } from 'framer-motion';
import { Sparkles, Trash2 } from 'lucide-react';
import type { Step4TasksProps } from '../types/Step4Tasks.types';
import TaskItem from './step4/TaskItem';
import AddTaskButton from './step4/AddTaskButton';
import LoadingSuggestions from './step4/LoadingSuggestions';
import FinishButton from './step4/FinishButton';

const Step4Tasks = ({
    tasks,
    isGenerating,
    onToggleTask,
    onUpdateTask,
    onAddTask,
    onRemoveTask,
    onFinish,
    isLoading
}: Step4TasksProps) => {
    return (
        <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Sparkles size={20} />
                </div>
                <span className="text-accent text-xs font-bold uppercase tracking-widest">Final Step: Task Review</span>
            </div>
            
            <h1 className="text-3xl font-bold text-charcoal mb-2">The Game Plan</h1>
            <p className="text-medium-gray mb-6 leading-relaxed text-sm">
                Review your missions. Click the <span className="text-emerald-500 font-bold text-lg">V</span> to include tasks. Custom tasks can be removed using the <Trash2 className="inline-block" size={14} /> icon.
            </p>

            <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide space-y-4 mb-4">
                {isGenerating ? (
                    <LoadingSuggestions />
                ) : (
                    <>
                        {tasks.map((task, index) => (
                            <TaskItem 
                                key={index}
                                task={task}
                                index={index}
                                onToggle={onToggleTask}
                                onUpdate={onUpdateTask}
                                onRemove={onRemoveTask}
                            />
                        ))}
                        
                        <AddTaskButton onClick={onAddTask} />
                    </>
                )}
            </div>

            <FinishButton 
                onClick={onFinish}
                isLoading={isLoading}
                disabled={isLoading || isGenerating}
            />
        </motion.div>
    );
};

export default Step4Tasks;
