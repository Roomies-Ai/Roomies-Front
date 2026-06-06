import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface CalendarStatus {
    connected: boolean;
    calendarSyncEnabled: boolean;
}

interface ProfileGoogleCalendarCardProps {
    calendarStatus: CalendarStatus | null;
    calendarLoading: boolean;
    onConnect: () => void;
    onToggle: () => void;
    onDisconnect: () => void;
    variants: any;
}

const ProfileGoogleCalendarCard: React.FC<ProfileGoogleCalendarCardProps> = ({
    calendarStatus,
    calendarLoading,
    onConnect,
    onToggle,
    onDisconnect,
    variants,
}) => {
    const isConnected = Boolean(calendarStatus?.connected);
    const isSyncing = Boolean(calendarStatus?.calendarSyncEnabled);

    const statusLabel = isConnected
        ? 'Connected'
        : 'Not Connected';

    const statusSubtext = isConnected
        ? (isSyncing ? 'Syncing tasks to calendar' : 'Sync paused')
        : 'Enable task sync with Google Calendar';

    return (
        <motion.div variants={variants} className="bg-white p-6 rounded-[2.5rem] shadow-premium-sm border border-slate-50">
            <h3 className="text-slate-900 font-black tracking-tight mb-6">Google Calendar</h3>

            <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center
                        ${isConnected ? 'bg-green-50 text-green-500' : 'bg-white text-slate-400'}`}>
                        {isConnected ? <CheckCircle2 size={18} /> : <Calendar size={18} />}
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900">{statusLabel}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {statusSubtext}
                        </p>
                    </div>
                </div>

                {isConnected ? (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onToggle}
                            disabled={calendarLoading}
                            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors disabled:opacity-50"
                        >
                            {calendarLoading ? '...' : (isSyncing ? 'Pause' : 'Resume')}
                        </button>
                        <button
                            onClick={onDisconnect}
                            disabled={calendarLoading}
                            className="px-4 py-2 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                            Disconnect
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onConnect}
                        disabled={calendarLoading}
                        className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors disabled:opacity-50"
                    >
                        {calendarLoading ? '...' : 'Connect'}
                    </button>
                )}
            </div>
        </motion.div>
    );
};

export default ProfileGoogleCalendarCard;
