import React from 'react';
import { User, Users } from 'lucide-react';

interface TasksFilterProps {
    filter: 'ME' | 'ALL';
    setFilter: (filter: 'ME' | 'ALL') => void;
}

const TasksFilter: React.FC<TasksFilterProps> = ({ filter, setFilter }) => {
    return (
        <div className="flex p-1.5 bg-slate-100 rounded-[1.5rem] w-full sm:w-80">
            <button 
                onClick={() => setFilter('ME')}
                className={`flex-1 py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 ${filter === 'ME' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-500'}`}
            >
                <User size={16} />
                My Tasks
            </button>
            <button 
                onClick={() => setFilter('ALL')}
                className={`flex-1 py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 ${filter === 'ALL' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-500'}`}
            >
                <Users size={16} />
                All Tasks
            </button>
        </div>
    );
};

export default TasksFilter;
