import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getMessaging,
    getToken,
    onMessage
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging.js";


const firebaseConfig = {
    apiKey: "AIzaSyAzhiZGlCfRQ1vTXctb4oobYQg012vS3SA",
    authDomain: "internship-project-notify.firebaseapp.com",
    projectId: "internship-project-notify",
    storageBucket: "internship-project-notify.firebasestorage.app",
    messagingSenderId: "377914727099",
    appId: "1:377914727099:web:ca32ebbf49659a7b0d279e"
};


const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

console.log("Firebase Messaging initialized:", messaging);

// Forground Messages
onMessage(messaging, (payload) => {
    console.log("FOREGROUND MESSAGE RECEIVED:", payload);

    const title =
        payload.notification?.title ||
        payload.data?.title ||
        "Notification";

    const body =
        payload.notification?.body ||
        payload.data?.body ||
        "Notification received!";

    console.log("BEFORE new Notification()");
    console.log("Title:", title);
    console.log("Body:", body);
    console.log("Permission:", Notification.permission);

    try {
        const notification = new Notification(title, {
            body: body
        });

        console.log("AFTER new Notification()", notification);

        notification.onshow = () => {
            console.log("NOTIFICATION onshow");
        };

        notification.onerror = (event) => {
            console.error("NOTIFICATION onerror", event);
        };

        notification.onclose = () => {
            console.log("NOTIFICATION onclose");
        };

    } catch (error) {
        console.error("new Notification() threw:", error);
    }
});


// GET FCM TOKEN
document.getElementById("getToken").addEventListener("click", async () => {

    console.log("1. Button clicked!");

    try {

        console.log("2. Requesting permission...");

        const permission = await Notification.requestPermission();

        console.log("3. Permission:", permission);

        if (permission !== "granted") {

            document.getElementById("output").textContent =
                "Notification permission denied.";

            return;
        }

        console.log("4. Permission granted!");

        const token = await getToken(messaging, {
            vapidKey: "BEFWxZX4hNmro4yzIIkBC-fFCg1A4Y8CEVzoejiFlIn0xomnMKMZAR0R21QGEGzl_zfd3lOu_zq0lJlO-46Vlxk"
        });

        console.log("5. FCM TOKEN:", token);

        document.getElementById("output").textContent =
            token || "No token generated.";

    } catch (error) {

        console.error("FCM ERROR:", error);

        document.getElementById("output").textContent =
            error.message;
    }
});
