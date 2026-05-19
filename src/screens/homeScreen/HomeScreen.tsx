// Components
import HomeLoadingState from './components/HomeLoadingState';
import HomeErrorState from './components/HomeErrorState';
import HomeEmptyState from './components/HomeEmptyState';
import HouseholdList from './components/HouseholdList';
import HomeActionButtons from './components/HomeActionButtons';
import LeaveHouseholdModal from '../households/components/LeaveHouseholdModal';

// Hooks
import { useHomeScreen } from './useHomeScreen';
import { useHomeUI } from './hooks/useHomeUI';

const HomeScreen = () => {
    const { households, loading, error, refresh } = useHomeScreen();
    const { 
        handleCreateJoin, 
        handleJoinWithCode, 
        handleNavigateToHousehold,
        handleLeaveHousehold,
        handleConfirmLeave,
        isLeaveModalOpen,
        setIsLeaveModalOpen,
        householdToLeave
    } = useHomeUI(refresh);

    return (
        <div className="bg-white h-[100vh] flex flex-col pt-0 overflow-hidden relative">
            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col overflow-hidden px-8 w-full max-w-4xl mx-auto">
                {loading ? (
                    <HomeLoadingState />
                ) : error ? (
                    <HomeErrorState error={error} onRetry={refresh} />
                ) : (
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* 1. SCROLLABLE CONTENT (List or Empty State) */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide py-4">
                            {households.length > 0 ? (
                                <HouseholdList 
                                    households={households} 
                                    onNavigate={handleNavigateToHousehold} 
                                    onLeave={handleLeaveHousehold}
                                />
                            ) : (
                                <HomeEmptyState />
                            )}
                        </div>

                        {/* 2. FIXED FOOTER (Buttons) */}
                        <HomeActionButtons 
                            onCreateJoin={handleCreateJoin} 
                            onHaveInviteCode={handleJoinWithCode} 
                        />
                    </div>
                )}
            </div>
            
            {/* Functional Spacer for Bottom Nav - Prevents overlapping */}
            <div className="h-[80px] shrink-0 bg-white"></div>

            <LeaveHouseholdModal 
                isOpen={isLeaveModalOpen}
                onClose={() => setIsLeaveModalOpen(false)}
                onConfirm={handleConfirmLeave}
                householdName={householdToLeave?.name || ''}
            />
        </div>
    );
};

export default HomeScreen;