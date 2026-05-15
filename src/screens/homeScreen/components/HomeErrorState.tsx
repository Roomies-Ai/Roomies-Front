import React from 'react';
import { Plus } from 'lucide-react';
import type { HomeErrorStateProps } from '../types/home.types';

const HomeErrorState: React.FC<HomeErrorStateProps> = ({ error, onRetry }) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 max-w-md mx-auto">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mb-6 border border-red-100">
                <Plus size={40} className="rotate-45" />
            </div>
            <h2 className="text-charcoal text-2xl font-black mb-3">Something went wrong</h2>
            <p className="text-medium-gray text-base leading-relaxed mb-8">{error}</p>
            <button 
                onClick={onRetry}
                className="bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-premium active:scale-95 transition-all"
            >
                Retry Connection
            </button>
        </div>
    );
};

export default HomeErrorState;
