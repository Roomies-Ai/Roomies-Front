import { motion } from 'framer-motion';
import { Building2, Sparkles, Home } from 'lucide-react';
import { typeIcons } from '../consts';
import type { Step2TypeProps } from '../types/Step2Type.types';

const Step2Type = ({
    houseTypes,
    selectedType,
    setSelectedType,
    onNext
}: Step2TypeProps) => {
    return (
        <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Building2 size={20} />
                </div>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Step 2 of 3</span>
            </div>

            <h1 className="text-3xl font-bold text-charcoal mb-4">What's the vibe?</h1>
            <p className="text-medium-gray mb-8 leading-relaxed">
                Pick the type of dwelling that best describes your new home.
            </p>

            <div className="flex-1">
                <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pb-4 pr-1 scrollbar-hide">
                    {houseTypes.map((name) => {
                        const Icon = typeIcons[name] || Home;
                        const isSelected = selectedType === name;
                        return (
                            <button
                                key={name}
                                type="button"
                                onClick={() => setSelectedType(name)}
                                className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 border-2 ${
                                    isSelected
                                        ? 'bg-primary/5 border-primary text-primary shadow-premium-sm scale-[1.02]'
                                        : 'bg-white border-transparent text-medium-gray hover:bg-gray-50'
                                }`}
                            >
                                <Icon size={24} strokeWidth={isSelected ? 2.5 : 2} />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-center">{name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="pt-4 mt-auto">
                <button
                    onClick={onNext}
                    disabled={!selectedType}
                    className={`w-full py-4 rounded-2xl font-bold text-white shadow-premium transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                        !selectedType ? 'bg-gray-200 shadow-none' : 'bg-primary hover:bg-primary-hover'
                    }`}
                >
                    <span>Continue</span>
                    <Sparkles size={18} />
                </button>
            </div>
        </motion.div>
    );
};

export default Step2Type;
