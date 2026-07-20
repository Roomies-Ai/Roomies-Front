import { Loader2, Sparkles } from 'lucide-react';

import type { FinishButtonProps } from './Step4.types';

const FinishButton: React.FC<FinishButtonProps> = ({ onClick, isLoading, disabled }) => {
    return (
        <div className="pt-2 mt-auto">
            <button 
                onClick={onClick}
                disabled={disabled}
                className={`w-full py-5 rounded-3xl font-bold text-white shadow-premium transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
                    disabled ? 'bg-gray-200 shadow-none' : 'bg-accent hover:opacity-90'
                }`}
            >
                {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                ) : (
                    <>
                        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                            <Sparkles size={18} />
                        </div>
                        <span className="text-lg">Build My Home</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default FinishButton;
