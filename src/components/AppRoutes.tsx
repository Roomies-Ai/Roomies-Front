import { Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from '../screens/login/LoginScreen';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import NewTaskScreen from '../screens/tasks/NewTaskScreen';
import TasksScreen from '../screens/tasks/TasksScreen';
import CreateHouseholdScreen from '../screens/households/CreateHouseholdScreen';
import JoinHouseholdScreen from '../screens/households/JoinHouseholdScreen';
import HouseholdDetailScreen from '../screens/households/HouseholdDetailScreen';
import Layout from './layout/Layout';
import type { AppRoutesProps } from '../types/AppRoutes.types';

const AppRoutes = ({ isAuthenticated }: AppRoutesProps) => (
    <Routes>
        <Route path="/login" element={
            isAuthenticated
                ? <Navigate to="/home" replace />
                : <LoginScreen />
        } />

        <Route element={
            isAuthenticated
                ? <Layout />
                : <Navigate to="/login" replace />
        }>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/households/:id" element={<HouseholdDetailScreen />} />
            <Route path="/households/new" element={<CreateHouseholdScreen />} />
            <Route path="/households/join" element={<JoinHouseholdScreen />} />
            <Route path="/tasks" element={<TasksScreen />} />
            <Route path="/tasks/new" element={<NewTaskScreen />} />
            <Route path="/ai" element={<HomeScreen />} />
            <Route path="/roomies" element={<HomeScreen />} />
            <Route path="/profile" element={<HomeScreen />} />
        </Route>

        <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
);

export default AppRoutes;
