import { faker } from '@faker-js/faker';

const STORAGE_KEY = 'app_data_v2'; // Changed version to force refresh

// Using placeholder.com which is extremely reliable
const getImageUrl = (width = 800, height = 600, text = 'Photo') => {
    return `https://via.placeholder.com/${width}x${height}/264653/E76F51?text=${encodeURIComponent(text)}`;
};

export const initializeData = (forceReset = false) => {
    const existing = localStorage.getItem(STORAGE_KEY);

    if (!forceReset && existing) {
        try {
            const parsed = JSON.parse(existing);
            if (parsed && parsed.children && Array.isArray(parsed.children) && parsed.children.length > 0) {
                if (parsed.children[0].photos && parsed.children[0].photos[0]) {
                    console.log('Using existing data');
                    return parsed;
                }
            }
        } catch (e) {
            console.error("Data corrupted, re-initializing...");
        }
    }

    console.log("Seeding fresh data with reliable placeholder images...");

    const children = Array.from({ length: 25 }).map((_, index) => {
        const sex = faker.person.sexType();
        const firstName = faker.person.firstName(sex);
        const lastName = faker.person.lastName();
        const id = faker.string.uuid();

        return {
            id,
            firstName,
            lastName,
            age: faker.number.int({ min: 4, max: 16 }),
            gender: sex,
            village: faker.location.city(),
            story: faker.lorem.paragraphs(3),
            shortStory: faker.lorem.sentence(),
            needs: faker.helpers.arrayElements(['health', 'school', 'nutrition', 'clothing'], { min: 1, max: 3 }),
            status: faker.helpers.arrayElement(['waiting', 'sponsored']),
            priority: faker.helpers.arrayElement(['normal', 'urgent']),
            photos: [getImageUrl(800, 600, `Child ${index + 1}`)],
            sponsorCostMonthly: faker.number.int({ min: 20, max: 50 }),
        };
    });

    const projects = Array.from({ length: 5 }).map((_, index) => {
        const id = faker.string.uuid();
        const title = faker.commerce.productName();
        return {
            id,
            title,
            description: faker.lorem.paragraph(),
            image: getImageUrl(800, 600, `Project ${index + 1}`),
            targetAmount: faker.number.int({ min: 1000, max: 10000 }),
            raisedAmount: faker.number.int({ min: 0, max: 5000 }),
        };
    });

    const data = { children, projects };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('Data seeded successfully with', children.length, 'children and', projects.length, 'projects');
    return data;
};

export const getChildren = () => {
    const data = initializeData();
    return data.children;
};

export const getProjects = () => {
    const data = initializeData();
    return data.projects;
};

export const addChild = (child) => {
    const data = initializeData();
    const newChild = { ...child, id: faker.string.uuid() };
    if (!newChild.photos || newChild.photos.length === 0) {
        newChild.photos = [getImageUrl(800, 600, newChild.firstName || 'Child')];
    }
    data.children.push(newChild);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return newChild;
};

export const updateChild = (id, updates) => {
    const data = initializeData();
    const index = data.children.findIndex(c => c.id === id);
    if (index !== -1) {
        data.children[index] = { ...data.children[index], ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return data.children[index];
    }
    return null;
};

export const deleteChild = (id) => {
    const data = initializeData();
    const filtered = data.children.filter(c => c.id !== id);
    if (filtered.length !== data.children.length) {
        data.children = filtered;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    }
    return false;
};
