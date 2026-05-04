import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, CheckCircle2, BarChart3, Settings } from 'lucide-react';
import Header from './Header';

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: Home, path: '/home', label: 'Home' },
        { icon: CheckCircle2, path: '/tasks', label: 'Tasks' },
        { icon: BarChart3, path: '/stats', label: 'Stats' },
        { icon: Settings, path: '/settings', label: 'Settings' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white font-body">
            <Header showActions={true} />
            
            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative pb-24 pt-28">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-gray-100 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] rounded-t-[2.5rem]">
                <div className="max-w-4xl mx-auto px-8 py-5 flex justify-between items-center">
                    {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || (item.path === '/home' && location.pathname === '/');
                    
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative group`}
                            style={{ background: 'none', boxShadow: 'none', padding: 0, transform: 'none' }}
                        >
                            <div className={`transition-all duration-300 ${
                                isActive 
                                    ? 'text-primary scale-110' 
                                    : 'text-[#94A3B8] hover:text-primary/70'
                            }`}>
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                                isActive ? 'text-primary' : 'text-[#94A3B8]'
                            }`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
                </div>
            </nav>
        </div>
    );
};

export default Layout;