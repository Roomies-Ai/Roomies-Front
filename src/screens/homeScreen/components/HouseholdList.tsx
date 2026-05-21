import React from 'react';
import { motion } from 'framer-motion';
import { Home, LogOut } from 'lucide-react';
import type { HouseholdListProps } from '../types/home.types';

const HouseholdList: React.FC<HouseholdListProps> = ({ households, onNavigate, onLeave }) => {
    return (
        <div className="flex flex-col gap-6 pb-8">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-charcoal text-2xl font-black tracking-tight">My Households</h2>
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <Home size={20} />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {households.map((household, index) => (
                    <motion.div
                        key={household.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onNavigate(household.id)}
                        className="bg-white p-6 rounded-[2.5rem] shadow-premium-sm hover:shadow-premium transition-[transform,opacity,box-shadow] cursor-pointer border border-gray-50 flex items-center justify-between group relative"
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-primary/5 rounded-3xl flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                <Home size={32} />
                            </div>
                            <div>
                                <h3 className="text-charcoal font-black text-xl mb-1">{household.name}</h3>
                                <p className="text-medium-gray text-sm font-bold uppercase tracking-widest text-[10px]">Roomie Member</p>
                            </div>
                        </div>

                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onLeave(household);
                            }}
                            className="p-3 rounded-2xl bg-red-50 text-red-500 transition-all hover:bg-red-500 hover:text-white shadow-sm"
                            title="Leave Household"
                        >
                            <LogOut size={18} />
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HouseholdList;
