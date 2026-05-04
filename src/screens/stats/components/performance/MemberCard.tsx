import { motion } from 'framer-motion';
import { Trophy, ChevronRight } from 'lucide-react';
import type { MemberCardProps } from '../../StatsScreen.types';

const MemberCard = ({ user, idx, memberStats, onSelectEntity }: MemberCardProps) => {
    const completed = memberStats.statusCounts.completed || 0;
    const inProgress = memberStats.statusCounts['in-progress'] || 0;
    const overdue = memberStats.statusCounts.overdue || 0;

    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => {
                onSelectEntity({
                    type: 'MEMBER',
                    id: user.id,
                    name: user.username,
                    stats: memberStats
                });
            }}
            className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-blue-200 transition-all cursor-pointer"
        >
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100 relative">
                {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-lg font-black text-slate-400">{user.username.charAt(0).toUpperCase()}</span>
                )}
                {idx === 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                        <Trophy size={10} className="text-white" />
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <p className="font-black text-slate-900 truncate">{user.username}</p>
                    <p className="text-sm font-black text-primary">{memberStats.points} pts</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{completed} COMPLETED</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{inProgress + overdue} TO DO</span>
                    </div>
                </div>

                <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden flex">
                    <div 
                        className="h-full bg-green-500 transition-all duration-500" 
                        style={{ width: `${(completed / (memberStats.totalTasks || 1)) * 100}%` }}
                    />
                    <div 
                        className="h-full bg-blue-400 transition-all duration-500" 
                        style={{ width: `${((inProgress + overdue) / (memberStats.totalTasks || 1)) * 100}%` }}
                    />
                </div>
            </div>

            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-primary transition-all">
                <ChevronRight size={20} />
            </div>
        </motion.div>
    );
};

export default MemberCard;
