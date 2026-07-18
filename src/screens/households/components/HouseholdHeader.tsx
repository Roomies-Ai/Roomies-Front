import { motion } from "framer-motion";
import { Bell, Home } from "lucide-react";

import type { HouseholdHeaderProps } from "../HouseholdDetail.types";

const HouseholdHeader = ({ currentUser, onBack }: HouseholdHeaderProps) => {
  return (
    <header className="px-6 pt-12 pb-4 bg-white flex flex-col gap-6 sticky top-0 z-30 shadow-sm border-b border-slate-100">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 bg-blue-50 text-[#3B95EA] rounded-full flex items-center justify-center"
          >
            <Home size={20} />
          </motion.button>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            Roomies
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 relative">
            <Bell size={24} />
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username || "user"}`}
              alt="Avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HouseholdHeader;
