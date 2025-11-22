import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';

export const useProject = (id) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['project', id],
        queryFn: () => apiClient.get(`/api/projects/${id}`),
        enabled: !!id,
    });

    return {
        data,
        isLoading,
        error,
    };
};
