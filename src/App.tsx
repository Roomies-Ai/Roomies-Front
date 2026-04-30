import { Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const App = () => {

    return (
        <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/" element={<Navigate to={"/login"} />} />
        </Routes>
    );
};

export default App;
