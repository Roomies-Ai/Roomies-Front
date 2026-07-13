import React from 'react';
import { CheckCircle2, Home, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import MemberAvatar from '../../../screens/houseHolds/components/ui/MemberAvatar';
import type { GlobalSearchResults } from '../types/search.types';

interface SearchResultsProps {
    query: string;
    results: GlobalSearchResults;
    onSelect: (path: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results, onSelect }) => {
    const { tasks, households, members, isLoading } = results;
    const hasResults = tasks.length > 0 || households.length > 0 || members.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-premium border border-gray-100 p-4 z-50 max-h-[70vh] overflow-y-auto"
        >
            {isLoading && !hasResults ? (
                <div className="flex items-center justify-center gap-2 py-6 text-medium-gray text-sm font-medium">
                    <Loader2 size={16} className="animate-spin" />
                    Searching...
                </div>
            ) : !hasResults ? (
                <p className="text-xs text-medium-gray text-center py-4">No results for "{query}"</p>
            ) : }
        </motion.div>
    );
};

export default SearchResults;
