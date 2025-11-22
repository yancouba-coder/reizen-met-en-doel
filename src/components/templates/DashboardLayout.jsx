import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { clsx } from 'clsx';
import Icon from '../atoms/Icon';
import LanguageSwitcher from '../molecules/LanguageSwitcher';

/**
 * Composant DashboardLayout - Layout pour l'espace utilisateur authentifié
 * 
 * Layout avec sidebar de navigation pour le dashboard utilisateur.
 * Fonctionnalités:
 * - Sidebar fixe avec navigation (desktop)
 * - Sidebar coulissante avec overlay (mobile)
 * - Highlight automatique de la route active
 * - Informations utilisateur et bouton de déconnexion
 * - Top bar avec titre dynamique et sélecteur de langue
 * - Responsive (sidebar cachée sur mobile, header hamburger)
 * 
 * Utilise le Context d'authentification pour afficher les infos utilisateur.
 * 
 * @component
 * @example
 * // Dans le routing
 * <Route element={<DashboardLayout />}>
 *   <Route path="/dashboard" element={<Dashboard />} />
 *   <Route path="/dashboard/profile" element={<Profile />} />
 * </Route>
 * 
 * @returns {JSX.Element} Layout dashboard avec sidebar et contenu
 */
const DashboardLayout = () => {
    const { t } = useTranslation();
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigation = [
        { name: t('nav_dashboard') || 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
        { name: t('nav_my_children') || 'My Sponsored Children', href: '/dashboard/my-children', icon: 'Users' },
        { name: t('nav_my_projects') || 'My Projects', href: '/dashboard/my-projects', icon: 'HeartHandshake' },
        { name: t('nav_browse_children') || 'Browse Children', href: '/dashboard/browse-children', icon: 'Search' },
        { name: t('nav_browse_projects') || 'Browse Projects', href: '/dashboard/browse-projects', icon: 'Globe' },
        { name: t('nav_profile') || 'My Profile', href: '/dashboard/profile', icon: 'User' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed inset-y-0 z-30">
                <div className="flex items-center gap-2 px-6 h-20 border-b border-gray-100">
                    <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
                        <Icon name="HeartHandshake" size={24} />
                        <span className="font-bold text-xl text-text">TWAP</span>
                    </Link>
                </div>

                <div className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-primary text-text-inverse shadow-md shadow-primary/20"
                                        : "text-gray-600 hover:bg-secondary hover:text-text"
                                )}
                            >
                                <Icon name={item.icon} size={20} />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-accent text-text-inverse flex items-center justify-center font-bold">
                            {user?.firstName?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-text truncate">{user?.firstName} {user?.lastName}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Icon name="LogOut" size={20} />
                        {t('nav_logout') || 'Logout'}
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-4">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-text">
                    <Icon name="Menu" size={24} />
                </button>
                <Link to="/" className="flex items-center gap-2 text-primary">
                    <Icon name="HeartHandshake" size={28} />
                </Link>
                <div className="w-8" /> {/* Spacer */}
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={clsx(
                "fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 lg:hidden shadow-2xl",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
                    <span className="font-bold text-xl text-text">Menu</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500">
                        <Icon name="X" size={24} />
                    </button>
                </div>
                <div className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                location.pathname === item.href
                                    ? "bg-primary text-text-inverse shadow-md"
                                    : "text-gray-600 hover:bg-secondary"
                            )}
                        >
                            <Icon name={item.icon} size={20} />
                            {item.name}
                        </Link>
                    ))}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg"
                        >
                            <Icon name="LogOut" size={20} />
                            {t('nav_logout') || 'Logout'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
                <div className="p-4 lg:p-8 max-w-7xl mx-auto">
                    {/* Top Bar (Desktop) */}
                    <div className="hidden lg:flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold text-text">
                            {navigation.find(n => n.href === location.pathname)?.name || 'Dashboard'}
                        </h1>
                        <div className="flex items-center gap-4">
                            <LanguageSwitcher />
                            <Link to="/">
                                <button className="text-sm font-medium text-primary hover:underline">
                                    {t('nav_back_to_site') || 'Back to Website'}
                                </button>
                            </Link>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
