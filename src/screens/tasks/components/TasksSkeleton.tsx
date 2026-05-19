const TaskSkeleton = () => {
    return (
        <div className="bg-white p-5 rounded-[2.5rem] border border-slate-50 flex items-center gap-4 animate-pulse">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                <div className="h-3 bg-slate-50 rounded w-2/3"></div>
            </div>
            <div className="w-8 h-8 bg-slate-50 rounded-full"></div>
        </div>
    );
};

export const TasksSkeletonGroup = () => {
    return (
        <div className="space-y-10">
            {[1, 2].map((i) => (
                <div key={i} className="space-y-4">
                    <div className="flex items-center gap-3 animate-pulse">
                        <div className="w-8 h-8 bg-slate-100 rounded-xl"></div>
                        <div className="h-6 bg-slate-100 rounded w-32"></div>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((j) => (
                            <TaskSkeleton key={j} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskSkeleton;
