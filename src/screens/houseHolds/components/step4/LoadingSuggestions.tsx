import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSuggestions: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full animate-pulse"></div>
                <Loader2 className="animate-spin text-accent relative" size={48} />
            </div>
            <p className="text-sm font-bold text-medium-gray uppercase tracking-widest animate-pulse">Consulting the Oracle...</p>
        </div>
    );
};

export default LoadingSuggestions;
