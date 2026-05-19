import { BarChart3 } from 'lucide-react';

const StatsEmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center px-10">
            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
                <BarChart3 size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">No Data Yet</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Complete some tasks to see your household metrics!</p>
        </div>
    );
};

export default StatsEmptyState;
