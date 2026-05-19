import { BarChart3 } from 'lucide-react';

const StatsHeader = () => {
    return (
        <div className="py-6 flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Analytics</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Household Insights</p>
            </div>
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-primary">
                <BarChart3 size={24} strokeWidth={2.5} />
            </div>
        </div>
    );
};

export default StatsHeader;
