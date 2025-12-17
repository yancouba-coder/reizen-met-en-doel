import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage';
import { storage } from '../config/firebase';

export const photoService = {
    uploadPhoto: async (file, path = 'photos') => {
        try {
            const timestamp = Date.now();
            const fileName = `${timestamp}_${file.name}`;
            const storageRef = ref(storage, `${path}/${fileName}`);

            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            return downloadURL;
        } catch (error) {
            console.error("Error uploading photo:", error);
            throw error;
        }
    },

    deletePhoto: async (url) => {
        try {
            const storageRef = ref(storage, url);
            await deleteObject(storageRef);
            return true;
        } catch (error) {
            console.error("Error deleting photo:", error);
            throw error;
        }
    }
};
