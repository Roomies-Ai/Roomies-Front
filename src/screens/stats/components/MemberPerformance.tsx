import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ChevronDown } from 'lucide-react';
import type { MemberPerformanceProps } from '../StatsScreen.types';

// Sub-components
import MemberCard from './performance/MemberCard';

const MemberPerformance = ({ activeHousehold, stats, onSelectEntity }: MemberPerformanceProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                        <Users size={20} />
                    </div>
                    <h2 className="text-lg font-black text-slate-900">Member Performance</h2>
                </div>
                <motion.div animate={{ rotate: isCollapsed ? -90 : 0 }}>
                    <ChevronDown size={20} className="text-slate-300" />
                </motion.div>
            </div>

            <AnimatePresence>
                {!isCollapsed && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col gap-3">
                            {activeHousehold?.members?.map((user: any, idx: number) => (
                                <MemberCard 
                                    key={user.id}
                                    user={user}
                                    idx={idx}
                                    memberStats={stats.byMember[user.id] || { points: 0, totalTasks: 0, statusCounts: {} }}
                                    onSelectEntity={onSelectEntity}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default MemberPerformance;