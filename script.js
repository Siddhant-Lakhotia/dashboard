const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const pupil = document.getElementById("pupil");
const cross = document.getElementById("cross");
let isPasswordVisible = false;
let revealInterval; // Track the reveal interval to stop it

// Simple credentials for validation
const correctUsername = "admin";
const correctPassword = "admin123";

// Track cursor and move the pupil
document.addEventListener("mousemove", (event) => {
  const eye = togglePassword.querySelector(".eye");
  const rect = eye.getBoundingClientRect();

  const eyeCenterX = rect.left + rect.width / 2;
  const eyeCenterY = rect.top + rect.height / 2;

  const dx = event.clientX - eyeCenterX;
  const dy = event.clientY - eyeCenterY;

  const angle = Math.atan2(dy, dx);
  const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 8); // Limit pupil movement
  const offsetX = Math.cos(angle) * distance;
  const offsetY = Math.sin(angle) * distance;

  pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

// Toggle Password Visibility
togglePassword.addEventListener("click", () => {
  if (isPasswordVisible) {
    passwordInput.type = "password";
    clearInterval(revealInterval); // Stop reveal effect when password is hidden
    cross.classList.remove("active"); // Hide the cross
  } else {
    revealPassword();
    cross.classList.add("active"); // Show the cross
  }
  isPasswordVisible = !isPasswordVisible;
});

// Reveal Password Letter by Letter
function revealPassword() {
  const password = passwordInput.value;
  passwordInput.type = "text";
  passwordInput.value = ""; // Clear the field temporarily

  let index = 0;
  clearInterval(revealInterval); // Ensure no intervals are running before starting new reveal
  revealInterval = setInterval(() => {
    if (index < password.length) {
      passwordInput.value += password[index];
      index++;
    } else {
      clearInterval(revealInterval); // Stop the interval once the password is fully revealed
    }
  }, 50); // Adjust the delay for each letter
}

// Handle the login form submission
function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = passwordInput.value;

  if (username === correctUsername && password === correctPassword) {
    // Successful login
    localStorage.setItem('loggedIn', true); // Set logged in state in localStorage
    window.location.href = 'index.html'; // Redirect to main content page
  } else {
    // Display error message
    document.getElementById("error-message").textContent = "Invalid credentials. Please try again.";
    document.getElementById("error-message").style.display = 'block';
  }
}


// Handle submission when the Enter key is pressed
