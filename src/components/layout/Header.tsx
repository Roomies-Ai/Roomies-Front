import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';

const Header: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <header className="px-6 pt-8 pb-4 flex justify-between items-center bg-transparent">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <img 
                        src={user?.profilePicture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
                        alt="Profile" 
                        className="w-12 h-12 rounded-2xl object-cover ring-4 ring-white shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                    <p className="text-medium-gray text-xs font-semibold uppercase tracking-widest">Good Morning</p>
                    <h1 className="text-charcoal text-lg font-bold leading-tight">Welcome, {user?.username || 'Guest'}!</h1>
                </div>
            </div>

            <div className="flex gap-2">
                <button 
                    className="p-3 bg-white rounded-2xl text-charcoal hover:bg-gray-50 transition-all shadow-premium-sm active:scale-95 flex items-center justify-center"
                    style={{ background: 'white' }}
                >
                    <Search size={20} />
                </button>
                <button 
                    className="p-3 bg-white rounded-2xl text-charcoal hover:bg-gray-50 transition-all shadow-premium-sm relative active:scale-95 flex items-center justify-center"
                    style={{ background: 'white' }}
                >
                    <Bell size={20} />
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white"></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
