import { LogOut } from 'lucide-react';
import type { HouseholdInfoProps } from '../HouseholdDetail.types';

const HouseholdInfo = ({ name, inviteCode, onLeave }: HouseholdInfoProps) => {
    return (
        <div className="mb-8 flex justify-between items-start">
            <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{name}</h2>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-[#3B95EA]/10 px-3 py-1.5 rounded-xl border border-[#3B95EA]/10">
                        <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[#3B95EA]">Invite Code</span>
                        <span className="text-[#3B95EA] font-black text-xs tracking-widest font-mono">{inviteCode}</span>
                    </div>
                </div>
            </div>

            {onLeave && (
                <button 
                    onClick={onLeave}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition-all font-black text-[10px] uppercase tracking-widest mt-1 shadow-sm shadow-red-100"
                >
                    <LogOut size={16} />
                    Leave
                </button>
            )}
        </div>
    );
};

export default HouseholdInfo;
