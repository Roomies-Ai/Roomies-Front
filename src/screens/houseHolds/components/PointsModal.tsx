import { motion, AnimatePresence } from 'framer-motion';

import type { PointsModalProps } from '../HouseholdDetail.types';

const PointsModal = ({ isOpen, onClose, taskTitle, pointsValue, setPointsValue, onSave }: PointsModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-sm bg-white rounded-[3rem] p-8 shadow-2xl overflow-hidden text-center"
                    >
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Edit Points</h3>
                        <p className="text-slate-500 font-bold mb-8 italic">"{taskTitle}"</p>
                        
                        <div className="flex flex-col items-center gap-6">
                            <div className="flex items-center gap-8">
                                <button 
                                    onClick={() => setPointsValue(v => Math.max(1, v - 1))}
                                    className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors"
                                >
                                    <span className="text-3xl font-black">-</span>
                                </button>
                                <input 
                                    type="number"
                                    value={pointsValue}
                                    onChange={(e) => setPointsValue(parseInt(e.target.value) || 0)}
                                    className="text-6xl font-black text-[#3B95EA] w-32 bg-transparent border-none text-center focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    autoFocus
                                    onFocus={(e) => e.target.select()}
                                />
                                <button 
                                    onClick={() => setPointsValue(v => v + 1)}
                                    className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#3B95EA] hover:bg-blue-100 transition-colors"
                                >
                                    <span className="text-3xl font-black">+</span>
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-2 w-full">
                                {[1, 2, 3, 5, 10, 15, 20, 50].map(v => (
                                    <button 
                                        key={v}
                                        onClick={() => setPointsValue(v)}
                                        className={`py-2 rounded-xl font-black text-xs transition-all ${
                                            pointsValue === v ? 'bg-[#3B95EA] text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                                        }`}
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-4 w-full mt-4">
                                <button 
                                    onClick={onClose}
                                    className="flex-1 py-4 bg-slate-50 text-slate-400 font-black rounded-2xl hover:bg-slate-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={onSave}
                                    className="flex-[2] py-4 bg-[#3B95EA] text-white font-black rounded-2xl shadow-lg shadow-[#3B95EA]/20 hover:scale-[1.02] transition-all"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PointsModal;
