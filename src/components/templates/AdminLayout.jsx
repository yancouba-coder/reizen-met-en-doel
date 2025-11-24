import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Icon from '../atoms/Icon';
import { clsx } from 'clsx';

const AdminLayout = ({ children }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const menuItems = [
        { path: '/admin/dashboard', icon: 'LayoutDashboard', label: t('admin_dashboard') || 'Dashboard' },
        { path: '/admin/photos', icon: 'Image', label: t('admin_photos') || 'Photos' },
        { path: '/admin/children', icon: 'Users', label: t('admin_children') || 'Children' },
        { path: '/admin/projects', icon: 'Briefcase', label: t('admin_projects') || 'Projects' },
        { path: '/admin/trips', icon: 'Plane', label: t('admin_trips') || 'Trips' },
        { path: '/admin/settings', icon: 'Settings', label: t('admin_settings') || 'Settings' },
    ];

    return (
        <div className="flex h-screen bg-admin-background font-sans">
            {/* Sidebar */}
            <aside
                className={clsx(
                    "bg-admin-sidebar text-white transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50 lg:relative",
                    isSidebarOpen ? "w-64" : "w-20"
                )}
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
                    {isSidebarOpen ? (
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
                            <Icon name="Shield" size={24} className="text-admin-active" />
                            <span>Admin</span>
                        </Link>
                    ) : (
                        <Link to="/" className="mx-auto">
                            <Icon name="Shield" size={24} className="text-admin-active" />
                        </Link>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-white/50 hover:text-white transition-colors lg:block hidden"
                    >
                        <Icon name={isSidebarOpen ? "ChevronLeft" : "ChevronRight"} size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={clsx(
                                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group relative",
                                    isActive
                                        ? "bg-admin-active text-white"
                                        : "text-white/70 hover:bg-admin-hover hover:text-white"
                                )}
                                title={!isSidebarOpen ? item.label : undefined}
                            >
                                <Icon name={item.icon} size={24} className={clsx(isActive ? "text-white" : "text-white/70 group-hover:text-white")} />
                                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                                {!isSidebarOpen && isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-white/10">
                    <div className={clsx("flex items-center gap-3", !isSidebarOpen && "justify-center")}>
                        <div className="w-10 h-10 rounded-full bg-admin-active flex items-center justify-center font-bold text-white shrink-0">
                            {user?.firstName?.charAt(0) || 'A'}
                        </div>
                        {isSidebarOpen && (
                            <div className="flex-1 min-w-0 overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">{user?.firstName || 'Admin'}</p>
                                <p className="text-xs text-white/50 truncate">{user?.email || 'admin@example.com'}</p>
                            </div>
                        )}
                        {isSidebarOpen && (
                            <button onClick={handleLogout} className="text-white/50 hover:text-admin-danger transition-colors">
                                <Icon name="LogOut" size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white shadow-sm h-16 flex items-center justify-between px-4 z-40">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-text">
                        <Icon name="Menu" size={24} />
                    </button>
                    <span className="font-bold text-lg">Admin Panel</span>
                    <div className="w-8" />
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;
