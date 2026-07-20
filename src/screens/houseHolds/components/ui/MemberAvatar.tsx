import Avatar from '../../../../components/ui/Avatar';
import type { MemberAvatarProps } from '../../HouseholdDetail.types';

const MemberAvatar = ({ username, profilePicture, size = "w-8 h-8", border = true }: MemberAvatarProps) => {
    return (
        <div className={`${size} rounded-full overflow-hidden bg-slate-100 ${border ? 'border border-white shadow-sm' : ''}`}>
            <Avatar
                src={profilePicture}
                name={username}
                alt={username}
                className="w-full h-full text-[10px]"
            />
        </div>
    );
};

export default MemberAvatar;
