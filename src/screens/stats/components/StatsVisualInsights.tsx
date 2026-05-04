import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { StatsVisualInsightsProps } from '../StatsScreen.types';

const COLORS = ['#10B981', '#60A5FA', '#94A3B8', '#F59E0B', '#8B5CF6', '#EC4899'];

const StatsVisualInsights = ({ statusData, memberDistributionData }: StatsVisualInsightsProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                        <TrendingUp size={20} />
                    </div>
                    <h2 className="text-lg font-black text-slate-900">Visual Insights</h2>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Household Status Distribution */}
                            <div className="flex flex-col items-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Overall Status</p>
                                <div className="w-full h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={statusData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={65}
                                                paddingAngle={5}
                                                dataKey="value"
                                                label={({ value }) => value}
                                                labelLine={false}
                                            >
                                                {statusData.map((_, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 'bold' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-wrap justify-center gap-3 mt-2">
                                    {statusData.map((d, i) => (
                                        <div key={d.name} className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                            <span className="text-[9px] font-bold text-slate-500 uppercase">{d.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Member Contribution Distribution */}
                            <div className="flex flex-col items-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Ownership Share</p>
                                <div className="w-full h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={memberDistributionData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={65}
                                                paddingAngle={5}
                                                dataKey="value"
                                                label={({ value }) => value}
                                                labelLine={false}
                                            >
                                                {memberDistributionData.map((_, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 'bold' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-wrap justify-center gap-3 mt-2">
                                    {memberDistributionData.map((d, i) => (
                                        <div key={`member-${d.id || i}`} className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[(i + 3) % COLORS.length] }} />
                                            <span className="text-[9px] font-bold text-slate-500 uppercase">{d.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default StatsVisualInsights;
