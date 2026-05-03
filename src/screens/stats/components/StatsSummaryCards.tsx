import { Target, CheckCircle2 } from 'lucide-react';
import type { StatsSummaryCardsProps } from '../StatsScreen.types';

const StatsSummaryCards = ({ stats }: StatsSummaryCardsProps) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                    <Target size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Points</p>
                    <p className="text-2xl font-black text-slate-900">{stats.totalPoints}</p>
                </div>
            </div>
            <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <CheckCircle2 size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tasks Done</p>
                    <p className="text-2xl font-black text-slate-900">{stats.statusCounts.completed || 0}</p>
                </div>
            </div>
        </div>
    );
};

export default StatsSummaryCards;
