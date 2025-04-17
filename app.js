import { db } from './firebase-config.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
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
        await addDoc(collection(db, "match_requests"), {
          user_id: user.uid,
          user_email: user.email,
          restaurant_id: "PizzaHut001",
          slices_wanted: parseInt(sliceCount),
          status: "waiting",
          timestamp: new Date().toISOString()
        });

        localStorage.setItem("slices", sliceCount);
        localStorage.setItem("matchPref", preference);

        window.location.href = "match.html";
      } catch (error) {
        console.error("Error writing document: ", error);
        alert("⚠️ Could not submit match request.");
      }
    } else {
      alert("Please log in first!");
    }
  });
}
