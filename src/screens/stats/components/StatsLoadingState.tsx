import { Target, CheckCircle2, BarChart3, PieChart } from 'lucide-react';

const StatsLoadingState = () => {
    return (
        <div className="flex flex-col gap-6 animate-pulse">
            {/* Summary Cards Skeleton */}
            <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-white p-5 rounded-[2rem] border border-slate-50 flex flex-col gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-100">
                            {i === 1 ? <Target size={20} /> : <CheckCircle2 size={20} />}
                        </div>
                        <div className="space-y-2">
                            <div className="h-3 bg-slate-50 rounded w-16"></div>
                            <div className="h-6 bg-slate-100 rounded w-10"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Skeleton */}
            <div className="grid grid-cols-1 gap-6">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-50 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-100">
                                {i === 1 ? <BarChart3 size={18} /> : <PieChart size={18} />}
                            </div>
                            <div className="h-4 bg-slate-100 rounded w-32"></div>
                        </div>
                        <div className="h-40 bg-slate-50 rounded-[1.5rem] w-full flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full border-8 border-slate-100 border-t-transparent animate-spin opacity-20"></div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* List Skeleton */}
            <div className="space-y-4">
                <div className="h-5 bg-slate-100 rounded w-40 mb-2"></div>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-5 rounded-[2rem] border border-slate-50 flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                            <div className="h-3 bg-slate-50 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsLoadingState;
