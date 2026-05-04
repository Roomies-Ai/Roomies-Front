import type { AiTaskSectionProps } from './AddTaskModal.types';
import AiTaskGeneratorForm from './AiTaskGeneratorForm';
import AiTaskSuggestionsList from './AiTaskSuggestionsList';

const AiTaskSection = ({
    aiMessage, setAiMessage,
    isParsing, handleAiParse,
    suggestions, setSuggestions,
    handleToggleSuggestion,
    handleConfirmAi,
    activeHousehold
}: AiTaskSectionProps) => {
    return (
        <div className="space-y-4">
            {suggestions.length === 0 ? (
                <AiTaskGeneratorForm 
                    aiMessage={aiMessage} 
                    setAiMessage={setAiMessage} 
                    isParsing={isParsing} 
                    handleAiParse={handleAiParse} 
                />
            ) : (
                <AiTaskSuggestionsList 
                    suggestions={suggestions}
                    handleToggleSuggestion={handleToggleSuggestion}
                    setSuggestions={setSuggestions}
                    setAiMessage={setAiMessage}
                    handleConfirmAi={handleConfirmAi}
                    activeHousehold={activeHousehold}
                />
            )}
        </div>
    );
};

export default AiTaskSection;

