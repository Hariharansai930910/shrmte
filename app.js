import { db } from './firebase-config.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { collection, addDoc, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

const auth = getAuth(getApp());

window.goToMatch = async function () {
  const sliceCount = document.getElementById("sliceInput").value;
  const preference = document.getElementById("matchPref").value;

  if (!sliceCount || sliceCount < 1 || sliceCount > 8) {
    alert("Please select 1 to 8 slices.");
    return;
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const docRef = await addDoc(collection(db, "match_requests"), {
          user_id: user.uid,
          user_email: user.email,
          restaurant_id: "PizzaHut001",
          slices_wanted: parseInt(sliceCount),
          status: "waiting",
          timestamp: new Date().toISOString()
        });

        localStorage.setItem("slices", sliceCount);
        localStorage.setItem("matchPref", preference);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("matchRequestId", docRef.id);

        // Redirect to waiting page
        window.location.href = "waiting.html";
      } catch (error) {
        console.error("Error writing document: ", error);
        alert("⚠️ Could not submit match request.");
      }
    } else {
      alert("Please log in first!");
      window.location.href = "login.html";
    }
  });
};

window.redirectToWallet = function () {
  window.location.href = "wallet-dashboard.html";
};

window.checkLoginRedirect = function () {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      localStorage.setItem("userEmail", user.email);
    }
  });
};

window.initializeWalletIfMissing = async function () {
  const email = localStorage.getItem("userEmail");
  if (!email) return;

  const ref = doc(db, "users_wallets", email);
  const docSnap = await getDoc(ref);
  if (!docSnap.exists()) {
    await setDoc(ref, {
      email: email,
      balance: 1000,
      last_updated: new Date().toISOString()
    });
    console.log("✅ Wallet initialized for", email);
  }
};
