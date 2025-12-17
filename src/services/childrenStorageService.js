import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'children';

export const childrenStorageService = {
    getAll: async () => {
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error fetching children:", error);
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
                throw new Error('Child not found');
            }
        } catch (error) {
            console.error("Error fetching child:", error);
            throw error;
        }
    },

    create: async (childData) => {
        try {
            const docRef = await addDoc(collection(db, COLLECTION_NAME), {
                ...childData,
                createdAt: new Date().toISOString()
            });
            return { id: docRef.id, ...childData };
        } catch (error) {
            console.error("Error creating child:", error);
            throw error;
        }
    },

    update: async (id, updates) => {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            await updateDoc(docRef, updates);
            return { id, ...updates };
        } catch (error) {
            console.error("Error updating child:", error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            await deleteDoc(doc(db, COLLECTION_NAME, id));
            return true;
        } catch (error) {
            console.error("Error deleting child:", error);
            throw error;
        }
    }
};
