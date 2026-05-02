import { Utensils, Trash2, Sprout, CheckSquare } from 'lucide-react';

import type { TaskIconProps } from '../../HouseholdDetail.types';

const TaskIcon = ({ title, size = 24 }: TaskIconProps) => {
    const t = title.toLowerCase();
    if (t.includes('dish')) return <Utensils size={size} />;
    if (t.includes('trash')) return <Trash2 size={size} />;
    if (t.includes('plant')) return <Sprout size={size} />;
    return <CheckSquare size={size} />;
};

export default TaskIcon;
