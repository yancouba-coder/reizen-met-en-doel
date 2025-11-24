import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tripsStorageService } from '../services/tripsStorageService';

export const useTrips = () => {
    const queryClient = useQueryClient();

    const { data: trips, isLoading, error } = useQuery({
        queryKey: ['trips'],
        queryFn: () => tripsStorageService.getAll(),
    });

    const addTripMutation = useMutation({
        mutationFn: (newTrip) => tripsStorageService.create(newTrip),
        onSuccess: () => {
            queryClient.invalidateQueries(['trips']);
        },
    });

    const updateTripMutation = useMutation({
        mutationFn: ({ id, ...data }) => tripsStorageService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['trips']);
        },
    });

    const deleteTripMutation = useMutation({
        mutationFn: (id) => tripsStorageService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['trips']);
        },
    });

    return {
        trips,
        isLoading,
        error,
        addTrip: addTripMutation.mutateAsync,
        updateTrip: updateTripMutation.mutateAsync,
        deleteTrip: deleteTripMutation.mutateAsync,
        isAdding: addTripMutation.isLoading,
        isUpdating: updateTripMutation.isLoading,
        isDeleting: deleteTripMutation.isLoading,
    };
};
