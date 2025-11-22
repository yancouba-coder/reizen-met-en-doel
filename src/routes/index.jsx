import React from 'react';
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

const AppRoutes = () => {
    return (
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
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Admin />} />
                <Route path="dashboard" element={<Admin />} />
            </Route>

            {/* 404 Catch-all Route - Must be last */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
