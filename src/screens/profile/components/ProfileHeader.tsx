import { ChevronLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = () => {
    const navigate = useNavigate();
    
    return (
        <header className="px-6 py-8 flex items-center justify-between bg-white border-b border-slate-100">
            <button 
                onClick={() => navigate(-1)} 
                className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
                aria-label="Go back"
            >
                <ChevronLeft size={24} className="text-slate-900" />
            </button>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">Profile</h1>
            <button 
                className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
                aria-label="Settings"
            >
                <Settings size={24} className="text-slate-900" />
            </button>
        </header>
    );
};

export default ProfileHeader;
