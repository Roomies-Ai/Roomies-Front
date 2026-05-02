import type { ManualTaskFormProps } from './AddTaskModal.types';
import PointsSelector from './PointsSelector';
import DueDateSelector from './DueDateSelector';
import AssigneeSelector from './AssigneeSelector';
import TaskTypeSelector from './TaskTypeSelector';

const ManualTaskForm = ({
    title, setTitle,
    description, setDescription,
    points, setPoints,
    dueDate, setDueDate,
    selectedAssignee, setSelectedAssignee,
    selectedTaskType, setSelectedTaskType,
    activeHousehold,
    isAddingType, setIsAddingType,
    newTypeName, setNewTypeName,
    isCreatingType, handleAddType,
    onSubmit, onDelete,
    isEdit
}: ManualTaskFormProps) => {
    return (
        <div className="space-y-4">
            <div className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Task Title (e.g. Wash the dishes)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-5 bg-slate-50 rounded-[1.5rem] border-2 border-transparent focus:border-primary focus:bg-white outline-none font-bold text-slate-900 transition-all placeholder:text-slate-300"
                />
                <textarea 
                    placeholder="Task Description (e.g. Please clean all plates and pans)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full p-5 bg-slate-50 rounded-[1.5rem] border-2 border-transparent focus:border-primary focus:bg-white outline-none font-medium text-slate-900 transition-all placeholder:text-slate-300 resize-none"
                />

                <PointsSelector points={points} setPoints={setPoints} />
                <DueDateSelector dueDate={dueDate} setDueDate={setDueDate} />
            </div>

            <AssigneeSelector 
                selectedAssignee={selectedAssignee} 
                setSelectedAssignee={setSelectedAssignee} 
                members={activeHousehold?.members || []} 
            />

            <TaskTypeSelector 
                selectedTaskType={selectedTaskType}
                setSelectedTaskType={setSelectedTaskType}
                taskTypes={activeHousehold?.taskTypes || []}
                isAddingType={isAddingType}
                setIsAddingType={setIsAddingType}
                newTypeName={newTypeName}
                setNewTypeName={setNewTypeName}
                isCreatingType={isCreatingType}
                handleAddType={handleAddType}
            />

            <div className="flex gap-3">
                {isEdit && onDelete && (
                    <button onClick={onDelete} className="px-5 bg-red-50 text-red-500 rounded-[1.5rem] font-bold transition-all hover:bg-red-100 flex items-center justify-center">
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                )}
                <button onClick={onSubmit} disabled={!title.trim() || !description.trim() || !dueDate} className="flex-1 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-slate-200 disabled:opacity-50 transition-all">
                    {isEdit ? 'Update Task' : 'Add Task'}
                </button>
            </div>
        </div>
    );
};

export default ManualTaskForm;

