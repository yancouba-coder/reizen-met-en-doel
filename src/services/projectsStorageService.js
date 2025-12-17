import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'projects';

export const projectsStorageService = {
    getAll: async () => {
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error fetching projects:", error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                throw new Error('Project not found');
            }
        } catch (error) {
            console.error("Error fetching project:", error);
            throw error;
        }
    },

    create: async (projectData) => {
        try {
            const docRef = await addDoc(collection(db, COLLECTION_NAME), {
                ...projectData,
                createdAt: new Date().toISOString()
            });
            return { id: docRef.id, ...projectData };
        } catch (error) {
            console.error("Error creating project:", error);
            throw error;
        }
    },

    update: async (id, updates) => {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            await updateDoc(docRef, updates);
            return { id, ...updates };
        } catch (error) {
            console.error("Error updating project:", error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            await deleteDoc(doc(db, COLLECTION_NAME, id));
            return true;
        } catch (error) {
            console.error("Error deleting project:", error);
            throw error;
        }
    }
};
