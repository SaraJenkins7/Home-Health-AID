// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDn0z77A2OiiqX_COoNYd8_CCB6yS-yW7U",
    authDomain: "home-health-aid.firebaseapp.com",
    projectId: "home-health-aid",
    storageBucket: "home-health-aid.appspot.com",
    messagingSenderId: "483007267812",
    appId: "1:483007267812:web:cb75ddd05c9c32b8fb7df1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getClients(db) {
    const clientsCol = collection(db, "Clients");
    const clientsSnapshot = await getDocs(clientsCol);
    const clientsList = clientsSnapshot.docs.map((doc) => doc.data());
    return clientsList;
};

getClients(db);

let openRequest = indexedDB.open("hha", 1);

openRequest.onerror = function() {
    console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
    let db = openRequest.result;
};