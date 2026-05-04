import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { ModalVisualsProps } from '../../StatsScreen.types';

const COLORS = ['#10B981', '#60A5FA', '#94A3B8', '#F59E0B', '#8B5CF6', '#EC4899'];

const ModalVisuals = ({ selectedEntity, modalCharts }: ModalVisualsProps) => {
    return (
        <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="flex flex-col items-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Status Breakdown</p>
                <div className="w-full h-40">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={modalCharts.statusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={35}
                                outerRadius={55}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ value }) => value}
                                labelLine={false}
                            >
                                {modalCharts.statusData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-1">
                    {modalCharts.statusData.map((d, i) => (
                        <div key={d.name} className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                            <span className="text-[8px] font-bold text-slate-500 uppercase">{d.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {modalCharts.distributionData.length > 0 && (
                <div className="flex flex-col items-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
                        {selectedEntity.type === 'TASK_TYPE' ? 'Member Distribution' : 'Task Type Share'}
                    </p>
                    <div className="w-full h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={modalCharts.distributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={35}
                                    outerRadius={55}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ value }) => value}
                                    labelLine={false}
                                >
                                    {modalCharts.distributionData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-1">
                        {modalCharts.distributionData.map((d, i) => (
                            <div key={`modal-dist-${d.name}-${i}`} className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[(i + 3) % COLORS.length] }} />
                                <span className="text-[8px] font-bold text-slate-500 uppercase">{d.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalVisuals;
