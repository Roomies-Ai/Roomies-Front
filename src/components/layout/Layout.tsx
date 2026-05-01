import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, ListTodo, Bot, Users, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: Home, path: '/home', label: 'Home' },
        { icon: ListTodo, path: '/tasks', label: 'Tasks' },
        { icon: Bot, path: '/ai', label: 'AI' },
        { icon: Users, path: '/roomies', label: 'Roomies' },
        { icon: User, path: '/profile', label: 'Profile' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background font-body">
            {/* Main Content Area */}
            <main className="flex-1 pb-24">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative group`}
                            style={{ background: 'none', boxShadow: 'none', padding: 0, transform: 'none' }}
                        >
                            <div className={`p-2.5 rounded-2xl transition-all duration-300 ${
                                isActive 
                                    ? 'bg-primary text-white shadow-premium-sm scale-110' 
                                    : 'text-medium-gray hover:text-charcoal hover:bg-gray-50'
                            }`}>
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                                isActive ? 'text-primary opacity-100' : 'text-medium-gray opacity-60 group-hover:opacity-100'
                            }`}>
                                {item.label}
                            </span>
                            
                            {isActive && (
                                <motion.div 
                                    layoutId="active-indicator"
                                    className="absolute -top-3 w-1 h-1 bg-primary rounded-full"
                                />
                            )}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default Layout;
