import { faker } from '@faker-js/faker';

const KEYS = {
    CHILDREN: 'twap_children',
    PROJECTS: 'twap_projects',
    TRIPS: 'twap_trips',
    USERS: 'twap_users',
    CURRENT_USER: 'twap_current_user'
};

const hasData = (key) => {
    const data = localStorage.getItem(key);
    if (!data) return false;
    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) && parsed.length > 0;
    } catch (e) {
        return false;
    }
};

export const initData = () => {
    console.log('Initializing application data...');

    // Seed Children
    if (!hasData(KEYS.CHILDREN)) {
        console.log('Seeding children...');
        const children = Array.from({ length: 12 }).map(() => ({
            id: faker.string.uuid(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            age: faker.number.int({ min: 4, max: 16 }),
            gender: faker.helpers.arrayElement(['male', 'female']),
            village: faker.location.city(),
            story: faker.lorem.paragraphs(2),
            sponsorCostMonthly: faker.number.int({ min: 20, max: 50 }),
            status: faker.helpers.arrayElement(['waiting', 'sponsored', 'urgent']),
            imageUrl: faker.image.url({ width: 640, height: 480 }),
            createdAt: faker.date.past().toISOString()
        }));
        localStorage.setItem(KEYS.CHILDREN, JSON.stringify(children));
    }

    // Seed Projects
    if (!hasData(KEYS.PROJECTS)) {
        console.log('Seeding projects...');
        const projects = Array.from({ length: 6 }).map(() => ({
            id: faker.string.uuid(),
            title: faker.company.catchPhrase(),
            description: faker.lorem.paragraphs(3),
            targetAmount: faker.number.int({ min: 5000, max: 50000 }),
            currentAmount: faker.number.int({ min: 100, max: 20000 }),
            location: faker.location.city(),
            status: faker.helpers.arrayElement(['active', 'completed', 'planned']),
            imageUrl: faker.image.url({ width: 640, height: 480 }),
            createdAt: faker.date.past().toISOString()
        }));
        localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
    }

    // Seed Trips
    if (!hasData(KEYS.TRIPS)) {
        console.log('Seeding trips...');
        const trips = Array.from({ length: 4 }).map(() => ({
            id: faker.string.uuid(),
            title: `Trip to ${faker.location.country()}`,
            description: faker.lorem.paragraph(),
            destination: faker.location.city(),
            startDate: faker.date.future().toISOString(),
            endDate: faker.date.future().toISOString(),
            cost: faker.number.int({ min: 800, max: 2500 }),
            maxParticipants: faker.number.int({ min: 10, max: 25 }),
            currentParticipants: faker.number.int({ min: 0, max: 8 }),
            status: faker.helpers.arrayElement(['upcoming', 'active']),
            imageUrl: faker.image.url({ width: 640, height: 480 }),
            createdAt: faker.date.past().toISOString()
        }));
        localStorage.setItem(KEYS.TRIPS, JSON.stringify(trips));
    }

    // Seed Admin User if not exists
    if (!hasData(KEYS.USERS)) {
        console.log('Seeding admin user...');
        const adminUser = {
            id: 'admin-001',
            email: 'admin@example.com',
            password: 'admin123',
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin',
            createdAt: new Date().toISOString(),
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
        };
        localStorage.setItem(KEYS.USERS, JSON.stringify([adminUser]));
    }
};
