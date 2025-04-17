import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

async function goToMatch() {
  const sliceCount = document.getElementById("sliceInput").value;
  const preference = document.getElementById("matchPref").value;

  if (!sliceCount || sliceCount < 1 || sliceCount > 8) {
    alert("Please select 1 to 8 slices.");
    return;
  }

  // Store in Firestore
  await addDoc(collection(db, "match_requests"), {
    user_id: "user_001", // temp static, later use Firebase Auth
    restaurant_id: "PizzaHut001",
    slices_wanted: parseInt(sliceCount),
    status: "waiting",
    timestamp: new Date().toISOString()
  });

  localStorage.setItem("slices", sliceCount);
  localStorage.setItem("matchPref", preference);

  window.location.href = "match.html";
}
