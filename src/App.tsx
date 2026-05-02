import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/login/LoginScreen';
import HomeScreen from './screens/homeScreen/HomeScreen';
import HouseHolds from './screens/houseHolds/HouseHolds';
import NewTaskScreen from './screens/tasks/NewTaskScreen';
import Layout from './components/layout/Layout';
import { useAppSelector } from './store/hooks';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    if (isAuthenticated) return <Navigate to="/home" replace />;
    return <>{children}</>;
};

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={
                <PublicRoute>
                    <LoginScreen />
                </PublicRoute>
            } />

            {/* Authenticated Routes */}
            <Route element={
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            }>
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/tasks" element={<HomeScreen />} />
                <Route path="/tasks/new" element={<NewTaskScreen />} />
                <Route path="/ai" element={<HomeScreen />} />
                <Route path="/roomies" element={<HomeScreen />} />
                <Route path="/profile" element={<HomeScreen />} />
                <Route path="/households" element={<HouseHolds />} />
            </Route>

            <Route path="/" element={<Navigate to={"/home"} />} />
        </Routes>
    );
};

export default App;
