import React from 'react';
import { useHouseHolds } from './useHouseHolds';
import { HouseHoldsHeader } from './components/HouseHoldsHeader';
import { HouseHoldsEmptyState } from './components/HouseHoldsEmptyState';

/**
 * HouseHolds Screen
 * This screen allows users to select a household or create/join a new one.
 * It follows the "No Navbar" design requested.
 */
const HouseHolds: React.FC = () => {
    const { user, handleCreateOrJoin, handleInviteCode } = useHouseHolds();

    return (
        <div className="w-full min-h-screen bg-background-light dark:bg-background-dark text-charcoal dark:text-white transition-colors duration-200 md:flex md:flex-col md:items-center md:justify-center md:bg-gradient-to-br md:from-blue-50 md:to-slate-100 dark:md:from-gray-900 dark:md:to-gray-800 md:py-8">
            <div className="w-full max-w-md mx-auto md:shadow-2xl md:rounded-3xl md:overflow-hidden flex flex-col">
            {/* Header Section */}
            <HouseHoldsHeader
                userName={user.name || 'Alex'}
                avatarUrl={user.avatar}
            />

            {/* Main Content Area */}
            {/* For now, we only show the empty state as per the design requested */}
            <HouseHoldsEmptyState
                onCreateOrJoin={handleCreateOrJoin}
                onInviteCode={handleInviteCode}
            />
            </div>
        </div>
    );
};

export default HouseHolds;
