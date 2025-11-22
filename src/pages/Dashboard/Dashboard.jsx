import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Icon from '../../components/atoms/Icon';

const Dashboard = () => {
    const { t } = useTranslation();
    const { user } = useAuth();

    const stats = [
        {
            label: t('dashboard_sponsored_children') || 'Sponsored Children',
            value: user?.sponsoredChildren?.length || 0,
            icon: 'Users',
            color: 'bg-blue-500'
        },
        {
            label: t('dashboard_projects') || 'Projects Supported',
            value: user?.participatedProjects?.length || 0,
            icon: 'HeartHandshake',
            color: 'bg-primary'
        },
        {
            label: t('dashboard_total_donated') || 'Total Donated',
            value: '€0',
            icon: 'Wallet',
            color: 'bg-green-500'
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-text to-text/90 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">
                        {t('dashboard_welcome') || 'Welcome back'}, {user?.firstName}! 👋
                    </h2>
                    <p className="text-white/80 max-w-2xl">
                        {t('dashboard_welcome_subtitle') || 'Thank you for being part of our community. Your support is changing lives in Senegal every single day.'}
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-text">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.color} text-white shadow-lg shadow-${stat.color}/30`}>
                                <Icon name={stat.icon} size={24} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sponsor a Child CTA */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary/10 text-primary rounded-full">
                            <Icon name="Baby" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-text">
                            {t('dashboard_sponsor_child_title') || 'Sponsor a Child'}
                        </h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                        {t('dashboard_sponsor_child_desc') || 'There are many children waiting for a sponsor. Your support provides education, healthcare, and hope.'}
                    </p>
                    <Link to="/dashboard/browse-children">
                        <button className="w-full py-3 px-4 bg-white border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all">
                            {t('dashboard_browse_children') || 'Browse Waiting List'}
                        </button>
                    </Link>
                </div>

                {/* Support Project CTA */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-accent/10 text-accent rounded-full">
                            <Icon name="Sprout" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-text">
                            {t('dashboard_support_project_title') || 'Support a Project'}
                        </h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                        {t('dashboard_support_project_desc') || 'Help us build wells, schools, and support communities through sustainable projects.'}
                    </p>
                    <Link to="/dashboard/browse-projects">
                        <button className="w-full py-3 px-4 bg-white border-2 border-accent text-accent font-bold rounded-lg hover:bg-accent hover:text-white transition-all">
                            {t('dashboard_browse_projects') || 'View Projects'}
                        </button>
                    </Link>
                </div>
            </div>

            {/* Recent Activity (Placeholder) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-text">
                        {t('dashboard_recent_activity') || 'Recent Activity'}
                    </h3>
                </div>
                <div className="p-8 text-center text-gray-500">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <Icon name="Activity" size={32} className="text-gray-400" />
                    </div>
                    <p>{t('dashboard_no_activity') || 'No recent activity to show.'}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
