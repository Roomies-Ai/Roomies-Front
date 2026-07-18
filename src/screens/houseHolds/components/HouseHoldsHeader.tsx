import React from 'react';
import { motion } from 'framer-motion';
import Avatar from '../../../components/ui/Avatar';

interface Props {
  userName: string;
  avatarUrl?: string;
}

export const HouseHoldsHeader: React.FC<Props> = ({ userName, avatarUrl }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex items-center justify-between p-6 pb-8 pt-8 bg-transparent w-full z-10"
    >
      <div className="flex flex-col">
        <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold tracking-wide">Good Morning,</span>
        <h2 className="text-slate-900 dark:text-white text-2xl font-extrabold leading-tight tracking-tight">
          Welcome back, {userName}!
        </h2>
      </div>
      <div className="relative shrink-0">
        <Avatar
          src={avatarUrl}
          name={userName}
          className="rounded-full size-12 ring-4 ring-white dark:ring-surface-dark shadow-sm text-sm"
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-background-dark rounded-full" />
      </div>
    </motion.header>
  );
};
