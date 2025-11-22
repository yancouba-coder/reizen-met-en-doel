import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';

const AdminLayout = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('admin_auth');
        navigate('/admin');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-text">
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl text-accent">
                        <Icon name="Shield" size={24} />
                        <span>Admin Portal</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-sm font-medium text-gray-600 hover:text-accent">
                            View Site
                        </Link>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            {t('logout')}
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
