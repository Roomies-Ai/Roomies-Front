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
        <div className="flex flex-col w-100 max-w-md mx-auto bg-background-light dark:bg-background-dark text-charcoal dark:text-white overflow-x-hidden min-h-screen transition-colors duration-200">
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
    );
};

export default HouseHolds;
