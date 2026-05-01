import { Plus } from 'lucide-react';

import type { AddTaskButtonProps } from './Step4.types';

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full py-5 border-2 border-dashed border-gray-200 rounded-[2rem] text-medium-gray text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:border-accent/40 hover:text-accent hover:bg-accent/5 transition-all group"
        >
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-accent group-hover:text-white transition-all">
                <Plus size={18} />
            </div>
            Add Custom Mission
        </button>
    );
};

export default AddTaskButton;
