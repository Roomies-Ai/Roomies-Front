import { useAppSession } from './hooks/useAppSession';
import AppRoutes from './components/AppRoutes';
import SplashScreen from './components/SplashScreen';

const App = () => {
    const { isAuthenticated, isCheckingSession } = useAppSession();

    if (isCheckingSession) return <SplashScreen />;

    return <AppRoutes isAuthenticated={isAuthenticated} />;
};

export default App;
