import { faker } from '@faker-js/faker';

export const generateMockChildren = (count = 20) => {
    return Array.from({ length: count }).map(() => {
        const sex = faker.person.sexType();
        const firstName = faker.person.firstName(sex);
        const lastName = faker.person.lastName();

        return {
            id: faker.string.uuid(),
            firstName: firstName,
            lastName: lastName,
            age: faker.number.int({ min: 4, max: 16 }),
            gender: sex,
            country: 'Senegal',
            village: faker.location.city(),
            story: faker.lorem.paragraphs(3),
            description: faker.lorem.sentence(),
            needs: faker.helpers.arrayElements(['education', 'healthcare', 'nutrition', 'clothing'], { min: 1, max: 3 }),
            imageUrl: faker.image.url({ width: 640, height: 480 }),
            sponsorCostMonthly: faker.number.int({ min: 20, max: 50 }),
            status: faker.helpers.arrayElement(['waiting', 'sponsored', 'urgent']),
            joinedDate: faker.date.past().toISOString()
        };
    });
};

export const generateMockProjects = (count = 12) => {
    const projectTypes = [
        { title: 'Clean Water Well', purpose: 'Provide clean drinking water to the village' },
        { title: 'School Building', purpose: 'Build a new classroom for primary education' },
        { title: 'Medical Clinic', purpose: 'Establish a healthcare facility for the community' },
        { title: 'Solar Power Installation', purpose: 'Bring electricity to remote areas' },
        { title: 'Agricultural Training', purpose: 'Teach sustainable farming techniques' },
        { title: 'Library Construction', purpose: 'Create a learning center with books and resources' },
        { title: 'Nutrition Program', purpose: 'Provide daily meals for school children' },
        { title: 'Women\'s Empowerment Center', purpose: 'Support women\'s education and entrepreneurship' },
    ];

    return Array.from({ length: count }).map(() => {
        const projectType = faker.helpers.arrayElement(projectTypes);
        const targetAmount = faker.number.int({ min: 5000, max: 50000 });
        const raisedAmount = faker.number.int({ min: 0, max: targetAmount });

        return {
            id: faker.string.uuid(),
            title: `${projectType.title} - ${faker.location.city()}`,
            description: faker.lorem.sentences(2),
            fullDescription: faker.lorem.paragraphs(3),
            purpose: projectType.purpose,
            image: faker.image.url({ width: 640, height: 480 }),
            targetAmount: targetAmount,
            raisedAmount: raisedAmount,
            location: faker.location.city(),
            country: 'Senegal',
            startDate: faker.date.past().toISOString(),
            category: faker.helpers.arrayElement(['Education', 'Health', 'Infrastructure', 'Environment', 'Community']),
        };
    });
};

// Generate initial data
export const MOCK_CHILDREN = generateMockChildren(24);
export const MOCK_PROJECTS = generateMockProjects(12);
