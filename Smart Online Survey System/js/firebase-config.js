import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC5YKDUxtpO2MO9uI3n-zWqPg-NHVrREJo",
    authDomain: "smart-online-survey-system.firebaseapp.com",
    projectId: "smart-online-survey-system",
    storageBucket: "smart-online-survey-system.firebasestorage.app",
    messagingSenderId: "810930636611",
    appId: "1:810930636611:web:647317374714ae503b51f6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);