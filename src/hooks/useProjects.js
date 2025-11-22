import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';

export const useProjects = () => {
    const { data: projects, isLoading, error } = useQuery({
        queryKey: ['projects'],
        queryFn: () => apiClient.get('/api/projects'),
    });

    return {
        projects,
        isLoading,
        error,
    };
};
