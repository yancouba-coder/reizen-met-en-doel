import { MOCK_CHILDREN, MOCK_PROJECTS } from '../mocks/mockData';

const SIMULATED_DELAY = 500; // ms

export const apiClient = {
    get: async (url) => {
        await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));

        // Mock API logic for children
        if (url.startsWith('/api/children')) {
            const urlObj = new URL(url, 'http://localhost');
            const status = urlObj.searchParams.get('status');
            const id = url.split('/').pop();

            // Get single child
            if (id && id !== 'children' && !url.includes('?')) {
                const child = MOCK_CHILDREN.find(c => c.id === id);
                if (!child) throw new Error('Child not found');
                return child;
            }

            // Get list
            if (status) {
                return MOCK_CHILDREN.filter(c => c.status === status);
            }
            return MOCK_CHILDREN;
        }

        // Mock API logic for projects
        if (url.startsWith('/api/projects')) {
            const id = url.split('/').pop();

            // Get single project
            if (id && id !== 'projects' && !url.includes('?')) {
                const project = MOCK_PROJECTS.find(p => p.id === id);
                if (!project) throw new Error('Project not found');
                return project;
            }

            // Get list
            return MOCK_PROJECTS;
        }

        return fetch(url).then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        });
    },
    post: async (url, body) => {
        await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));

        if (url === '/api/sponsor-requests') {
            return { success: true, message: 'Sponsorship request received' };
        }

        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        });
    }
};
