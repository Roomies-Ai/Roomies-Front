import { CheckCircle } from 'lucide-react';

const ChangePasswordSuccess = () => {
    return (
        <div className="py-10 flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
                <CheckCircle size={48} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-black text-slate-900">Security Updated</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Your password was changed successfully</p>
        </div>
    );
};

export default ChangePasswordSuccess;
