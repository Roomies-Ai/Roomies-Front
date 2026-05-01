import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import { Plus, PlusCircle, Home, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useHomeScreen } from './useHomeScreen';

const HomeScreen = () => {
    const navigate = useNavigate();
    const { households, loading, error } = useHomeScreen();

    // Lock body scroll only for the Home Screen to prevent header/footer from moving
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        
        const rootElement = document.getElementById('root');
        if (rootElement) {
            rootElement.style.height = '100vh';
            rootElement.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = originalStyle;
            if (rootElement) {
                rootElement.style.height = 'auto';
                rootElement.style.overflow = 'unset';
            }
        };
    }, []);

    return (
        <div className="bg-white h-[100vh] flex flex-col pt-24 overflow-hidden relative">
            <Header showActions={false} />

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col overflow-hidden px-8 w-full max-w-4xl mx-auto">
                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-medium-gray">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse"></div>
                            <Loader2 size={48} className="animate-spin text-primary relative" />
                        </div>
                        <p className="text-sm font-black tracking-widest uppercase opacity-50">Syncing with HQ...</p>
                    </div>
                ) : error ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 max-w-md mx-auto">
                        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mb-6 border border-red-100">
                            <Plus size={40} className="rotate-45" />
                        </div>
                        <h2 className="text-charcoal text-2xl font-black mb-3">Something went wrong</h2>
                        <p className="text-medium-gray text-base leading-relaxed mb-8">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-premium active:scale-95 transition-all"
                        >
                            Retry Connection
                        </button>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* 1. SCROLLABLE CONTENT (List or Empty State) */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide py-4">
                            {households.length > 0 ? (
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
                                                onClick={() => navigate(`/households/${household.id}`)}
                                                className="bg-white p-6 rounded-[2.5rem] shadow-premium-sm hover:shadow-premium transition-all cursor-pointer border border-gray-50 flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div className="w-16 h-16 bg-primary/5 rounded-3xl flex items-center justify-center text-primary">
                                                        <Home size={32} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-charcoal font-black text-xl mb-1">{household.name}</h3>
                                                        <p className="text-medium-gray text-sm font-bold">Roomies Member</p>
                                                    </div>
                                                </div>
                                                <Plus size={20} className="text-gray-300 rotate-45" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-md mx-auto min-h-full py-10">
                                    <div className="relative mb-8 scale-90 sm:scale-100">
                                        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150"></div>
                                        <div className="relative w-40 h-40 sm:w-48 sm:h-48 bg-white rounded-full shadow-premium flex items-center justify-center border border-gray-50">
                                            <div className="text-primary/40">
                                                <Home size={70} strokeWidth={1.5} />
                                            </div>
                                            <div className="absolute bottom-4 right-4 w-10 h-10 sm:w-12 sm:h-12 bg-[#D1FAE5] text-[#059669] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                                                <Plus size={24} strokeWidth={3} />
                                            </div>
                                        </div>
                                    </div>

                                    <h2 className="text-charcoal text-3xl sm:text-[2.5rem] font-black leading-tight mb-3 tracking-tight">
                                        No households found
                                    </h2>
                                    <p className="text-[#94A3B8] text-base sm:text-lg font-medium leading-relaxed max-w-[280px]">
                                        It looks like you're not part of any household yet. Let's find you a place to call home!
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* 2. FIXED FOOTER (Buttons) - Always at the bottom of the content area */}
                        <div className="mt-auto shrink-0 flex flex-col items-center pb-2 pt-6 bg-white z-20 border-t border-gray-50 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/households/new')}
                                className="w-full max-w-[280px] sm:max-w-[320px] bg-[#3B95EA] text-white py-4 rounded-[1.5rem] font-bold text-lg shadow-[0_10px_25px_rgba(59,149,234,0.25)] flex items-center justify-center gap-3 mb-2"
                            >
                                <PlusCircle size={24} strokeWidth={2.5} />
                                <span>Create or Join a Household</span>
                            </motion.button>

                            <button 
                                onClick={() => navigate('/households/join')}
                                className="text-[#94A3B8] text-sm font-bold hover:text-primary transition-colors mb-0"
                            >
                                Have an invite code?
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Functional Spacer for Bottom Nav - Prevents overlapping */}
            <div className="h-[0px] shrink-0 bg-white"></div>
        </div>
    );
};

export default HomeScreen;
