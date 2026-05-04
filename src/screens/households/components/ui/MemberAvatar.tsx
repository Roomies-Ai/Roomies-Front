import type { MemberAvatarProps } from '../../HouseholdDetail.types';

const MemberAvatar = ({ username, size = "w-8 h-8", border = true }: MemberAvatarProps) => {
    return (
        <div className={`${size} rounded-full overflow-hidden bg-slate-100 ${border ? 'border border-white shadow-sm' : ''}`}>
            <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username || 'unassigned'}`} 
                alt={username} 
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default MemberAvatar;
