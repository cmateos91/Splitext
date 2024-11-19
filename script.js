// JavaScript functionality
const inputText = document.getElementById("input-text");
const charTotal = document.getElementById("char-total");
const charCount = document.getElementById("char-count");
const divideTextButton = document.getElementById("divide-text");
const dividedTextCard = document.getElementById("divided-text-card");
const dividedTextContainer = document.getElementById("divided-text-container");
const toggleDarkModeButton = document.getElementById("toggle-dark-mode");
const donateButton = document.getElementById("donate-button");
const donationModal = document.getElementById("donation-modal");
const closeModal = document.getElementById("close-modal");
let isDarkMode = false;

// Ensure the initial theme is light
document.body.classList.remove("dark");

// Update character count
inputText.addEventListener("input", () => {
  charTotal.textContent = inputText.value.length;
});

// Toggle dark mode
toggleDarkModeButton.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark", isDarkMode);
  toggleDarkModeButton.textContent = isDarkMode ? "☀️" : "🌙";
});

// Show the donation modal
donateButton.addEventListener("click", () => {
  donationModal.style.display = "block";
});

// Close the donation modal
closeModal.addEventListener("click", () => {
  donationModal.style.display = "none";
});

// Escape HTML special characters
function escapeHtml(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

// Divide text into chunks
divideTextButton.addEventListener("click", () => {
  const text = inputText.value;
  const chunkSize = parseInt(charCount.value, 10);

  // Reset the container
  dividedTextContainer.innerHTML = "";

  if (text.length === 0 || chunkSize <= 0) return;

  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }

  chunks.forEach((chunk, index) => {
    const chunkDiv = document.createElement("div");
    chunkDiv.className = "chunk";
    chunkDiv.innerHTML = `
      <p>${escapeHtml(chunk)}</p>
      <small>Characters: ${chunk.length}</small>
    `;
    dividedTextContainer.appendChild(chunkDiv);
  });

  // Show the card with divided text
  dividedTextCard.style.display = "block";

  // Add download functionality
  setupDownloadButton(chunks);
});

// Set up the download button
function setupDownloadButton(chunks) {
  // Create .txt file content
  const fileContent = chunks.join("\n\n");
  const blob = new Blob([fileContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  // Configure the button
  downloadButton.textContent = "Download as TXT";
  downloadButton.className = "button"; // PicoCSS styling
  downloadButton.onclick = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "divided_text.txt";
    a.click();
    URL.revokeObjectURL(url); // Clean up the object URL
  };

  // Add the button to the container (if not already present)
  if (!dividedTextContainer.contains(downloadButton)) {
    dividedTextContainer.appendChild(downloadButton);
  }
}
