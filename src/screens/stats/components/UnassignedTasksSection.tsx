import { Timer, ChevronRight } from 'lucide-react';
import type { UnassignedBannerProps } from '../StatsScreen.types';

const UnassignedTasksSection = ({ unassignedStats, onSelectEntity }: UnassignedBannerProps) => {
    if (!unassignedStats || unassignedStats.totalTasks === 0) return null;

    return (
        <section 
            onClick={() => {
                onSelectEntity({
                    type: 'MEMBER',
                    id: 'Unassigned',
                    name: 'Unassigned',
                    stats: unassignedStats
                });
            }}
            className="bg-white p-5 rounded-[2rem] border-2 border-dashed border-blue-100 shadow-sm flex items-center justify-between cursor-pointer group hover:border-primary hover:bg-blue-50/30 transition-all"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-white transition-all shadow-sm">
                    <Timer size={24} />
                </div>
                <div>
                    <h2 className="text-sm font-black text-slate-900">Unassigned Tasks</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{unassignedStats.totalTasks} Tasks waiting for you</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all">
                    <ChevronRight size={18} />
                </div>
            </div>
        </section>
    );
};

export default UnassignedTasksSection;
