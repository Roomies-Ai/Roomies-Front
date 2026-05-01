import { motion } from 'framer-motion';
import { Home, Sparkles } from 'lucide-react';
import type { Step1NameProps } from '../types/Step1Name.types';

const Step1Name = ({ name, setName, onNext }: Step1NameProps) => {
    return (
        <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Home size={20} />
                </div>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Step 1 of 3</span>
            </div>
            
            <h1 className="text-3xl font-bold text-charcoal mb-4">Name your home</h1>
            <p className="text-medium-gray mb-8 leading-relaxed">
                Every great sanctuary needs a name. What's yours called?
            </p>

            <div className="space-y-8 flex-1">
                <div>
                    <label className="block text-xs font-bold text-medium-gray uppercase tracking-widest mb-3 ml-1">
                        Household Name
                    </label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Baker Street Apt 2"
                        className="w-full p-5 bg-white rounded-2xl border-none shadow-premium-sm focus:ring-2 focus:ring-primary/20 outline-none text-charcoal font-medium placeholder:text-medium-gray transition-all text-lg"
                        autoFocus
                    />
                </div>

                <div className="pt-4 mt-auto">
                    <button 
                        onClick={onNext}
                        disabled={!name.trim()}
                        className={`w-full py-4 rounded-2xl font-bold text-white shadow-premium transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                            !name.trim() ? 'bg-gray-200 shadow-none' : 'bg-primary hover:bg-primary-hover'
                        }`}
                    >
                        <span>Continue</span>
                        <Sparkles size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Step1Name;
