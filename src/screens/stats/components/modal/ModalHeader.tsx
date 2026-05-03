import { Users, PieChart as PieIcon } from 'lucide-react';
import type { ModalHeaderProps } from '../../StatsScreen.types';

const ModalHeader = ({ selectedEntity }: ModalHeaderProps) => {
    return (
        <div className="flex flex-col items-center text-center mb-6">
            <div className={`w-20 h-20 rounded-3xl mb-4 flex items-center justify-center ${
                selectedEntity.type === 'MEMBER' ? 'bg-blue-50 text-primary' : 'bg-green-50 text-green-600'
            }`}>
                {selectedEntity.type === 'MEMBER' ? <Users size={40} /> : <PieIcon size={40} />}
            </div>
            <h3 className="text-2xl font-black text-slate-900">{selectedEntity.name}</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Detailed Situation</p>
        </div>
    );
};

export default ModalHeader;
