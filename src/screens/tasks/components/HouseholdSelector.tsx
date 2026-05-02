import { Plus } from 'lucide-react';
import type { HouseholdSelectorProps } from './AddTaskModal.types';

const HouseholdSelector = ({ households, selectedHousehold, setSelectedHousehold }: HouseholdSelectorProps) => (
    <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Select Household</label>
        <div className="grid grid-cols-1 gap-2">
            {households.map(h => (
                <button
                    key={h.id}
                    onClick={() => setSelectedHousehold(h.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                        selectedHousehold === h.id 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-slate-50 bg-white text-slate-600'
                    }`}
                >
                    <span className="font-black">{h.name}</span>
                    {selectedHousehold === h.id && <Plus size={18} />}
                </button>
            ))}
        </div>
    </div>
);

export default HouseholdSelector;
