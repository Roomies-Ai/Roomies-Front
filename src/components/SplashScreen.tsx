import { Loader2 } from 'lucide-react';

const SplashScreen = () => (
    <div className="min-h-screen bg-off-white flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
    </div>
);

export default SplashScreen;
