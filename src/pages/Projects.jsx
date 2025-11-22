import React from 'react';
import { useTranslation } from 'react-i18next';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/molecules/ProjectCard';

const Projects = () => {
    const { t } = useTranslation();
    const { projects, isLoading } = useProjects();

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-text mb-8">{t('projects')}</h1>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects?.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Projects;
