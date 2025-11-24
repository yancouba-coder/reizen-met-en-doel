import { faker } from '@faker-js/faker';

// Mock storage
let photos = Array.from({ length: 12 }).map(() => ({
    id: faker.string.uuid(),
    url: faker.image.urlLoremFlickr({ category: 'people' }),
    filename: faker.system.fileName(),
    size: faker.number.int({ min: 100000, max: 5000000 }),
    type: 'image/jpeg',
    uploadedAt: faker.date.recent(),
    uploadedBy: 'Admin'
}));

export const photoService = {
    getPhotos: async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return [...photos];
    },

    uploadPhoto: async (file) => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newPhoto = {
            id: faker.string.uuid(),
            url: URL.createObjectURL(file),
            filename: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date(),
            uploadedBy: 'Admin'
        };

        photos = [newPhoto, ...photos];
        return newPhoto;
    },

    deletePhoto: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        photos = photos.filter(p => p.id !== id);
        return true;
    }
};
