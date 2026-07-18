import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, X, Send } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { clearUnread } from "../../store/slices/notificationsSlice";
import { useGetMyNotificationsQuery } from "../../api/notifications.api";
import { useGlobalSearch } from "./hooks/useGlobalSearch";
import SearchResults from "./components/SearchResults";

interface HeaderProps {
  showActions?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showActions = true }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { items: notifications, unreadCount } = useAppSelector(
    (state) => state.notifications,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [query, setQuery] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Call RTK Query hook, which automatically fetches when user is logged in
  useGetMyNotificationsQuery(undefined, { skip: !user });

  const searchResults = useGlobalSearch(query, { enabled: isSearchOpen });

  const closeSearch = () => {
    setIsSearchOpen(false);
    setQuery("");
  };

  const handleSelectResult = (path: string) => {
    navigate(path);
    closeSearch();
  };

  useEffect(() => {
    if (!isSearchOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        closeSearch();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchOpen]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 15) return "Good Noon";
    if (hour < 18) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
  };

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      dispatch(clearUnread());
    }
  };

  const formatDueDate = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffMs = due.getTime() - now.getTime();
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    if (diffHours <= 0) return "Due now";
    if (diffHours < 24) return `Due in ${diffHours}h`;
    return "Due today";
  };

  return (
    <header className="px-6 pt-6 md:pt-4 pb-4 fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="flex justify-between items-center bg-transparent max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!isSearchOpen ? (
            <motion.div
              key="user-info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-4 w-full"
            >
              <div className="relative">
                <img
                  src={
                    user?.profilePicture ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-premium-sm"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <p className="text-medium-gray text-[10px] font-bold uppercase tracking-wider">
                  {getGreeting()},
                </p>
                <h1 className="text-charcoal text-xl font-black tracking-tight">
                  {user?.username || "Guest"}!
                </h1>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="search-input"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              exit={{ opacity: 0, width: 0 }}
              className="flex-1 mr-4"
            >
              <div
                className="relative flex items-center"
                ref={searchContainerRef}
              >
                <input
                  type="text"
                  placeholder="Search tasks, roomies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full py-3 pl-4 pr-12 bg-white rounded-2xl border-none shadow-premium-sm focus:ring-2 focus:ring-primary/20 outline-none text-charcoal font-medium placeholder:text-medium-gray"
                  autoFocus
                />
                <button
                  onClick={closeSearch}
                  className="absolute right-3 p-1 text-medium-gray hover:text-charcoal transition-colors"
                >
                  <X size={20} />
                </button>
                {query.trim().length > 0 && (
                  <SearchResults
                    query={query}
                    results={searchResults}
                    onSelect={handleSelectResult}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showActions && (
          <div className="flex gap-2">
            {!isSearchOpen && (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-3 bg-white rounded-2xl text-charcoal hover:bg-gray-50 transition-all shadow-premium-sm active:scale-95 flex items-center justify-center"
              >
                <Search size={20} />
              </button>
            )}
            <a
              href="https://t.me/RoomiesUserNameBot"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-2xl text-[#229ED9] hover:bg-gray-50 transition-all shadow-premium-sm active:scale-95 flex items-center justify-center"
              title="Telegram Bot"
            >
              <Send size={20} />
            </a>

            <div className="relative">
              <button
                onClick={handleBellClick}
                className={`p-3 bg-white rounded-2xl transition-all shadow-premium-sm active:scale-95 flex items-center justify-center ${
                  showNotifications
                    ? "text-primary ring-2 ring-primary/20"
                    : "text-charcoal hover:bg-gray-50"
                }`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 min-w-[16px] h-4 bg-accent rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white px-0.5">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-premium p-4 z-50 border border-gray-100"
                  >
                    <h3 className="text-sm font-bold text-charcoal mb-3">
                      Tasks Due Today
                    </h3>
                    {notifications.length === 0 ? (
                      <p className="text-xs text-medium-gray text-center py-4">
                        No tasks due today
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {notifications.map((task) => (
                          <div
                            key={task.id}
                            className="flex gap-3 items-start p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                              {task.taskType?.name?.[0]?.toUpperCase() || "📋"}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-charcoal truncate">
                                {task.title}
                              </p>
                              <p className="text-[10px] text-medium-gray">
                                {task.dueDate
                                  ? formatDueDate(task.dueDate)
                                  : "Due today"}{" "}
                                · {task.household?.name}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
