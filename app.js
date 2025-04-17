function goToMatch() {
  const sliceCount = document.getElementById("sliceInput").value;
  if (!sliceCount || sliceCount < 1 || sliceCount > 8) {
    alert("Please select 1 to 8 slices.");
    return;
  }

  // Store it temporarily
  localStorage.setItem("slices", sliceCount);

  // Navigate to match screen
  window.location.href = "match.html";
}
