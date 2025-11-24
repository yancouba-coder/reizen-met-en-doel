import { faker } from '@faker-js/faker';

const TRIPS_KEY = 'twap_trips';

// Initialize with sample data
const initTrips = () => {
    const trips = localStorage.getItem(TRIPS_KEY);
    if (!trips) {
        const sampleTrips = Array.from({ length: 4 }).map(() => ({
            id: faker.string.uuid(),
            title: `Trip to ${faker.location.city()}`,
            description: faker.lorem.paragraph(),
            destination: faker.location.country(),
            startDate: faker.date.future().toISOString(),
            endDate: faker.date.future().toISOString(),
            cost: faker.number.int({ min: 500, max: 2000 }),
            maxParticipants: faker.number.int({ min: 10, max: 30 }),
            currentParticipants: faker.number.int({ min: 0, max: 15 }),
            status: faker.helpers.arrayElement(['upcoming', 'active', 'completed', 'cancelled']),
            imageUrl: faker.image.urlLoremFlickr({ category: 'travel' }),
            createdAt: faker.date.past().toISOString()
        }));
        localStorage.setItem(TRIPS_KEY, JSON.stringify(sampleTrips));
        return sampleTrips;
    }
    return JSON.parse(trips);
};

export const tripsStorageService = {
    getAll: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return initTrips();
    },

    getById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        const trips = initTrips();
        return trips.find(t => t.id === id);
    },

    create: async (tripData) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const trips = initTrips();
        const newTrip = {
            id: faker.string.uuid(),
            ...tripData,
            currentParticipants: 0,
            imageUrl: faker.image.urlLoremFlickr({ category: 'travel' }),
            createdAt: new Date().toISOString()
        };
        trips.push(newTrip);
        localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
        return newTrip;
    },

    update: async (id, updates) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const trips = initTrips();
        const index = trips.findIndex(t => t.id === id);
        if (index !== -1) {
            trips[index] = { ...trips[index], ...updates };
            localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
            return trips[index];
        }
        throw new Error('Trip not found');
    },

    delete: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const trips = initTrips();
        const filtered = trips.filter(t => t.id !== id);
        localStorage.setItem(TRIPS_KEY, JSON.stringify(filtered));
        return true;
    }
};
