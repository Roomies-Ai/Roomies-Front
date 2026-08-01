import type { TaskFiltersProps } from '../HouseholdDetail.types';

const TaskFilters = ({ activeTab, setActiveTab, counts }: TaskFiltersProps) => {
    return (
        <div className="flex bg-slate-100 p-1.5 rounded-[2rem] mb-10">
            {[
                { id: 'OPEN', label: 'Open', count: counts.open },
                { id: 'IN_PROGRESS', label: 'In Progress', count: counts.inProgress },
                { id: 'DONE', label: 'Done', count: counts.done },
                { id: 'OVERDUE', label: 'Overdue', count: counts.overdue }
            ].map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[1.75rem] text-sm font-black transition-all ${
                        activeTab === tab.id 
                        ? 'bg-white text-[#3B95EA] shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    {tab.label}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        activeTab === tab.id ? 'bg-blue-50 text-[#3B95EA]' : 'bg-slate-200 text-slate-500'
                    }`}>
                        {tab.count}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default TaskFilters;
