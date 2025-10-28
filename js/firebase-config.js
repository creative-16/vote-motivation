// Firebase configuration - Replace with your own config
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDJ7-QRwtjVgYXU80jNdTUylQieOKkqhCY",
  authDomain: "vote-simulation.firebaseapp.com",
  projectId: "vote-simulation",
  storageBucket: "vote-simulation.firebasestorage.app",
  messagingSenderId: "921318819841",
  appId: "1:921318819841:web:add720f415d8c0f4015800"
};


// Initialize Firebase
// Uncomment the following lines if you want to use Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, query, orderBy, limit, where, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mock data for offline mode
let mockVotes = {
  Alice: 312,
  Bob: 287,
  Charlie: 293
};

let mockUsers = [
  { username: 'VoterPro', points: 150, votes: 15 },
  { username: 'DemocracyFan', points: 120, votes: 12 },
  { username: 'CivicEngaged', points: 100, votes: 10 },
  { username: 'Vote2023', points: 80, votes: 8 },
  { username: 'ElectionExpert', points: 60, votes: 6 }
];

// Export for use in other files
window.firebaseConfig = firebaseConfig;
window.mockVotes = mockVotes;
window.mockUsers = mockUsers;