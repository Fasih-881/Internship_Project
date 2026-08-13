importScripts(
    "https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyAzhiZGlCfRQ1vTXctb4oobYQg012vS3SA",
    authDomain: "internship-project-notify.firebaseapp.com",
    projectId: "internship-project-notify",
    storageBucket: "internship-project-notify.firebasestorage.app",
    messagingSenderId: "377914727099",
    appId: "1:377914727099:web:ca32ebbf49659a7b0d279e"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();