import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import StatsCard from './components/StatsCard';
import Icon from '../../components/atoms/Icon';
import Button from '../../components/atoms/Button';
import { childrenStorageService } from '../../services/childrenStorageService';
import { projectsStorageService } from '../../services/projectsStorageService';
import { tripsStorageService } from '../../services/tripsStorageService';

const AdminDashboard = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState([
        { title: 'Total Children', value: '0', icon: 'Users', trend: 0, color: 'primary' },
        { title: 'Total Projects', value: '0', icon: 'Briefcase', trend: 0, color: 'success' },
        { title: 'Total Trips', value: '0', icon: 'Plane', trend: 0, color: 'info' },
        { title: 'Total Donations', value: '€0', icon: 'Heart', trend: 0, color: 'danger' },
    ]);
    const [projectStatusData, setProjectStatusData] = useState([]);
    const [sponsorshipData, setSponsorshipData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [children, projects, trips] = await Promise.all([
                    childrenStorageService.getAll(),
                    projectsStorageService.getAll(),
                    tripsStorageService.getAll()
                ]);

                // Calculate Stats
                const totalChildren = children.length;
                const totalProjects = projects.length;
                const totalTrips = trips.length;
                // Mocking donation total since we don't have a backend for it yet
                const totalDonations = 12450;

                setStats([
                    { title: 'Total Children', value: totalChildren.toString(), icon: 'Users', trend: 12, color: 'primary' },
                    { title: 'Total Projects', value: totalProjects.toString(), icon: 'Briefcase', trend: 5, color: 'success' },
                    { title: 'Total Trips', value: totalTrips.toString(), icon: 'Plane', trend: 0, color: 'info' },
                    { title: 'Total Donations', value: `€${totalDonations.toLocaleString()}`, icon: 'Heart', trend: 8, color: 'danger' },
                ]);

                // Calculate Project Status
                const completed = projects.filter(p => p.status === 'completed').length;
                const inProgress = projects.filter(p => p.status === 'in_progress').length;
                const planned = projects.filter(p => p.status === 'planned').length;

                setProjectStatusData([
                    { name: 'Completed', value: completed, color: '#10B981' },
                    { name: 'In Progress', value: inProgress, color: '#3B82F6' },
                    { name: 'Planned', value: planned, color: '#F59E0B' },
                ]);

                // Mock Sponsorship Data
                setSponsorshipData([
                    { name: 'Jan', active: 10, waiting: 5 },
                    { name: 'Feb', active: 12, waiting: 8 },
                    { name: 'Mar', active: 15, waiting: 6 },
                    { name: 'Apr', active: 18, waiting: 4 },
                    { name: 'May', active: 20, waiting: 5 },
                    { name: 'Jun', active: 24, waiting: 3 },
                ]);

            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const recentActivities = [
        { id: 1, user: 'Admin', action: 'Added new child', target: 'Fatou Diop', time: '2 hours ago', icon: 'UserPlus', color: 'bg-blue-100 text-blue-600' },
        { id: 2, user: 'System', action: 'New donation received', target: '€50 for Water Well', time: '4 hours ago', icon: 'DollarSign', color: 'bg-green-100 text-green-600' },
        { id: 3, user: 'Admin', action: 'Updated project status', target: 'School Building', time: '1 day ago', icon: 'Edit', color: 'bg-yellow-100 text-yellow-600' },
        { id: 4, user: 'Admin', action: 'Uploaded photos', target: 'Trip to Senegal', time: '2 days ago', icon: 'Image', color: 'bg-purple-100 text-purple-600' },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t('admin_dashboard') || 'Dashboard'}</h1>
                    <p className="text-gray-500">Overview of your organization's impact</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                        <Icon name="Download" size={16} className="mr-2" />
                        Export Report
                    </Button>
                    <Button variant="primary" size="sm">
                        <Icon name="Plus" size={16} className="mr-2" />
                        New Entry
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sponsorship Growth */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Sponsorship Growth</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={sponsorshipData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Line type="monotone" dataKey="active" stroke="#E88D30" strokeWidth={3} dot={{ r: 4, fill: '#E88D30', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} name="Active Sponsors" />
                                <Line type="monotone" dataKey="waiting" stroke="#9CA3AF" strokeWidth={3} dot={{ r: 4, fill: '#9CA3AF', strokeWidth: 2, stroke: '#fff' }} name="Waiting List" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Project Status */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Project Status</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={projectStatusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {projectStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3 mt-4">
                        {projectStatusData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-sm text-gray-600">{item.name}</span>
                                </div>
                                <span className="text-sm font-medium text-gray-800">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Activities</h3>
                <div className="space-y-6">
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.color}`}>
                                <Icon name={activity.icon} size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">
                                    <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-bold">"{activity.target}"</span>
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                                <Icon name="MoreHorizontal" size={16} />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
