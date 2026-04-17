import { Routes, Route, Navigate } from 'react-router-dom';
import GoogleAuth from './components/auth/GoogleAuth';
import HomeScreen from '../screens/HomeScreen';

const App = () => {

    return (
        <Routes>
            <Route path="/login" element={<GoogleAuth />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/" element={<Navigate to={"/login"} />} />
        </Routes>
    );
};

export default App;
