import { Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/login/LoginScreen';
import HomeScreen from './screens/homeScreen/HomeScreen';
import HouseHolds from './screens/houseHolds/HouseHolds';

const App = () => {

    return (
        <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/households" element={<HouseHolds />} />
            <Route path="/" element={<Navigate to={"/login"} />} />
        </Routes>
    );
};

export default App;
