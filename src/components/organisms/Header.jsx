import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import LanguageSwitcher from '../molecules/LanguageSwitcher';

/**
 * Modern Header Component with glassmorphism and fluid animations
 */
const Header = () => {
    const { t } = useTranslation();
    const { user, logout, isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { to: '/', label: t('nav_home'), icon: 'Home' },
        { to: '/about', label: t('nav_who_we_are'), icon: 'Users' },
        { to: '/projects', label: t('nav_projects'), icon: 'Briefcase' },
        { to: '/sponsorships/waiting', label: t('nav_become_sponsor'), icon: 'Heart' },
        { to: '/contact', label: t('nav_contact'), icon: 'Mail' },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled
                    ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-primary/5 py-3"
                    : "bg-white/60 backdrop-blur-md py-5"
            )}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Modern Logo */}
                    <Link to="/" className="flex items-center gap-3 group relative">
                        <motion.div
                            whileHover={{ rotate: 5, scale: 1.05 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
                            <div className="relative bg-gradient-to-br from-primary to-accent p-2.5 rounded-xl shadow-lg">
                                <Icon name="HeartHandshake" size={28} className="text-white" />
                            </div>
                        </motion.div>
                        <div className="flex flex-col leading-tight">
                            <span className="font-serif font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Reizen
                            </span>
                            <span className="font-serif font-bold text-lg text-primary/70">
                                met een doel
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav - Modern Pills */}
                    <nav className="hidden xl:flex items-center gap-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => {
                                    const isChildRoute = window.location.pathname.startsWith(item.to) && item.to !== '/';
                                    const shouldHighlight = isActive || isChildRoute;

                                    return clsx(
                                        'relative px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 group',
                                        shouldHighlight
                                            ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                                            : 'text-text hover:bg-primary/5 hover:text-primary'
                                    );
                                }}
                            >
                                {({ isActive }) => {
                                    const isChildRoute = window.location.pathname.startsWith(item.to) && item.to !== '/';
                                    const shouldHighlight = isActive || isChildRoute;

                                    return (
                                        <>
                                            <Icon
                                                name={item.icon}
                                                size={16}
                                                className={clsx(
                                                    "transition-transform duration-300",
                                                    shouldHighlight ? "scale-110" : "group-hover:scale-110"
                                                )}
                                            />
                                            <span>{item.label}</span>
                                        </>
                                    );
                                }}
                            </NavLink>
                        ))}

                        <div className="h-8 w-px bg-primary/10 mx-2"></div>

                        <div className="bg-white/50 backdrop-blur-sm rounded-full px-3 py-2 border border-primary/10">
                            <LanguageSwitcher />
                        </div>

                        {isAuthenticated ? (
                            <div className="relative ml-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 pl-3 pr-2 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 transition-all border border-primary/20"
                                >
                                    <span className="text-sm font-medium text-primary">{user?.firstName}</span>
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-md">
                                        {user?.firstName?.charAt(0) || 'U'}
                                    </div>
                                    <Icon name="ChevronDown" size={16} className={clsx(
                                        "text-primary transition-transform duration-300",
                                        isUserMenuOpen && "rotate-180"
                                    )} />
                                </motion.button>

                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-primary/10 py-2 overflow-hidden"
                                        >
                                            <div className="px-4 py-3 border-b border-primary/5 bg-gradient-to-r from-primary/5 to-accent/5">
                                                <p className="text-sm font-bold text-primary">{user?.firstName} {user?.lastName}</p>
                                                <p className="text-xs text-text-muted truncate">{user?.email}</p>
                                            </div>
                                            <Link
                                                to="/dashboard"
                                                className="flex items-center gap-3 px-4 py-3 text-sm text-text hover:bg-primary/5 hover:text-primary transition-all"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <Icon name="LayoutDashboard" size={18} />
                                                <span>{t('nav_dashboard') || 'Dashboard'}</span>
                                            </Link>
                                            <Link
                                                to="/dashboard/profile"
                                                className="flex items-center gap-3 px-4 py-3 text-sm text-text hover:bg-primary/5 hover:text-primary transition-all"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <Icon name="User" size={18} />
                                                <span>{t('nav_profile') || 'Profile'}</span>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsUserMenuOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-all mt-1 border-t border-primary/5"
                                            >
                                                <Icon name="LogOut" size={18} />
                                                <span>{t('nav_logout') || 'Logout'}</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 ml-2">
                                <Link to="/login">
                                    <Button variant="ghost" size="sm" className="rounded-full">
                                        {t('nav_login') || 'Log In'}
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" size="sm" className="rounded-full shadow-lg">
                                        {t('nav_register') || 'Join Us'}
                                    </Button>
                                </Link>
                            </div>
                        )}

                        <Link to="/donate" className="ml-2">
                            <Button variant="primary" size="md" className="rounded-full shadow-lg bg-gradient-to-r from-accent to-accent-dark border-none hover:shadow-xl">
                                <Icon name="Heart" size={18} className="mr-2" />
                                {t('donate')}
                            </Button>
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="xl:hidden p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} className="text-primary" />
                    </motion.button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="xl:hidden bg-white/95 backdrop-blur-xl border-t border-primary/10 shadow-xl overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-6 space-y-2">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.to}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <NavLink
                                        to={item.to}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) => {
                                            const isChildRoute = window.location.pathname.startsWith(item.to) && item.to !== '/';
                                            const shouldHighlight = isActive || isChildRoute;

                                            return clsx(
                                                'flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all',
                                                shouldHighlight
                                                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md'
                                                    : 'text-text hover:bg-primary/5 hover:text-primary'
                                            );
                                        }}
                                    >
                                        <Icon name={item.icon} size={20} />
                                        <span>{item.label}</span>
                                    </NavLink>
                                </motion.div>
                            ))}

                            <div className="flex items-center justify-between py-3 px-4 bg-primary/5 rounded-xl mt-4">
                                <span className="text-text font-medium text-sm">Language</span>
                                <LanguageSwitcher />
                            </div>

                            {isAuthenticated ? (
                                <div className="pt-4 border-t border-primary/10 space-y-2">
                                    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-md">
                                            {user?.firstName?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-primary">{user?.firstName} {user?.lastName}</p>
                                            <p className="text-xs text-text-muted">{user?.email}</p>
                                        </div>
                                    </div>
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center gap-3 px-4 py-3 text-text hover:bg-primary/5 hover:text-primary rounded-xl transition-all"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <Icon name="LayoutDashboard" size={20} />
                                        <span>{t('nav_dashboard') || 'Dashboard'}</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <Icon name="LogOut" size={20} />
                                        <span>{t('nav_logout') || 'Logout'}</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 mt-6">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="outline" className="w-full justify-center rounded-xl">
                                            {t('nav_login') || 'Log In'}
                                        </Button>
                                    </Link>
                                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="primary" className="w-full justify-center rounded-xl">
                                            {t('nav_register') || 'Sign Up'}
                                        </Button>
                                    </Link>
                                </div>
                            )}

                            <Link to="/donate" onClick={() => setIsMenuOpen(false)} className="block mt-4">
                                <Button variant="primary" size="md" className="w-full rounded-xl shadow-lg bg-gradient-to-r from-accent to-accent-dark border-none">
                                    <Icon name="Heart" size={20} className="mr-2" />
                                    {t('donate')}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
