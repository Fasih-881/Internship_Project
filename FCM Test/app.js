import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getMessaging,
    getToken
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging.js";


const firebaseConfig = {
    apiKey: "AIzaSyAzhiZGlCfRQ1vTXctb4oobYQg012vS3SA",
    authDomain: "internship-project-notify.firebaseapp.com",
    projectId: "internship-project-notify",
    storageBucket: "internship-project-notify.firebasestorage.app",
    messagingSenderId: "377914727099",
    appId: "1:377914727099:web:13323992963a0c160d279e"
};


const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);


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

        console.log("5. Token:", token);

        document.getElementById("output").textContent =
            token || "No token generated.";

    } catch (error) {

        console.error("FCM ERROR:", error);

        document.getElementById("output").textContent =
            error.message;
    }
});