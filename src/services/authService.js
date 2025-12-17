import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const authService = {
    login: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    register: async ({ email, password, firstName, lastName }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: `${firstName} ${lastName}`
            });
            return userCredential.user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    logout: async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getCurrentUser: () => {
        return new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                resolve(user);
            });
        });
    },

    onAuthStateChanged: (callback) => {
        return onAuthStateChanged(auth, callback);
    },

    updateUser: async (uid, updates) => {
        try {
            if (updates.displayName || updates.photoURL) {
                await updateProfile(auth.currentUser, updates);
            }
            // Note: Email/Password updates require different methods (updateEmail, updatePassword)
            // and re-authentication, which is more complex. 
            // For now, we only support profile updates.
            return auth.currentUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};
