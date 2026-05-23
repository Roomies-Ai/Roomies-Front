import React, { useState } from 'react';
import { Send, CheckCircle2, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProfileUser } from '../types/profile.types';

const BOT_NAME = 'RoomiesUserNameBot';

interface ProfileTelegramCardProps {
    user: ProfileUser | null;
    telegramToken: string | null;
    telegramLoading: boolean;
    onUnlink: () => void;
    variants: any;
}

const ProfileTelegramCard: React.FC<ProfileTelegramCardProps> = ({
    user,
    telegramToken,
    telegramLoading,
    onUnlink,
    variants,
}) => {
    const [copied, setCopied] = useState(false);
    const isConnected = Boolean(user?.telegramChatId);
    const deepLink = telegramToken
        ? `https://t.me/${BOT_NAME}?start=link_${telegramToken}`
        : `https://t.me/${BOT_NAME}`;
    const connectCommand = telegramToken ? `/connect ${telegramToken}` : '';

    const handleCopy = () => {
        if (!connectCommand) return;
        navigator.clipboard.writeText(connectCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div variants={variants} className="bg-white p-6 rounded-[2.5rem] shadow-premium-sm border border-slate-50">
            <h3 className="text-slate-900 font-black tracking-tight mb-6">Telegram</h3>
            <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center
                        ${isConnected ? 'bg-green-50 text-green-500' : 'bg-white text-slate-400'}`}>
                        {isConnected ? <CheckCircle2 size={18} /> : <Send size={18} />}
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900">
                            {isConnected ? 'Connected' : 'Not Connected'}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {isConnected ? 'Receiving bot notifications' : 'Link to get task notifications'}
                        </p>
                    </div>
                </div>

                {isConnected ? (
                    <button
                        onClick={onUnlink}
                        disabled={telegramLoading}
                        className="px-4 py-2 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                        {telegramLoading ? '...' : 'Unlink'}
                    </button>
                ) : (
                    <a
                        href={deepLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors"
                    >
                        Open Bot
                    </a>
                )}
            </div>

            {!isConnected && telegramToken && (
                <div className="mt-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Then send this command to the bot
                    </p>
                    <div className="flex items-center justify-between gap-2">
                        <code className="text-sm font-bold text-slate-700 bg-white px-3 py-2 rounded-xl border border-slate-100 flex-1">
                            {connectCommand}
                        </code>
                        <button
                            onClick={handleCopy}
                            className="w-9 h-9 flex items-center justify-center bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors flex-shrink-0"
                        >
                            {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ProfileTelegramCard;
