// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-functions.js";

const firebaseConfig = {
    apiKey: "AIzaSyAi1NxbOy54wnqEaU1ResX5kf1AgJz3ruc",
    authDomain: "ai-code-analyzer-67afe.firebaseapp.com",
    projectId: "ai-code-analyzer-67afe",
    storageBucket: "ai-code-analyzer-67afe.appspot.com",
    messagingSenderId: "1069269577310",
    appId: "1:1069269577310:web:a39409dfe409bc019dcecf",
    measurementId: "G-TH4WE5Q5JL"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

// Export functions
export { functions, httpsCallable };
