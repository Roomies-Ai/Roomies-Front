import React from 'react';
import { motion } from 'framer-motion';

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
        <div
          className="bg-center bg-no-repeat bg-cover rounded-full size-12 ring-4 ring-white dark:ring-surface-dark shadow-sm"
          style={{
            backgroundImage: `url(${avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQO-bntOu8wjio0XPucw8jBA0xcxLMJM-sZ9j34L62pvah5nsqfMk8BFM_zO057jvuW5BGVj2RJr5t06c_qHvOdXJp3jGO56TSTX9Q1-h4XH5VMMvUCvg-5_YF9eSz0AS5fAu21WrYXb3RwCeqFlcerIgro0msnui5VvLl1WOxu_Kq17kQFko136CPQWMaXXbbkOv794cFflIqc8ke0mUt_batwY-SZsgAqil16cNWqjCjLTulfeXpHEmxwXr7pqKZB2XnpfaxkC8'})`
          }}
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-background-dark rounded-full" />
      </div>
    </motion.header>
  );
};
