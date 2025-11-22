import { faker } from '@faker-js/faker';

const STORAGE_KEY = 'app_data_v1';

export const initializeData = () => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return JSON.parse(existing);

    const children = Array.from({ length: 25 }).map(() => {
        const sex = faker.person.sexType();
        const firstName = faker.person.firstName(sex);
        const lastName = faker.person.lastName();

        return {
            id: faker.string.uuid(),
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
            photos: [faker.image.urlLoremFlickr({ category: 'people' })], // Using LoremFlickr for more reliable people images
            sponsorCostMonthly: faker.number.int({ min: 20, max: 50 }),
        };
    });

    const projects = Array.from({ length: 5 }).map(() => ({
        id: faker.string.uuid(),
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        image: faker.image.urlLoremFlickr({ category: 'nature' }),
        targetAmount: faker.number.int({ min: 1000, max: 10000 }),
        raisedAmount: faker.number.int({ min: 0, max: 5000 }),
    }));

    const data = { children, projects };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
