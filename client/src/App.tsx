import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import { loadUser } from './store/slices/authSlice';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import Profile from './pages/Profile';

// Stage Components
import IdeationStage from './pages/stages/IdeationStage';
import ProblemDefinitionStage from './pages/stages/ProblemDefinitionStage';
import SolutionDefinitionStage from './pages/stages/SolutionDefinitionStage';
import AudienceMarketStage from './pages/stages/AudienceMarketStage';
import TechnicalSpecStage from './pages/stages/TechnicalSpecStage';
import DatabaseDesignStage from './pages/stages/DatabaseDesignStage';
import WireframeStage from './pages/stages/WireframeStage';
import DevelopmentStage from './pages/stages/DevelopmentStage';
import GoToMarketStage from './pages/stages/GoToMarketStage';
import DomainHostingStage from './pages/stages/DomainHostingStage';

// Components
import PrivateRoute from './components/PrivateRoute';
import NotificationContainer from './components/NotificationContainer';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const { theme } = useAppSelector((state) => state.ui);

  useEffect(() => {
    // Load user on app mount
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  useEffect(() => {
    // Apply theme on mount
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <Router>
      <NotificationContainer />
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/profile" element={<Profile />} />

            {/* Stage Routes */}
            <Route path="/projects/:id/ideation" element={<IdeationStage />} />
            <Route path="/projects/:id/problem-definition" element={<ProblemDefinitionStage />} />
            <Route path="/projects/:id/solution-definition" element={<SolutionDefinitionStage />} />
            <Route path="/projects/:id/audience-market" element={<AudienceMarketStage />} />
            <Route path="/projects/:id/technical-spec" element={<TechnicalSpecStage />} />
            <Route path="/projects/:id/database-design" element={<DatabaseDesignStage />} />
            <Route path="/projects/:id/wireframe" element={<WireframeStage />} />
            <Route path="/projects/:id/development" element={<DevelopmentStage />} />
            <Route path="/projects/:id/go-to-market" element={<GoToMarketStage />} />
            <Route path="/projects/:id/domain-hosting" element={<DomainHostingStage />} />
          </Route>
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
