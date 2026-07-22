import { LogOut } from 'lucide-react';
import { useAppDispatch } from '../../../store/hooks';
import { logout } from '../../../store/slices/authSlice';
import { useLogoutMutation } from '../../../api/auth.api';

const ProfileHeader = () => {
    const dispatch = useAppDispatch();
    const [logoutMutation] = useLogoutMutation();

    const handleLogout = async () => {
        await logoutMutation();
        dispatch(logout());
    };

    return (
        <header className="px-6 py-8 flex items-center justify-between bg-white border-b border-slate-100">
            <div></div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">Profile</h1>
            <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-50 text-slate-900 hover:text-red-600 rounded-xl transition-colors"
                aria-label="Logout"
            >
                <LogOut size={24} />
            </button>
        </header>
    );
};

export default ProfileHeader;

