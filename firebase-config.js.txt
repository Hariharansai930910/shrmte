// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyO9rz0D-...XThX3tVWGI5DQbgNcTwmsKc",
  authDomain: "shrmte.firebaseapp.com",
  projectId: "shrmte",
  storageBucket: "shrmte.appspot.com",
  messagingSenderId: "660245185229",
  appId: "1:660245185229:web:9fb02e30892ba09dfd5f84"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
