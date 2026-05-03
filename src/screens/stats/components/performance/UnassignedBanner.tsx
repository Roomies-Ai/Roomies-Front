import { Timer, ChevronRight } from 'lucide-react';
import type { UnassignedBannerProps } from '../../StatsScreen.types';

const UnassignedBanner = ({ unassignedStats, onSelectEntity }: UnassignedBannerProps) => {
    return (
        <div 
            onClick={() => {
                onSelectEntity({
                    type: 'MEMBER',
                    id: 'Unassigned',
                    name: 'Unassigned',
                    stats: unassignedStats
                });
            }}
            className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200 mt-2 cursor-pointer hover:bg-slate-100 transition-all"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                    <Timer size={16} />
                    <span className="text-xs font-black uppercase tracking-wider">Unassigned Tasks</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-600">{unassignedStats.totalTasks}</span>
                    <ChevronRight size={14} className="text-slate-300" />
                </div>
            </div>
        </div>
    );
};

export default UnassignedBanner;
