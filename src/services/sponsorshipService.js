import {
    collection,
    addDoc,
    runTransaction,
    doc,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const SPONSORSHIPS_COLLECTION = 'sponsorships';
const DONATIONS_COLLECTION = 'donations';
const CHILDREN_COLLECTION = 'children';
const PROJECTS_COLLECTION = 'projects';

export const sponsorshipService = {
    // Sponsor a child
    sponsorChild: async (childId, sponsorDetails) => {
        try {
            await runTransaction(db, async (transaction) => {
                const childRef = doc(db, CHILDREN_COLLECTION, childId);
                const childDoc = await transaction.get(childRef);

                if (!childDoc.exists()) {
                    throw new Error("Child does not exist!");
                }

                if (childDoc.data().status === 'sponsored') {
                    throw new Error("Child is already sponsored!");
                }

                // Create sponsorship record
                const sponsorshipRef = doc(collection(db, SPONSORSHIPS_COLLECTION));
                transaction.set(sponsorshipRef, {
                    childId,
                    sponsorDetails,
                    status: 'active',
                    startDate: serverTimestamp(),
                    amount: childDoc.data().sponsorCostMonthly
                });

                // Update child status
                transaction.update(childRef, {
                    status: 'sponsored',
                    sponsorId: sponsorshipRef.id
                });
            });

            return { success: true };
        } catch (error) {
            console.error("Sponsorship failed:", error);
            throw error;
        }
    },

    // Donate to a project
    donateToProject: async (projectId, amount, donorDetails) => {
        try {
            await runTransaction(db, async (transaction) => {
                const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
                const projectDoc = await transaction.get(projectRef);

                if (!projectDoc.exists()) {
                    throw new Error("Project does not exist!");
                }

                const currentRaised = projectDoc.data().raisedAmount || 0;
                const newRaised = currentRaised + amount;

                // Create donation record
                const donationRef = doc(collection(db, DONATIONS_COLLECTION));
                transaction.set(donationRef, {
                    projectId,
                    amount,
                    donorDetails,
                    date: serverTimestamp()
                });

                // Update project raised amount
                transaction.update(projectRef, {
                    raisedAmount: newRaised
                });
            });

            return { success: true };
        } catch (error) {
            console.error("Donation failed:", error);
            throw error;
        }
    }
};
