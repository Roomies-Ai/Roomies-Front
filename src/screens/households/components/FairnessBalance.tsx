import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

import Avatar from '../../../components/ui/Avatar';
import type { FairnessBalanceProps } from '../HouseholdDetail.types';

const FairnessBalance = ({ members, currentUser, getMemberStats }: FairnessBalanceProps) => {
    return (
        <section className="mb-10">
            <h2 className="text-lg font-black text-slate-900 mb-6">Fairness Balance</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
                {[...(members || [])]
                    .sort((a: any, b: any) => {
                        const aIsMe = String(a.id) === String(currentUser?.id || currentUser?.userId);
                        const bIsMe = String(b.id) === String(currentUser?.id || currentUser?.userId);
                        if (aIsMe) return -1;
                        if (bIsMe) return 1;
                        return 0;
                    })
                    .map((member: any, idx: number) => {
                        const stats = getMemberStats(member.id);
                        const isMe = currentUser && String(member.id) === String(currentUser?.id || currentUser?.userId);
                        return (
                        <motion.div 
                            key={member.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="min-w-[160px] bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col items-center relative overflow-hidden"
                        >
                            {isMe && (
                                <div className="absolute top-6 right-6 text-[#3B95EA]">
                                    <CheckCircle2 size={20} />
                                </div>
                            )}
                            <div className={`w-16 h-16 rounded-full p-1 border-2 ${isMe ? 'border-[#3B95EA]' : 'border-[#10B981]'} mb-3 relative`}>
                                <Avatar
                                    src={member.profilePicture}
                                    name={member.username}
                                    alt={member.username}
                                    className="w-full h-full rounded-full text-sm"
                                />
                            </div>
                            <p className="font-black text-slate-900 text-sm mb-1">{isMe ? 'You' : member.username}</p>
                            <div className="flex flex-col items-center gap-1">
                                <div className="flex items-center gap-1">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stats.taskCount} tasks</span>
                                </div>
                                <div className="bg-slate-50 px-3 py-1 rounded-full">
                                    <span className="text-[10px] font-black text-[#3B95EA]">{stats.points} pts</span>
                                </div>
                            </div>
                        </motion.div>
                        );
                    })}
            </div>
        </section>
    );
};

export default FairnessBalance;
