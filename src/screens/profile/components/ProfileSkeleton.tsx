import { User, Shield, Sparkles, ClipboardList } from 'lucide-react';

const ProfileSkeleton = () => {
    return (
        <div className="px-6 py-8 flex flex-col gap-8 max-w-lg mx-auto animate-pulse">
            {/* Banner Skeleton */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-50 flex flex-col items-center text-center gap-4 relative overflow-hidden">
                <div className="w-32 h-32 bg-slate-100 rounded-full border-8 border-white shadow-premium-sm"></div>
                <div className="space-y-2">
                    <div className="h-6 bg-slate-100 rounded-md w-40 mx-auto"></div>
                    <div className="h-4 bg-slate-50 rounded-md w-32 mx-auto"></div>
                </div>
                <div className="absolute top-6 right-6 w-10 h-10 bg-slate-50 rounded-2xl"></div>
            </div>

            {/* Details Card Skeleton */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-50 space-y-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-100">
                            <User size={20} />
                        </div>
                        <div className="h-5 bg-slate-100 rounded-md w-24"></div>
                    </div>
                    <div className="w-20 h-8 bg-slate-50 rounded-xl"></div>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <div className="h-3 bg-slate-50 rounded w-16"></div>
                            <div className="h-12 bg-slate-50/50 border border-slate-50 rounded-2xl w-full"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Vibes Card Skeleton */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-50 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-100">
                        <Sparkles size={20} />
                    </div>
                    <div className="h-5 bg-slate-100 rounded-md w-32"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-8 bg-slate-50 rounded-full w-24"></div>
                    ))}
                </div>
            </div>

            {/* Security/Tasks Skeletons (Smaller) */}
            <div className="grid grid-cols-1 gap-6">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-100">
                                {i === 1 ? <Shield size={20} /> : <ClipboardList size={20} />}
                            </div>
                            <div className="h-5 bg-slate-100 rounded-md w-32"></div>
                        </div>
                        <div className="w-8 h-8 bg-slate-50 rounded-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileSkeleton;
