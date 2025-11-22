import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sponsorshipService } from '../../services/sponsorshipService';
import ChildCard from '../../components/molecules/ChildCard';
import Icon from '../../components/atoms/Icon';
import Button from '../../components/atoms/Button';

const MySponsoredChildren = () => {
    const { t } = useTranslation();
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const data = await sponsorshipService.getMySponsoredChildren();
                setChildren(data);
            } catch (error) {
                console.error('Failed to fetch sponsored children:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChildren();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (children.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 text-primary rounded-full mb-6">
                    <Icon name="Baby" size={40} />
                </div>
                <h2 className="text-2xl font-bold text-text mb-3">
                    {t('dashboard_no_children_title') || 'You haven\'t sponsored any children yet'}
                </h2>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                    {t('dashboard_no_children_desc') || 'Start your journey of making a difference today. Browse our waiting list to find a child who needs your support.'}
                </p>
                <Link to="/dashboard/browse-children">
                    <Button variant="primary" size="lg" className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                        {t('dashboard_browse_children') || 'Browse Waiting List'}
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text">
                    {t('nav_my_children') || 'My Sponsored Children'}
                </h2>
                <Link to="/dashboard/browse-children">
                    <Button variant="outline" size="sm">
                        {t('dashboard_sponsor_another') || 'Sponsor Another Child'}
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {children.map(child => (
                    <ChildCard key={child.id} child={child} />
                ))}
            </div>
        </div>
    );
};

export default MySponsoredChildren;
