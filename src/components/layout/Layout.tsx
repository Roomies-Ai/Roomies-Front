import { useState } from 'react';
import { Outlet, useNavigate, useLocation, useMatch } from 'react-router-dom';
import { Home, CheckCircle2, BarChart3, User } from 'lucide-react';
import Header from './Header';
import Avatar from '../ui/Avatar';
import HouseholdSwitcherSheet from './HouseholdSwitcherSheet';
import { useGetHouseholdByIdQuery, useGetMyHouseholdsQuery } from '../../api/household.api';

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

    const householdMatch = useMatch('/households/:id');
    const activeHouseholdId = householdMatch?.params.id;
    const isViewingHousehold = !!activeHouseholdId && activeHouseholdId !== 'new' && activeHouseholdId !== 'join';

    const { data: activeHousehold } = useGetHouseholdByIdQuery(activeHouseholdId ?? '', { skip: !isViewingHousehold });
    const { data: households = [] } = useGetMyHouseholdsQuery();

    let navItems = [
        { icon: Home, path: '/home', label: 'Home' },
        { icon: CheckCircle2, path: '/tasks', label: 'Tasks' },
        { icon: BarChart3, path: '/stats', label: 'Stats' },
        { icon: User, path: '/profile', label: 'Profile' },
    ];

    // if user is not in a household, remove the Home tab
    if (households?.length === 0) {
        navItems = navItems.filter(item => item.path !== '/tasks' && item.path !== '/stats');
    }

    return (
        <div className="flex flex-col min-h-screen bg-white font-body">
            <Header showActions={true} />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative pb-24 pt-28 bg-[#F8FAFC]">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-gray-100 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] rounded-t-[2.5rem]">
                <div className="max-w-4xl mx-auto px-8 py-5 flex justify-between items-center">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        // While viewing a household, the Home tab morphs into that household's
                        // identity and opens a quick-switcher instead of navigating away.
                        if (item.path === '/home' && isViewingHousehold) {
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => setIsSwitcherOpen(true)}
                                    className="flex flex-col items-center gap-1.5 transition-[transform,opacity,color] duration-300 relative group max-w-[4.5rem]"
                                    style={{ background: 'none', boxShadow: 'none', padding: 0, transform: 'none' }}
                                >
                                    <div className="w-6 h-6 rounded-full overflow-hidden scale-110 ring-2 ring-primary/30">
                                        <Avatar name={activeHousehold?.name} className="w-full h-full text-[8px]" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary truncate w-full text-center">
                                        {activeHousehold?.name ?? 'Home'}
                                    </span>
                                </button>
                            );
                        }

                        const isActive = location.pathname === item.path || (item.path === '/home' && location.pathname === '/');

                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex flex-col items-center gap-1.5 transition-[transform,opacity,color] duration-300 relative group`}
                                style={{ background: 'none', boxShadow: 'none', padding: 0, transform: 'none' }}
                            >
                                <div className={`transition-[transform,opacity,color] duration-300 ${isActive
                                        ? 'text-primary scale-110'
                                        : 'text-[#94A3B8] hover:text-primary/70'
                                    }`}>
                                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider transition-[color,opacity] duration-300 ${isActive ? 'text-primary' : 'text-[#94A3B8]'
                                    }`}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </nav>

            <HouseholdSwitcherSheet
                isOpen={isSwitcherOpen}
                onClose={() => setIsSwitcherOpen(false)}
                households={households}
                activeHouseholdId={activeHouseholdId}
                onSelect={(id) => { navigate(`/households/${id}`); setIsSwitcherOpen(false); }}
                onViewAll={() => { navigate('/home'); setIsSwitcherOpen(false); }}
            />
        </div>
    );
};

export default Layout;
