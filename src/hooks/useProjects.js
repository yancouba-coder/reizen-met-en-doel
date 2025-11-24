import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsStorageService } from '../services/projectsStorageService';

export const useProjects = () => {
    const queryClient = useQueryClient();

    const { data: projects, isLoading, error } = useQuery({
        queryKey: ['projects'],
        queryFn: () => projectsStorageService.getAll(),
    });

    const addProjectMutation = useMutation({
        mutationFn: (newProject) => projectsStorageService.create(newProject),
        onSuccess: () => {
            queryClient.invalidateQueries(['projects']);
        },
    });

    const updateProjectMutation = useMutation({
        mutationFn: ({ id, ...data }) => projectsStorageService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['projects']);
        },
    });

    const deleteProjectMutation = useMutation({
        mutationFn: (id) => projectsStorageService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['projects']);
        },
    });

    return {
        projects,
        isLoading,
        error,
        addProject: addProjectMutation.mutateAsync,
        updateProject: updateProjectMutation.mutateAsync,
        deleteProject: deleteProjectMutation.mutateAsync,
        isAdding: addProjectMutation.isLoading,
        isUpdating: updateProjectMutation.isLoading,
        isDeleting: deleteProjectMutation.isLoading,
    };
};
