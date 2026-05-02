import { AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useCreateHousehold } from './hooks/useCreateHousehold';

// Sub-components
import Step1Name from './components/Step1Name';
import Step2Type from './components/Step2Type';
import Step3Pets from './components/Step3Pets';
import Step4Tasks from './components/Step4Tasks';

const CreateHouseholdScreen: React.FC = () => {
    const {
        step,
        name,
        setName,
        houseTypes,
        selectedTypeId,
        setSelectedTypeId,
        pets,
        newPetName,
        setNewPetName,
        newPetKind,
        setNewPetKind,
        suggestedTasks,
        isGeneratingTasks,
        isLoading,
        isFetchingTypes,
        error,
        handleAddPet,
        handleRemovePet,
        handleToggleTask,
        handleUpdateTask,
        handleFinish,
        nextStep,
        prevStep,
        handleAddManualTask,
        handleRemoveTask
    } = useCreateHousehold();

    return (
        <div className="min-h-[80vh] flex flex-col p-6 overflow-hidden max-w-2xl mx-auto w-full">
            {/* Header / Navigation */}
            <div className="flex justify-between items-center mb-8">
                <button 
                    onClick={prevStep}
                    className="w-10 h-10 rounded-2xl bg-white shadow-premium-sm flex items-center justify-center text-charcoal active:scale-95 transition-all"
                >
                    <ChevronLeft size={24} />
                </button>
                <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((s) => (
                        <div 
                            key={s} 
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                s === step ? 'w-8 bg-primary' : 'w-2 bg-gray-200'
                            }`}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <Step1Name 
                        name={name} 
                        setName={setName} 
                        onNext={nextStep} 
                    />
                )}
                {step === 2 && (
                    <Step2Type 
                        houseTypes={houseTypes}
                        selectedTypeId={selectedTypeId}
                        setSelectedTypeId={setSelectedTypeId}
                        isFetchingTypes={isFetchingTypes}
                        onNext={nextStep}
                    />
                )}
                {step === 3 && (
                    <Step3Pets 
                        pets={pets}
                        newPetName={newPetName}
                        setNewPetName={setNewPetName}
                        newPetKind={newPetKind}
                        setNewPetKind={setNewPetKind}
                        onAddPet={handleAddPet}
                        onRemovePet={handleRemovePet}
                        onCreate={nextStep}
                        isLoading={isLoading}
                        error={error}
                    />
                )}
                {step === 4 && (
                    <Step4Tasks 
                        tasks={suggestedTasks}
                        isGenerating={isGeneratingTasks}
                        onToggleTask={handleToggleTask}
                        onUpdateTask={handleUpdateTask}
                        onAddTask={handleAddManualTask}
                        onRemoveTask={handleRemoveTask}
                        onFinish={handleFinish}
                        isLoading={isLoading}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CreateHouseholdScreen;
