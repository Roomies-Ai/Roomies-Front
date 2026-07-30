import React from 'react';
import { ClipboardCheck } from 'lucide-react';

interface TasksHeaderProps {
    title: string;
    subtitle: string;
}

const TasksHeader: React.FC<TasksHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-charcoal text-2xl font-black tracking-tight">
                    {title}
                </h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    {subtitle}
                </p>
            </div>
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary border border-slate-50">
                <ClipboardCheck size={24} />
            </div>
        </div>
    );
};

export default TasksHeader;
