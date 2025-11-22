import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';

export const useChildren = (filters = {}) => {
    const queryClient = useQueryClient();
    const { status } = filters;

    const queryKey = ['children', status].filter(Boolean);
    const url = status ? `/api/children?status=${status}` : '/api/children';

    const { data: children, isLoading, error } = useQuery({
        queryKey,
        queryFn: () => apiClient.get(url),
    });

    const addChildMutation = useMutation({
        mutationFn: (newChild) => apiClient.post('/api/children', newChild),
        onSuccess: () => {
            queryClient.invalidateQueries(['children']);
        },
    });

    return {
        children,
        isLoading,
        error,
        addChild: addChildMutation.mutate,
        isAdding: addChildMutation.isLoading,
    };
};

export const useChild = (id) => {
    return useQuery({
        queryKey: ['child', id],
        queryFn: () => apiClient.get(`/api/children/${id}`),
        enabled: !!id,
    });
};
