import React from 'react';
import type { Household } from '../../../types/household';

interface StatsHouseholdSelectorProps {
    households: Household[];
    selectedHousehold: string;
    setSelectedHousehold: (id: string) => void;
}

const StatsHouseholdSelector: React.FC<StatsHouseholdSelectorProps> = ({
    households,
    selectedHousehold,
    setSelectedHousehold
}) => {
    if (households.length <= 1) return null;

    return (
        <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
            {households.map(h => (
                <button
                    key={h.id}
                    onClick={() => setSelectedHousehold(h.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${
                        selectedHousehold === h.id 
                        ? 'bg-primary border-primary text-white shadow-lg shadow-blue-200' 
                        : 'bg-white border-slate-100 text-slate-400 hover:border-blue-100'
                    }`}
                >
                    {h.name}
                </button>
            ))}
        </div>
    );
};

export default StatsHouseholdSelector;
