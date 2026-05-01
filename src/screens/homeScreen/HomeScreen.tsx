import React from 'react';
import Header from '../../components/layout/Header';
import { Plus, ChevronRight, Home, Users, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useHomeScreen } from './useHomeScreen';

const HomeScreen = () => {
    const navigate = useNavigate();
    const { households, loading, error } = useHomeScreen();

    return (
        <div className="bg-background min-h-screen">
            <Header />

            <div className="px-6 pb-8 flex flex-col gap-8">
                {/* Households Section */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-charcoal text-xl font-black">My Households</h2>
                        {households.length > 0 && (
                             <span className="bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full">
                                {households.length} {households.length === 1 ? 'House' : 'Houses'}
                             </span>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3 text-medium-gray">
                            <Loader2 size={32} className="animate-spin text-primary" />
                            <p className="text-sm font-bold">Loading your homes...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 p-6 rounded-[28px] border border-red-100 text-center">
                            <p className="text-red-600 text-sm font-bold mb-4">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="bg-white px-6 py-2 rounded-full text-red-600 text-xs font-black shadow-sm"
                            >
                                Retry
                            </button>
                        </div>
                    ) : households.length === 0 ? (
                        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] p-10 text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-300 mx-auto mb-4 shadow-sm">
                                <Home size={32} />
                            </div>
                            <h3 className="text-charcoal font-black text-lg mb-2">No households yet</h3>
                            <p className="text-medium-gray text-sm font-medium px-4 leading-relaxed">
                                Create a new household or join an existing one using an invite code.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {households.map((household, index) => (
                                <motion.div
                                    key={household.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => navigate(`/households/${household.id}`)}
                                    className="group relative bg-white p-5 rounded-[28px] shadow-premium-sm hover:shadow-premium transition-all cursor-pointer border border-transparent hover:border-primary/20"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                                <Home size={28} />
                                            </div>
                                            <div>
                                                <h3 className="text-charcoal font-black text-lg leading-tight mb-1">{household.name}</h3>
                                                <div className="flex items-center gap-2 text-medium-gray text-xs font-bold">
                                                    <Users size={14} className="text-primary" />
                                                    <span>Roomies Member</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Create & Join Actions */}
                <section className="mt-2">
                    <div className="grid grid-cols-1 gap-4">
                        <motion.button 
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/households/new')}
                            className="flex items-center justify-between bg-primary p-6 rounded-[32px] text-white shadow-premium group relative overflow-hidden"
                        >
                            <div className="relative z-10 flex items-center gap-5">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                    <Plus size={28} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-black text-lg leading-tight">Create Household</h3>
                                    <p className="text-white/70 text-xs font-bold uppercase tracking-wider">Start a new home</p>
                                </div>
                            </div>
                            <ArrowRight size={24} className="relative z-10 text-white/50 group-hover:text-white transition-all" />
                            
                            {/* Decor */}
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        </motion.button>

                        <motion.button 
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/households/join')}
                            className="flex items-center justify-between bg-white p-6 rounded-[32px] text-charcoal shadow-premium-sm border border-gray-100 group relative overflow-hidden"
                        >
                            <div className="relative z-10 flex items-center gap-5">
                                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                                    <Users size={28} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-black text-lg leading-tight">Join Household</h3>
                                    <p className="text-medium-gray text-xs font-bold uppercase tracking-wider">Use invite code</p>
                                </div>
                            </div>
                            <ArrowRight size={24} className="relative z-10 text-gray-200 group-hover:text-accent transition-all" />
                        </motion.button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomeScreen;


