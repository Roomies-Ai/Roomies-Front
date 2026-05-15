import React from 'react';
import { X, Search, Loader2, ChevronDown } from 'lucide-react';
import type { PreferredTasksHeaderProps } from '../types/preferredTasks.types';

const PreferredTasksHeader: React.FC<PreferredTasksHeaderProps> = ({
    searchQuery,
    setSearchQuery,
    fetching,
    onClose
}) => {
    return (
        <div className="p-8 border-b border-slate-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Manage Tasks</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Multi-select your preferences</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                    <X size={20} className="text-slate-400" />
                </button>
            </div>

            <div className="relative">
                <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus-within:border-primary focus-within:bg-white transition-all shadow-sm">
                    <Search size={18} className="text-slate-400" />
                    <input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search across households..."
                        className="bg-transparent border-none outline-none text-sm font-bold text-slate-900 w-full"
                    />
                    {fetching ? (
                        <Loader2 size={18} className="animate-spin text-primary" />
                    ) : (
                        <ChevronDown size={18} className="text-slate-400" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreferredTasksHeader;
