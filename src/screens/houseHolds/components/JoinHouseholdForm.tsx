import { motion } from 'framer-motion';
import { Zap, Loader2 } from 'lucide-react';

import type { JoinHouseholdFormProps } from '../types/JoinHousehold.types';

const JoinHouseholdForm = ({
    inviteCode,
    setInviteCode,
    isLoading,
    error,
    onJoin
}: JoinHouseholdFormProps) => {
    return (
        <form onSubmit={onJoin} className="space-y-6">
            <div>
                <label className="block text-xs font-bold text-medium-gray uppercase tracking-widest mb-3 ml-1">
                    Invite Code
                </label>
                <input 
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    placeholder="e.g. RM-1234"
                    className="w-full p-5 bg-white rounded-2xl border-none shadow-premium-sm focus:ring-2 focus:ring-accent/20 outline-none text-charcoal font-mono text-2xl font-bold text-center tracking-[0.5em] placeholder:text-gray-200 transition-all uppercase"
                    autoFocus
                />
            </div>

            {error && (
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm font-medium text-center"
                >
                    {error}
                </motion.p>
            )}

            <div className="pt-4">
                <button 
                    type="submit"
                    disabled={isLoading || !inviteCode.trim()}
                    className={`w-full py-4 rounded-2xl font-bold text-white shadow-premium transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                        isLoading || !inviteCode.trim() ? 'bg-gray-300 shadow-none' : 'bg-accent hover:opacity-90'
                    }`}
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>
                            <Zap size={20} />
                            <span>Join Sanctuary</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default JoinHouseholdForm;
