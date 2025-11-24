import { faker } from '@faker-js/faker';

const PROJECTS_KEY = 'twap_projects';

// Initialize with sample data
const initProjects = () => {
    const projects = localStorage.getItem(PROJECTS_KEY);
    if (!projects) {
        const sampleProjects = Array.from({ length: 6 }).map(() => ({
            id: faker.string.uuid(),
            title: faker.company.catchPhrase(),
            description: faker.lorem.paragraphs(2),
            targetAmount: faker.number.int({ min: 5000, max: 50000 }),
            currentAmount: faker.number.int({ min: 0, max: 30000 }),
            location: faker.location.city(),
            status: faker.helpers.arrayElement(['active', 'completed', 'planned']),
            imageUrl: faker.image.urlLoremFlickr({ category: 'nature' }),
            createdAt: faker.date.past().toISOString()
        }));
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(sampleProjects));
        return sampleProjects;
    }
    return JSON.parse(projects);
};

export const projectsStorageService = {
    getAll: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return initProjects();
    },

    getById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        const projects = initProjects();
        return projects.find(p => p.id === id);
    },

    create: async (projectData) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const projects = initProjects();
        const newProject = {
            id: faker.string.uuid(),
            ...projectData,
            imageUrl: faker.image.urlLoremFlickr({ category: 'nature' }),
            createdAt: new Date().toISOString()
        };
        projects.push(newProject);
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
        return newProject;
    },

    update: async (id, updates) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const projects = initProjects();
        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
            projects[index] = { ...projects[index], ...updates };
            localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
            return projects[index];
        }
        throw new Error('Project not found');
    },

    delete: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const projects = initProjects();
        const filtered = projects.filter(p => p.id !== id);
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(filtered));
        return true;
    }
};
