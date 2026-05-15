import { Home, Plus } from 'lucide-react';

const HomeEmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-md mx-auto min-h-full py-10">
            <div className="relative mb-8 scale-90 sm:scale-100">
                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150"></div>
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 bg-white rounded-full shadow-premium flex items-center justify-center border border-gray-50">
                    <div className="text-primary/40">
                        <Home size={70} strokeWidth={1.5} />
                    </div>
                    <div className="absolute bottom-4 right-4 w-10 h-10 sm:w-12 sm:h-12 bg-[#D1FAE5] text-[#059669] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <Plus size={24} strokeWidth={3} />
                    </div>
                </div>
            </div>

            <h2 className="text-charcoal text-3xl sm:text-[2.5rem] font-black leading-tight mb-3 tracking-tight">
                No households found
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg font-medium leading-relaxed max-w-[280px]">
                It looks like you're not part of any household yet. Let's find you a place to call home!
            </p>
        </div>
    );
};

export default HomeEmptyState;
