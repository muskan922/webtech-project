// Show/hide terms popup
function terms() {
  document.getElementById("termsBox").style.display = "block";
}
function closeTerms() {
  document.getElementById("termsBox").style.display = "none";
}

const form = document.getElementById("signupForm");

function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const errorDiv = document.getElementById(inputId + "Error");
  input.classList.add("error");
  errorDiv.textContent = message;
  input.addEventListener("input", () => {
    input.classList.remove("error");
    errorDiv.textContent = "";
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let valid = true;

  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const cpassword = document.getElementById("cpassword").value.trim();
  const termsCheck = document.getElementById("termsCheck").checked;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!fname) {
    showError("fname", "First name is required");
    valid = false;
  }
  if (!lname) {
    showError("lname", "Last name is required");
    valid = false;
  }
  if (!email) {
    showError("email", "Email is required");
    valid = false;
  } else if (!/^[^\s@]+@gmail\.com$/.test(email)) {
    showError("email", "Only Gmail address allowed (@ gmail.com)");
    valid = false;
  } else if (users.some((o) => o.email === email)) {
    showError("email", "email already exist");
    valid = false;
  }

  if (!password) {
    showError("password", "Password is required");
    valid = false;
  } else if (password.length < 8) {
    showError("password", "Password must be at least 8 characters");
    valid = false;
  }
  if (!cpassword) {
    showError("cpassword", "Confirm password is required");
    valid = false;
  } else if (password !== cpassword) {
    showError("cpassword", "Passwords do not match");
    valid = false;
  }
  if (!termsCheck) {
    showError("termsCheck", "You must accept terms");
    valid = false;
  }

  if (!valid) return;

  const newUser = { fname, lname, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("active_user", JSON.stringify(newUser));

  alert("Registration successful!");
  // const hell = document.getElementById("help");
  window.location.href = "../html/dashboard.html";
  // form.reset();
});
