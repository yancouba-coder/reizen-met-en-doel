import { apiClient } from '../api/client';
import { authService } from './authService';

export const sponsorshipService = {
    // Get all children with optional filtering
    getAllChildren: async (filters = {}) => {
        let url = '/api/children';
        const params = new URLSearchParams();

        if (filters.status) params.append('status', filters.status);
        if (filters.gender) params.append('gender', filters.gender);
        if (filters.ageRange) params.append('ageRange', filters.ageRange);

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        return await apiClient.get(url);
    },

    // Get single child by ID
    getChildById: async (id) => {
        return await apiClient.get(`/api/children/${id}`);
    },

    // Get children sponsored by the current user
    getMySponsoredChildren: async () => {
        const user = authService.getCurrentUser();
        if (!user || !user.sponsoredChildren || user.sponsoredChildren.length === 0) {
            return [];
        }

        // In a real API, we might have an endpoint like /api/users/me/sponsored-children
        // Here we'll fetch all children and filter by the IDs in the user object
        // Or we can fetch each child individually if the list is short

        // For efficiency in this mock, let's assume we can pass IDs or just filter client-side
        // Since apiClient.get('/api/children') returns all children, we can filter here
        const allChildren = await apiClient.get('/api/children');
        return allChildren.filter(child => user.sponsoredChildren.includes(child.id));
    },

    // Sponsor a child
    sponsorChild: async (childId) => {
        const user = authService.getCurrentUser();
        if (!user) throw new Error('User must be logged in to sponsor a child');

        // 1. Update user's sponsoredChildren list
        const currentSponsored = user.sponsoredChildren || [];
        if (currentSponsored.includes(childId)) {
            throw new Error('You are already sponsoring this child');
        }

        const updatedSponsored = [...currentSponsored, childId];
        await authService.updateUser(user.id, { sponsoredChildren: updatedSponsored });

        // 2. Send request to backend (mock) to update child status
        // In a real app, this would be a single transaction
        await apiClient.post('/api/sponsor-requests', {
            childId,
            userId: user.id,
            type: 'sponsorship'
        });

        return true;
    },

    // Get all projects
    getAllProjects: async () => {
        return await apiClient.get('/api/projects');
    },

    // Get single project
    getProjectById: async (id) => {
        return await apiClient.get(`/api/projects/${id}`);
    },

    // Get projects the user has participated in
    getMyProjects: async () => {
        const user = authService.getCurrentUser();
        if (!user || !user.participatedProjects || user.participatedProjects.length === 0) {
            return [];
        }

        const allProjects = await apiClient.get('/api/projects');
        return allProjects.filter(project => user.participatedProjects.includes(project.id));
    },

    // Donate to a project
    donateToProject: async (projectId, amount) => {
        const user = authService.getCurrentUser();
        if (!user) throw new Error('User must be logged in to donate');

        // 1. Update user's participatedProjects list if not already there
        const currentProjects = user.participatedProjects || [];
        if (!currentProjects.includes(projectId)) {
            const updatedProjects = [...currentProjects, projectId];
            await authService.updateUser(user.id, { participatedProjects: updatedProjects });
        }

        // 2. Send donation request
        await apiClient.post('/api/donations', {
            projectId,
            userId: user.id,
            amount,
            type: 'project_donation'
        });

        return true;
    }
};
