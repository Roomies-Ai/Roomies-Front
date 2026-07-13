import React from "react";
import { CheckCircle2, Home, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import MemberAvatar from "../../../screens/houseHolds/components/ui/MemberAvatar";
import type { GlobalSearchResults } from "../types/search.types";

interface SearchResultsProps {
  query: string;
  results: GlobalSearchResults;
  onSelect: (path: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  results,
  onSelect,
}) => {
  const { tasks, households, members, isLoading } = results;
  const hasResults =
    tasks.length > 0 || households.length > 0 || members.length > 0;

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
        <p className="text-xs text-medium-gray text-center py-4">
          No results for "{query}"
        </p>
      ) : (
        <div className="space-y-4">
          {tasks.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-medium-gray mb-2 px-1">
                Tasks
              </h3>
              <div className="space-y-1">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => onSelect(`/households/${task.householdId}`)}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-charcoal truncate">
                        {task.title}
                      </p>
                      <p className="text-[10px] text-medium-gray truncate">
                        {task.householdName}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {households.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-medium-gray mb-2 px-1">
                Households
              </h3>
              <div className="space-y-1">
                {households.map((household) => (
                  <button
                    key={household.id}
                    onClick={() => onSelect(`/households/${household.id}`)}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Home size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-charcoal truncate">
                        {household.name}
                      </p>
                      <p className="text-[10px] text-medium-gray truncate">
                        {household.memberCount} member
                        {household.memberCount === 1 ? "" : "s"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SearchResults;
