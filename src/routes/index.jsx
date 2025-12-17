import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '../components/templates/DefaultLayout';
import AdminLayout from '../components/templates/AdminLayout';

import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import ProjectDetail from '../pages/ProjectDetail';
import Donate from '../pages/Donate';
import Contact from '../pages/Contact';
import WaitingList from '../pages/Sponsorships/WaitingList';
import SponsoredList from '../pages/Sponsorships/SponsoredList';
import ChildDetail from '../pages/Sponsorships/ChildDetail';
import Admin from '../pages/Admin';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import DashboardLayout from '../components/templates/DashboardLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import MySponsoredChildren from '../pages/Dashboard/MySponsoredChildren';
import BrowseChildren from '../pages/Dashboard/BrowseChildren';
import MyProjects from '../pages/Dashboard/MyProjects';
import BrowseProjects from '../pages/Dashboard/BrowseProjects';
import Profile from '../pages/Dashboard/Profile';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import NotFound from '../pages/NotFound';

// Admin Pages
import AdminLogin from '../pages/Admin/AdminLogin';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminPhotos from '../pages/Admin/AdminPhotos';
import AdminChildren from '../pages/Admin/AdminChildren';
import AdminProjects from '../pages/Admin/AdminProjects';
import AdminTrips from '../pages/Admin/AdminTrips';
import AdminSettings from '../pages/Admin/AdminSettings';
import { Navigate } from 'react-router-dom';

import { ToastProvider } from '../context/ToastContext';
import { initData } from '../utils/initData';

const AppRoutes = () => {
    useEffect(() => {
        initData();
    }, []);

    return (
        <ToastProvider>
            <Routes>
                {/* Public Routes */}
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                    <Route path="/donate" element={<Donate />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/sponsorships/waiting" element={<WaitingList />} />
                    <Route path="/sponsorships/sponsored" element={<SponsoredList />} />
                    <Route path="/sponsorships/:id" element={<ChildDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Dashboard />} />
                    <Route path="my-children" element={<MySponsoredChildren />} />
                    <Route path="my-projects" element={<MyProjects />} />
                    <Route path="browse-children" element={<BrowseChildren />} />
                    <Route path="browse-projects" element={<BrowseProjects />} />
                    <Route path="profile" element={<Profile />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="photos" element={<AdminPhotos />} />
                    <Route path="children" element={<AdminChildren />} />
                    <Route path="projects" element={<AdminProjects />} />
                    <Route path="trips" element={<AdminTrips />} />
                    <Route path="settings" element={<AdminSettings />} />
                </Route>

                {/* 404 Catch-all Route - Must be last */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ToastProvider>
    );
};

export default AppRoutes;
