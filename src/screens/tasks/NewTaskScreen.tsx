import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Bot, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const NewTaskScreen: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('Me');

    const roommates = [
        { name: 'Me', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
        { name: 'Sarah', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
        { name: 'David', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
        { name: 'Maya', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya' },
    ];

    return (
        <div className="bg-background min-h-screen flex flex-col">
            {/* Header */}
            <header className="px-6 pt-8 pb-4 flex items-center justify-between">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-3 bg-white rounded-2xl text-charcoal shadow-sm active:scale-90 transition-all"
                    style={{ background: 'white', padding: '12px', transform: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-xl font-bold text-charcoal">New Task</h2>
                <div className="w-12"></div> {/* Spacer */}
            </header>

            <form className="flex-1 px-6 py-4 flex flex-col gap-6">
                {/* Task Name */}
                <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-medium-gray ml-1">Task Name</label>
                    <input 
                        type="text"
                        placeholder="What needs to be done?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-white p-5 rounded-[24px] text-lg font-bold text-charcoal placeholder:text-gray-300 border-none outline-none shadow-sm focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-medium-gray ml-1 flex items-center gap-2">
                        Description
                        <Info size={14} className="text-gray-300" />
                    </label>
                    <textarea 
                        placeholder="Add details like location, shopping list, or specific instructions..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full bg-white p-5 rounded-[24px] text-base font-medium text-charcoal placeholder:text-gray-300 border-none outline-none shadow-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                </div>

                {/* Assign to */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-xs font-bold uppercase tracking-widest text-medium-gray">Assign to</label>
                        <button 
                            type="button"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 text-primary rounded-xl text-xs font-bold hover:bg-primary/10 transition-all"
                            style={{ background: 'rgba(59, 149, 234, 0.05)', boxShadow: 'none', padding: '6px 12px' }}
                        >
                            <Bot size={14} />
                            AI Suggest
                        </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
                        {roommates.map((roommate) => (
                            <button
                                key={roommate.name}
                                type="button"
                                onClick={() => setAssignedTo(roommate.name)}
                                className={`flex flex-col items-center gap-2 min-w-[70px] transition-all ${
                                    assignedTo === roommate.name ? 'scale-105' : 'opacity-60'
                                }`}
                                style={{ background: 'none', boxShadow: 'none', padding: 0, transform: 'none' }}
                            >
                                <div className={`relative w-14 h-14 rounded-2xl overflow-hidden ring-2 transition-all ${
                                    assignedTo === roommate.name ? 'ring-primary ring-offset-2' : 'ring-transparent'
                                }`}>
                                    <img src={roommate.avatar} alt={roommate.name} className="w-full h-full object-cover" />
                                </div>
                                <span className={`text-xs font-bold ${
                                    assignedTo === roommate.name ? 'text-primary' : 'text-charcoal'
                                }`}>{roommate.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Due Date */}
                <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-50 flex items-center justify-between cursor-pointer active:scale-98 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="text-medium-gray text-[10px] font-bold uppercase tracking-wider">Due Date</p>
                            <p className="text-charcoal font-bold text-base">Tomorrow, 10:00 AM</p>
                        </div>
                    </div>
                    <ChevronLeft size={20} className="rotate-180 text-gray-300" />
                </div>

                {/* Submit Button */}
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="mt-auto mb-6 w-full h-16 bg-primary rounded-[24px] text-white font-bold text-lg shadow-premium flex items-center justify-center gap-2"
                >
                    Create Task
                </motion.button>
            </form>
        </div>
    );
};

export default NewTaskScreen;
