// Show / clear error messages
function showError(id, message) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = message;
    el.style.color = "red";
  }
}

function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = "";
}

// Regular expressions
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;            
const postalRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/; 
const cardRegex = /^\d{16}$/;
const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
const cvvRegex = /^\d{3}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/; 

// Register form
const registerForm = document.querySelector("form[action='#']");

if (document.title.includes("Register") && registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault(); 
    let valid = true;

    // Full name
    const fullname = document.getElementById("fullname").value.trim();
    if (fullname === "") {
      showError("fullname-error", "Full name is required.");
      valid = false;
    } else clearError("fullname-error");

    // Username
    const username = document.getElementById("username").value.trim();
    if (username.length < 3 || username.length > 20) {
      showError("username-error", "Username must be between 3 and 20 characters.");
      valid = false;
    } else clearError("username-error");

    // Email
    const email = document.getElementById("email").value.trim();
    if (!emailRegex.test(email)) {
      showError("email-error", "Please enter a valid email address.");
      valid = false;
    } else clearError("email-error");

    // Password strength
    const password = document.getElementById("new-password").value;
    if (!passwordRegex.test(password)) {
      showError("password-error", "Password must be 6+ characters with at least one uppercase letter and one number.");
      valid = false;
    } else clearError("password-error");

    // Phone (validate if filled)
    const phone = document.getElementById("phone").value.trim();
    if (phone !== "" && !phoneRegex.test(phone)) {
      showError("phone-error", "Phone must be 10 digits (e.g. 5141234567).");
      valid = false;
    } else clearError("phone-error");

    // Account type
    const accountType = document.getElementById("account-type").value;
    if (accountType === "") {
      showError("account-type-error", "Please select an account type.");
      valid = false;
    } else clearError("account-type-error");

    // Terms checkbox
    const terms = document.getElementById("terms").checked;
    if (!terms) {
      showError("terms-error", "You must agree to the Terms.");
      valid = false;
    } else clearError("terms-error");

    if (valid) {
      alert("Account created successfully! Welcome to PTKM Gaming.");
      registerForm.reset();
    }
  });
}

// Login form
if (document.title.includes("Login")) {
  const loginForm = document.querySelector("form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      const email = document.getElementById("email").value.trim();
      if (!emailRegex.test(email)) {
        showError("email-error", "Please enter a valid email address.");
        valid = false;
      } else clearError("email-error");

      const password = document.getElementById("password").value;
      if (password.length < 6) {
        showError("password-error", "Password must be at least 6 characters.");
        valid = false;
      } else clearError("password-error");

      if (valid) {
        alert("Login successful! Welcome back.");
        loginForm.reset();
      }
    });
  }
}

// Checkout form
if (document.title.includes("Checkout")) {
  const checkoutForm = document.querySelector("form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      // Full name
      const name = document.getElementById("name").value.trim();
      if (name === "") {
        showError("name-error", "Full name is required.");
        valid = false;
      } else clearError("name-error");

    // Address
    const address = document.getElementById("address").value.trim();
    if (address === "") {
    showError("address-error", "Address is required.");
    valid = false;
    } else clearError("address-error");

    // City
    const city = document.getElementById("city").value.trim();
    if (city === "") {
    showError("city-error", "City is required.");
    valid = false;
    } else clearError("city-error");

      // Postal code
      const zip = document.getElementById("zip").value.trim();
      if (!postalRegex.test(zip)) {
        showError("zip-error", "Enter a valid Canadian postal code (e.g. A1A1A1).");
        valid = false;
      } else clearError("zip-error");

      // Card number
      const cardNumber = document.getElementById("cardnumber").value.trim();
      if (!cardRegex.test(cardNumber)) {
        showError("cardnumber-error", "Card number must be exactly 16 digits.");
        valid = false;
      } else clearError("cardnumber-error");

      // Expiry date
      const expiry = document.getElementById("expiry").value.trim();
      if (!expiryRegex.test(expiry)) {
        showError("expiry-error", "Enter a valid expiry date (MM/YY).");
        valid = false;
      } else clearError("expiry-error");

      // cvv
      const cvv = document.getElementById("cvv").value.trim();
      if (!cvvRegex.test(cvv)) {
        showError("cvv-error", "CVV must be exactly 3 digits.");
        valid = false;
      } else clearError("cvv-error");

      if (valid) {
        alert("Order placed successfully! Thank you for shopping at PTKM Gaming.");
        checkoutForm.reset();
      }
    });
  }
}

//Contact form
if (document.title.includes("Contact")) {
  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      // Name
      const name = document.getElementById("name").value.trim();
      if (name === "") {
        showError("name-error", "Full name is required.");
        valid = false;
      } else clearError("name-error");

      // Email
      const email = document.getElementById("email").value.trim();
      if (!emailRegex.test(email)) {
        showError("email-error", "Please enter a valid email address.");
        valid = false;
      } else clearError("email-error");

      // Phone
      const phone = document.getElementById("phone").value.trim();
      if (!phoneRegex.test(phone)) {
        showError("phone-error", "Phone must be 10 digits (e.g. 5141234567).");
        valid = false;
      } else clearError("phone-error");

      // Topic
      const topic = document.getElementById("topic").value;
      if (topic === "") {
        showError("topic-error", "Please select a reason for contact.");
        valid = false;
      } else clearError("topic-error");

      // Message
      const message = document.getElementById("message").value.trim();
      if (message.length < 10) {
        showError("message-error", "Please enter a message (at least 10 characters).");
        valid = false;
      } else clearError("message-error");

      if (valid) {
        alert("Message sent! We will get back to you soon.");
        contactForm.reset();
      }
    });
  }
}