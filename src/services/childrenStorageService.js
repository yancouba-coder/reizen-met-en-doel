import { faker } from '@faker-js/faker';

const CHILDREN_KEY = 'twap_children';

// Initialize with sample data
const initChildren = () => {
    const children = localStorage.getItem(CHILDREN_KEY);
    if (!children) {
        const sampleChildren = Array.from({ length: 8 }).map(() => ({
            id: faker.string.uuid(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            age: faker.number.int({ min: 5, max: 16 }),
            gender: faker.helpers.arrayElement(['male', 'female']),
            village: faker.location.city(),
            story: faker.lorem.paragraph(),
            sponsorCostMonthly: faker.number.int({ min: 20, max: 50 }),
            status: faker.helpers.arrayElement(['waiting', 'sponsored', 'urgent']),
            imageUrl: faker.image.urlLoremFlickr({ category: 'people' }),
            createdAt: faker.date.past().toISOString()
        }));
        localStorage.setItem(CHILDREN_KEY, JSON.stringify(sampleChildren));
        return sampleChildren;
    }
    return JSON.parse(children);
};

export const childrenStorageService = {
    getAll: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return initChildren();
    },

    getById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        const children = initChildren();
        return children.find(c => c.id === id);
    },

    create: async (childData) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const children = initChildren();
        const newChild = {
            id: faker.string.uuid(),
            ...childData,
            imageUrl: faker.image.urlLoremFlickr({ category: 'people' }),
            createdAt: new Date().toISOString()
        };
        children.push(newChild);
        localStorage.setItem(CHILDREN_KEY, JSON.stringify(children));
        return newChild;
    },

    update: async (id, updates) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const children = initChildren();
        const index = children.findIndex(c => c.id === id);
        if (index !== -1) {
            children[index] = { ...children[index], ...updates };
            localStorage.setItem(CHILDREN_KEY, JSON.stringify(children));
            return children[index];
        }
        throw new Error('Child not found');
    },

    delete: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const children = initChildren();
        const filtered = children.filter(c => c.id !== id);
        localStorage.setItem(CHILDREN_KEY, JSON.stringify(filtered));
        return true;
    }
};
