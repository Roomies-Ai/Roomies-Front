import React from 'react';
import { Loader2 } from 'lucide-react';
import type { PreferredTasksFooterProps } from '../types/preferredTasks.types';

const PreferredTasksFooter: React.FC<PreferredTasksFooterProps> = ({
    onClose,
    onSave,
    loading,
    fetching,
    selectedCount
}) => {
    return (
        <div className="p-8 border-t border-slate-100 bg-white">
            <div className="flex gap-4">
                <button 
                    onClick={onClose}
                    className="flex-1 px-6 py-4 rounded-2xl font-black text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all text-sm uppercase tracking-widest"
                >
                    Cancel
                </button>
                <button 
                    onClick={onSave}
                    disabled={loading || fetching}
                    className="flex-[2] bg-primary text-white py-4 rounded-2xl font-black shadow-premium active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 size={18} className="animate-spin" />
                            <span>Saving...</span>
                        </div>
                    ) : (
                        `Save ${selectedCount} Preferences`
                    )}
                </button>
            </div>
        </div>
    );
};

export default PreferredTasksFooter;
