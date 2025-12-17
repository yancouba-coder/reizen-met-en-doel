import { getChildren, getProjects, addChild, updateChild, deleteChild } from './seeds';

// Simple in-memory mock for development without MSW complexity if preferred, 
// but we can also use this to patch the global fetch or just use it in our client.
// For this implementation, we will patch the global fetch in main.jsx for simplicity
// to ensure all app requests go through here.

export const setupMockServer = () => {
    const originalFetch = window.fetch;

    window.fetch = async (input, init) => {
        const url = typeof input === 'string' ? input : input.url;
        const method = init?.method || 'GET';

        // Simulate network delay
        await new Promise(r => setTimeout(r, 400));

        if (url.includes('/api/children')) {
            const children = getChildren();

            if (method === 'GET') {
                // Handle query params
                const urlObj = new URL(url, window.location.origin);
                const status = urlObj.searchParams.get('status');
                const id = url.split('/').pop();

                // Check if getting single child by ID (if ID is UUID-like)
                if (id && id.length > 20 && !url.endsWith('/children')) {
                    const child = children.find(c => c.id === id);
                    return new Response(JSON.stringify(child || {}), { status: child ? 200 : 404 });
                }

                let filtered = children;
                if (status) {
                    filtered = children.filter(c => c.status === status);
                }
                return new Response(JSON.stringify(filtered), { status: 200 });
            }

            if (method === 'POST') {
                const body = JSON.parse(init.body);
                const newChild = addChild(body);
                return new Response(JSON.stringify(newChild), { status: 201 });
            }

            if (method === 'PUT') {
                const id = url.split('/').pop();
                const body = JSON.parse(init.body);
                const updatedChild = updateChild(id, body);
                if (updatedChild) {
                    return new Response(JSON.stringify(updatedChild), { status: 200 });
                }
                return new Response(JSON.stringify({ error: 'Child not found' }), { status: 404 });
            }

            if (method === 'DELETE') {
                const id = url.split('/').pop();
                const success = deleteChild(id);
                if (success) {
                    return new Response(JSON.stringify({ success: true }), { status: 200 });
                }
                return new Response(JSON.stringify({ error: 'Child not found' }), { status: 404 });
            }
        }

        if (url.includes('/api/projects')) {
            const projects = getProjects();
            return new Response(JSON.stringify(projects), { status: 200 });
        }

        if (url.includes('/api/sponsor-requests') && method === 'POST') {
            console.log('Sponsor request received:', JSON.parse(init.body));
            return new Response(JSON.stringify({ success: true }), { status: 201 });
        }

        if (url.includes('/api/donations') && method === 'POST') {
            console.log('Donation received:', JSON.parse(init.body));
            return new Response(JSON.stringify({ success: true }), { status: 201 });
        }

        // Passthrough for other requests (like Vite assets)
        return originalFetch(input, init);
    };

    console.log('Mock server initialized');
};
