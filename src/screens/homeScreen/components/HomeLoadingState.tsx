import { Home } from 'lucide-react';

const HomeLoadingState = () => {
    return (
        <div className="flex flex-col gap-6 py-4 animate-pulse">
            <div className="flex justify-between items-center mb-2 opacity-50">
                <div className="h-8 bg-slate-100 rounded-lg w-40"></div>
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-200">
                    <Home size={20} />
                </div>
            </div>
            
            <div className="grid grid-cols-1 gap-5">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-slate-50 rounded-3xl"></div>
                            <div className="space-y-2">
                                <div className="h-5 bg-slate-100 rounded-md w-32"></div>
                                <div className="h-3 bg-slate-50 rounded-md w-20"></div>
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-slate-50 rounded-2xl"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeLoadingState;
