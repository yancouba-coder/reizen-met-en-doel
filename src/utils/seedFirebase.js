import { collection, addDoc, writeBatch, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { generateMockChildren, generateMockProjects } from '../mocks/mockData';

export const seedDatabase = async () => {
    try {
        const batch = writeBatch(db);

        // Seed Children
        const children = generateMockChildren(20);
        children.forEach(child => {
            const docRef = doc(collection(db, 'children'));
            batch.set(docRef, {
                ...child,
                createdAt: new Date().toISOString()
            });
        });

        // Seed Projects
        const projects = generateMockProjects(10);
        projects.forEach(project => {
            const docRef = doc(collection(db, 'projects'));
            batch.set(docRef, {
                ...project,
                createdAt: new Date().toISOString()
            });
        });

        await batch.commit();
        console.log('Database seeded successfully!');
        return { success: true, message: `Seeded ${children.length} children and ${projects.length} projects.` };
    } catch (error) {
        console.error("Error seeding database:", error);
        return { success: false, error: error.message };
    }
};
