import React, { useState } from 'react';
import { Bell, Search, X, Send } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    showActions?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showActions = true }) => {
    const { user } = useAppSelector((state) => state.auth);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 15) return 'Good Noon';
        if (hour < 18) return 'Good Afternoon';
        if (hour < 21) return 'Good Evening';
        return 'Good Night';
    };

    return (
        <header className="px-6 pt-6 md:pt-4 pb-4 fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
            <div className="flex justify-between items-center bg-transparent max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    {!isSearchOpen ? (
                        <motion.div 
                            key="user-info"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-4 w-full"
                        >
                            <div className="relative">
                                <img 
                                    src={user?.profilePicture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
                                    alt="Profile" 
                                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-premium-sm"
                                />
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div>
                                <p className="text-medium-gray text-[10px] font-bold uppercase tracking-wider">{getGreeting()},</p>
                                <h1 className="text-charcoal text-xl font-black tracking-tight">{user?.username || 'Guest'}!</h1>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="search-input"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: '100%' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="flex-1 mr-4"
                        >
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search tasks, roomies..."
                                    className="w-full py-3 pl-4 pr-12 bg-white rounded-2xl border-none shadow-premium-sm focus:ring-2 focus:ring-primary/20 outline-none text-charcoal font-medium placeholder:text-medium-gray"
                                    autoFocus
                                />
                                <button 
                                    onClick={() => setIsSearchOpen(false)}
                                    className="absolute right-3 p-1 text-medium-gray hover:text-charcoal transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {showActions && (
                    <div className="flex gap-2">
                        {!isSearchOpen && (
                            <button 
                                onClick={() => setIsSearchOpen(true)}
                                className="p-3 bg-white rounded-2xl text-charcoal hover:bg-gray-50 transition-all shadow-premium-sm active:scale-95 flex items-center justify-center"
                            >
                                <Search size={20} />
                            </button>
                        )}
                        <a 
                            href="https://t.me/RoomiesUserNameBot" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 bg-white rounded-2xl text-[#229ED9] hover:bg-gray-50 transition-all shadow-premium-sm active:scale-95 flex items-center justify-center"
                            title="Telegram Bot"
                        >
                            <Send size={20} />
                        </a>

                        <div className="relative">
                            <button 
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={`p-3 bg-white rounded-2xl transition-all shadow-premium-sm active:scale-95 flex items-center justify-center ${
                                    showNotifications ? 'text-primary ring-2 ring-primary/20' : 'text-charcoal hover:bg-gray-50'
                                }`}
                            >
                                <Bell size={20} />
                                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white"></span>
                            </button>

                            <AnimatePresence>
                                {showNotifications && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-premium p-4 z-50 border border-gray-100"
                                    >
                                        <h3 className="text-sm font-bold text-charcoal mb-3">Notifications</h3>
                                        <div className="space-y-3">
                                            <div className="flex gap-3 items-start p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">JD</div>
                                                <div>
                                                    <p className="text-xs font-bold text-charcoal">John Doe finished "Wash Dishes"</p>
                                                    <p className="text-[10px] text-medium-gray">2 minutes ago</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 items-start p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">AI</div>
                                                <div>
                                                    <p className="text-xs font-bold text-charcoal">AI Suggestion: New task pattern detected</p>
                                                    <p className="text-[10px] text-medium-gray">1 hour ago</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-full mt-4 py-2 text-[10px] font-bold text-primary uppercase tracking-wider hover:bg-primary/5 rounded-xl transition-colors">
                                            View all notifications
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;