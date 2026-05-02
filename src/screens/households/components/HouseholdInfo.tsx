import type { HouseholdInfoProps } from '../HouseholdDetail.types';

const HouseholdInfo = ({ name, inviteCode }: HouseholdInfoProps) => {
    return (
        <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{name}</h2>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-[#3B95EA]/10 px-3 py-1.5 rounded-xl border border-[#3B95EA]/10">
                    <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[#3B95EA]">Invite Code</span>
                    <span className="text-[#3B95EA] font-black text-xs tracking-widest font-mono">{inviteCode}</span>
                </div>
            </div>
        </div>
    );
};

export default HouseholdInfo;
