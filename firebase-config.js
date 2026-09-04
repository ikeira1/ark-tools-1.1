import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD27a-WhhKdvblKUduPrZkBcmUr-uYkED4",
    authDomain: "ark-tools.firebaseapp.com",
    projectId: "ark-tools",
    storageBucket: "ark-tools.firebasestorage.app",
    messagingSenderId: "576361005916",
    appId: "1:576361005916:web:4df24f62da976ae2cdb799",
    measurementId: "G-4LD2YGH0TW"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);