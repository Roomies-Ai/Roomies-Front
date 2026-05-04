import { CheckCircle2, Sparkles } from 'lucide-react';
import MemberAvatar from './MemberAvatar';

import type { MemberAssignmentItemProps } from '../../HouseholdDetail.types';

const MemberAssignmentItem = ({ member, isSuggested, isMe, onClick }: MemberAssignmentItemProps) => {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center justify-between p-4 rounded-[2.5rem] border-2 transition-all group ${
                isSuggested 
                ? 'border-[#3B95EA] bg-blue-50/50 shadow-md shadow-blue-100' 
                : 'border-slate-50 hover:border-[#3B95EA] hover:bg-blue-50/50'
            }`}
        >
            <div className="flex items-center gap-4">
                <div className={`${isSuggested ? 'scale-110' : ''} transition-transform`}>
                    <MemberAvatar 
                        username={member.username} 
                        size="w-14 h-14" 
                        border={isSuggested}
                    />
                </div>
                <div className="text-left">
                    <div className="flex items-center gap-2">
                        <p className="font-black text-slate-900 text-lg">{isMe ? 'You' : member.username}</p>
                        {isSuggested && <Sparkles size={14} className="text-[#3B95EA]" />}
                    </div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Member</p>
                </div>
            </div>
            <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center transition-all ${isSuggested ? 'text-[#3B95EA] shadow-md' : 'text-slate-200 group-hover:text-[#3B95EA] group-hover:shadow-md'}`}>
                <CheckCircle2 size={24} />
            </div>
        </button>
    );
};

export default MemberAssignmentItem;
