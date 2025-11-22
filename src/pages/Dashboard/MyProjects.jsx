import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sponsorshipService } from '../../services/sponsorshipService';
import ProjectCard from '../../components/molecules/ProjectCard';
import Icon from '../../components/atoms/Icon';
import Button from '../../components/atoms/Button';

const MyProjects = () => {
    const { t } = useTranslation();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await sponsorshipService.getMyProjects();
                setProjects(data);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 text-accent rounded-full mb-6">
                    <Icon name="Sprout" size={40} />
                </div>
                <h2 className="text-2xl font-bold text-text mb-3">
                    {t('dashboard_no_projects_title') || 'You haven\'t supported any projects yet'}
                </h2>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                    {t('dashboard_no_projects_desc') || 'Help us build a better future. Explore our sustainable projects and make a lasting impact.'}
                </p>
                <Link to="/dashboard/browse-projects">
                    <Button variant="secondary" size="lg" className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                        {t('dashboard_browse_projects') || 'View Projects'}
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text">
                    {t('nav_my_projects') || 'My Projects'}
                </h2>
                <Link to="/dashboard/browse-projects">
                    <Button variant="outline" size="sm">
                        {t('dashboard_support_another') || 'Support Another Project'}
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default MyProjects;
