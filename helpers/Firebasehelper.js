import { db } from "../config/firebase.js";

const usersCollection = db.collection("users");
const notificationsCollection = db.collection("notifications");

export const createUser = async (userName, email, fcmToken) => {
    const user = await usersCollection.add({
        userName,
        email,
        fcmToken,
        timestamp: new Date()
    });

    return {
        userId: user.id,
        userName,
        email,
        fcmToken
    };
};

export const updateFCMToken = async (userId, fcmToken) => {
    await usersCollection.doc(userId).update({
        fcmToken,
        timestamp: new Date()
    });

    return true;
};

export const getUserFCMToken = async (userId) => {
    const userDoc = await usersCollection.doc(userId).get();

    if (!userDoc.exists) {
        throw new Error("User not found");
    }

    return userDoc.data().fcmToken;
};

export const saveNotification = async (
    userId,
    title,
    body
) => {

    const notificationRef = await notificationsCollection.add({
        userId,
        title,
        body,
        timestamp: new Date()
    });

    return {
        notificationId: notificationRef.id
    };
};