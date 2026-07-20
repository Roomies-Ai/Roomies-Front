import React from 'react';
import { motion } from 'framer-motion';
import { PawPrint, Plus, Trash2, Loader2, Sparkles } from 'lucide-react';

import type { Step3PetsProps } from '../types/Step3Pets.types';

const Step3Pets: React.FC<Step3PetsProps> = ({
    pets,
    newPetName,
    setNewPetName,
    newPetKind,
    setNewPetKind,
    onAddPet,
    onRemovePet,
    onCreate,
    isLoading,
    error
}) => {
    return (
        <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <PawPrint size={20} />
                </div>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Step 3 of 3</span>
            </div>
            
            <h1 className="text-3xl font-bold text-charcoal mb-4">Furry Friends?</h1>
            <p className="text-medium-gray mb-8 leading-relaxed">
                Add any pets that will be sharing the sanctuary with you.
            </p>

            <div className="space-y-4 mb-6">
                <div className="flex gap-2">
                    <div className="flex-1">
                        <input 
                            type="text"
                            value={newPetName}
                            onChange={(e) => setNewPetName(e.target.value)}
                            placeholder="Pet Name"
                            className="w-full p-4 bg-white rounded-2xl border-none shadow-premium-sm focus:ring-2 focus:ring-primary/20 outline-none text-charcoal font-medium text-sm"
                        />
                    </div>
                    <div className="flex-1">
                        <input 
                            type="text"
                            value={newPetKind}
                            onChange={(e) => setNewPetKind(e.target.value)}
                            placeholder="Kind (e.g. Cat)"
                            className="w-full p-4 bg-white rounded-2xl border-none shadow-premium-sm focus:ring-2 focus:ring-primary/20 outline-none text-charcoal font-medium text-sm"
                        />
                    </div>
                    <button 
                        onClick={onAddPet}
                        disabled={!newPetName.trim()}
                        className={`p-4 rounded-2xl shadow-premium transition-all ${
                            !newPetName.trim() ? 'bg-gray-100 text-gray-300' : 'bg-primary text-white'
                        }`}
                    >
                        <Plus size={24} />
                    </button>
                </div>

                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 scrollbar-hide">
                    {pets.map((pet, index) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={index}
                            className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-premium-sm border border-gray-50"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <PawPrint size={18} />
                                </div>
                                <div>
                                    <p className="font-bold text-charcoal text-sm">{pet.name}</p>
                                    <p className="text-[10px] text-medium-gray uppercase font-bold tracking-widest">{pet.kind}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => onRemovePet(index)}
                                className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </motion.div>
                    ))}
                    {pets.length === 0 && (
                        <div className="py-8 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                            <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">No pets added yet</p>
                        </div>
                    )}
                </div>
            </div>

            {error && (
                <p className="text-red-500 text-sm font-medium mb-4 text-center">{error}</p>
            )}

            <div className="pt-4 mt-auto">
                <button 
                    onClick={onCreate}
                    disabled={isLoading}
                    className={`w-full py-4 rounded-2xl font-bold text-white shadow-premium transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                        isLoading ? 'bg-gray-200 shadow-none' : 'bg-primary hover:bg-primary-hover'
                    }`}
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>
                            <span>Build My Home</span>
                            <Sparkles size={18} />
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
};

export default Step3Pets;
