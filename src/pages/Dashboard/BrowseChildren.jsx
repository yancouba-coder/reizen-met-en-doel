import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { sponsorshipService } from '../../services/sponsorshipService';
import ChildCard from '../../components/molecules/ChildCard';
import Icon from '../../components/atoms/Icon';
import Input from '../../components/atoms/Input';

const BrowseChildren = () => {
    const { t } = useTranslation();
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, urgent, waiting

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const data = await sponsorshipService.getAllChildren();
                setChildren(data);
            } catch (error) {
                console.error('Failed to fetch children:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChildren();
    }, []);

    const filteredChildren = children.filter(child => {
        const matchesSearch = child.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            child.village.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' ||
            (filter === 'urgent' && child.priority === 'urgent') ||
            (filter === 'waiting' && child.status === 'waiting');
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-text">
                        {t('dashboard_browse_children') || 'Browse Waiting List'}
                    </h2>
                    <p className="text-gray-500">
                        {t('dashboard_browse_subtitle') || 'Find a child to sponsor and change a life forever.'}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder={t('search_placeholder') || "Search by name or village..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:w-64"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                    >
                        <option value="all">{t('filter_all') || 'All Children'}</option>
                        <option value="urgent">{t('filter_urgent') || 'Urgent Needs'}</option>
                        <option value="waiting">{t('filter_waiting') || 'Waiting List'}</option>
                    </select>
                </div>
            </div>

            {filteredChildren.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <p className="text-gray-500">{t('no_results') || 'No children found matching your criteria.'}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredChildren.map(child => (
                        <ChildCard key={child.id} child={child} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BrowseChildren;
