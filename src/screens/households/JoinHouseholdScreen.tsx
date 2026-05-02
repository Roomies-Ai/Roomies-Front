import { motion } from 'framer-motion';
import { ChevronLeft, Users } from 'lucide-react';
import { useJoinHousehold } from './hooks/useJoinHousehold';
import JoinHouseholdForm from './components/JoinHouseholdForm';

const JoinHouseholdScreen = () => {
    const { 
        inviteCode, 
        setInviteCode, 
        isLoading, 
        error, 
        handleJoin, 
        handleBack 
    } = useJoinHousehold();

    return (
        <div className="min-h-[80vh] flex flex-col p-6">
            <button 
                onClick={handleBack}
                className="w-10 h-10 rounded-2xl bg-white shadow-premium-sm flex items-center justify-center text-charcoal mb-8 active:scale-95 transition-all"
            >
                <ChevronLeft size={24} />
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                        <Users size={20} />
                    </div>
                    <span className="text-accent text-xs font-bold uppercase tracking-widest">Better Together</span>
                </div>
                
                <h1 className="text-3xl font-bold text-charcoal mb-4">Join a Household</h1>
                <p className="text-medium-gray mb-10 leading-relaxed">
                    Enter the unique 6-digit code shared by your roommates to join their sanctuary.
                </p>

                <JoinHouseholdForm 
                    inviteCode={inviteCode}
                    setInviteCode={setInviteCode}
                    isLoading={isLoading}
                    error={error}
                    onJoin={handleJoin}
                />
            </motion.div>
        </div>
    );
};

export default JoinHouseholdScreen;
