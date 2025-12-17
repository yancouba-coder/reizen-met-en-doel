import { faker } from '@faker-js/faker';

try {
    console.log('Testing Faker generation...');
    const child = {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        image: faker.image.urlLoremFlickr({ category: 'people' })
    };
    console.log('Successfully generated child:', child);
} catch (error) {
    console.error('Faker generation failed:', error);
}
