import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { childrenStorageService } from '../services/childrenStorageService';

export const useChildren = (filters = {}) => {
    const queryClient = useQueryClient();
    const { status } = filters;

    const queryKey = ['children', status].filter(Boolean);

    const { data: children, isLoading, error } = useQuery({
        queryKey,
        queryFn: async () => {
            const allChildren = await childrenStorageService.getAll();
            if (status) {
                return allChildren.filter(c => c.status === status);
            }
            return allChildren;
        },
    });

    const addChildMutation = useMutation({
        mutationFn: (newChild) => childrenStorageService.create(newChild),
        onSuccess: () => {
            queryClient.invalidateQueries(['children']);
        },
    });

    const updateChildMutation = useMutation({
        mutationFn: ({ id, ...data }) => childrenStorageService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['children']);
        },
    });

    const deleteChildMutation = useMutation({
        mutationFn: (id) => childrenStorageService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['children']);
        },
    });

    return {
        children,
        isLoading,
        error,
        addChild: addChildMutation.mutateAsync,
        updateChild: updateChildMutation.mutateAsync,
        deleteChild: deleteChildMutation.mutateAsync,
        isAdding: addChildMutation.isLoading,
        isUpdating: updateChildMutation.isLoading,
        isDeleting: deleteChildMutation.isLoading,
    };
};

export const useChild = (id) => {
    return useQuery({
        queryKey: ['child', id],
        queryFn: () => childrenStorageService.getById(id),
        enabled: !!id,
    });
};
