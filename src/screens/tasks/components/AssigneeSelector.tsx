import { User as UserIcon } from 'lucide-react';
import MemberAvatar from '../../houseHolds/components/ui/MemberAvatar';
import type { AssigneeSelectorProps } from './AddTaskModal.types';

const AssigneeSelector = ({ selectedAssignee, setSelectedAssignee, members }: AssigneeSelectorProps) => (
    <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Assign to (Optional)</label>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button onClick={() => setSelectedAssignee(null)} className={`shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${selectedAssignee === null ? 'border-primary bg-primary/5' : 'border-slate-50 bg-white'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedAssignee === null ? 'bg-primary/10 text-primary' : 'bg-slate-50 text-slate-400'}`}><UserIcon size={20} /></div>
                <span className={`text-[10px] font-black truncate w-16 text-center ${selectedAssignee === null ? 'text-primary' : 'text-slate-400'}`}>Unassigned</span>
            </button>
            {members?.map((member: any) => (
                <button key={member.id} onClick={() => setSelectedAssignee(member.username)} className={`shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${selectedAssignee === member.username ? 'border-primary bg-primary/5' : 'border-slate-50 bg-white'}`}>
                    <MemberAvatar username={member.username} profilePicture={member.profilePicture} size="w-12 h-12" border={selectedAssignee === member.username} />
                    <span className={`text-[10px] font-black truncate w-16 text-center ${selectedAssignee === member.username ? 'text-primary' : 'text-slate-400'}`}>{member.username}</span>
                </button>
            ))}
        </div>
    </div>
);

export default AssigneeSelector;
