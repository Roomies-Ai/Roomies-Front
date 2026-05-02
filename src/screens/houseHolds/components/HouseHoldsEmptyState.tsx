import React from 'react';
import { motion } from 'framer-motion';
import { Home, Plus, PlusCircle } from 'lucide-react';

interface Props {
  onCreateOrJoin: () => void;
  onInviteCode: () => void;
}

export const HouseHoldsEmptyState: React.FC<Props> = ({ onCreateOrJoin, onInviteCode }) => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-8 w-full">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'backOut' }}
        className="relative mb-10"
      >
        <div className="relative flex items-center justify-center w-40 h-40 bg-white dark:bg-neutral-800 rounded-full shadow-xl border-4 border-white dark:border-neutral-700 z-10">
          <Home size={80} className="text-sky-400 dark:text-sky-500 opacity-80" />
          <div className="absolute bottom-1 right-1 flex items-center justify-center w-11 h-11 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 rounded-full shadow-md border-4 border-white dark:border-neutral-800">
            <Plus size={24} strokeWidth={3} />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center space-y-3 mb-12 max-w-xs"
      >
        <h1 className="text-slate-900 dark:text-white text-[26px] font-bold leading-tight">
          No households found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
          It looks like you're not part of any household yet. Let's find you a place to call home!
        </p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCreateOrJoin}
        className="flex w-full items-center justify-center gap-3 rounded-full bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500 text-white p-5 shadow-lg transition-all duration-200"
      >
        <PlusCircle size={24} />
        <span className="text-lg font-bold tracking-wide pb-1 pt-1">Create or Join a Household</span>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={onInviteCode}
        className="mt-6 text-slate-400 dark:text-slate-500 text-sm font-semibold hover:text-sky-500 dark:hover:text-sky-400 transition-colors cursor-pointer"
      >
        Have an invite code?
      </motion.p>
    </main>
  );
};
