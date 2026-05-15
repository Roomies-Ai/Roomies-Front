import React from 'react';
import { X } from 'lucide-react';

interface ChangePasswordHeaderProps {
    onClose: () => void;
}

const ChangePasswordHeader: React.FC<ChangePasswordHeaderProps> = ({ onClose }) => {
    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Change Password</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Keep your account secure</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                <X size={20} className="text-slate-400" />
            </button>
        </div>
    );
};

export default ChangePasswordHeader;
