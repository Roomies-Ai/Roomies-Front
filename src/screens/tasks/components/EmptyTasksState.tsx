import { ClipboardCheck } from 'lucide-react';

const EmptyTasksState = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-premium flex items-center justify-center text-slate-200 mb-6 border border-slate-50">
                <ClipboardCheck size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Clean Slate!</h3>
            <p className="text-slate-400 font-medium max-w-[240px] mx-auto">
                You don't have any tasks assigned to you right now.
            </p>
        </div>
    );
};

export default EmptyTasksState;
