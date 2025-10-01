function contain(index) {
  const list = document.querySelectorAll(".sidebar a");
  const sections = document.querySelectorAll(".element");

  list.forEach((item) => item.classList.remove("active"));
  list[index].classList.add("active");

  sections.forEach((section) => section.classList.remove("containActive"));
  sections[index].classList.add("containActive");
}

// Set profile name from localStorage
function selectActive() {
  const account = document.getElementById("uk");
  const accountActive = JSON.parse(localStorage.getItem("active_user"));

  if (accountActive) {
    account.textContent = accountActive.fname + " " + accountActive.lname;
  } else {
    account.textContent = "New Acc";
  }
}

selectActive();

function profile(eve) {
  eve.preventDefault();
  const qok = document.getElementById("full_name").value;
  const date = document.getElementById("dob").value;
  const email = document.getElementById("email_address").value;
  const phone = document.getElementById("phone_no").value;
  const adress = document.getElementById("adress_info").value;
  const pin_code = document.getElementById("pin").value;
  const cite = document.getElementById("city").value;
  const country = document.getElementById("count").value;
  const git_hub = document.getElementById("git").value;

  if (
    !phone ||
    !date ||
    !adress ||
    !qok ||
    !email ||
    !pin_code ||
    !cite ||
    !country ||
    !git_hub
  ) {
    alert("all fields are required");
    return;
  }

  const fullName = qok;

  // Split by space
  const parts = fullName.trim().split(" ");

  // First name hamesha pehla word
  const firstName = parts[0];

  // Last name hamesha last word
  const lastName = parts[parts.length - 1];

  // console.log("First Name:", firstName);
  // console.log("Last Name:", lastName);

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let active_user = JSON.parse(localStorage.getItem("active_user"));

  const new_update = {
    ...active_user,
    fname: firstName,
    lname: lastName,
    email,
    phone,
    country,
    git_hub,
    cite,
    date,
    adress,
    pin_code,
  };
  users = users.map((u) => (u.email == active_user.email ? new_update : u));
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("active_user", JSON.stringify(new_update));
  console.log(users);
  console.log(new_update);

  alert("updated successfully");
}
let form = document.getElementById("form");
form.addEventListener("submit", profile);

document.addEventListener("DOMContentLoaded", function () {
  const cancelBtn = document.getElementById("cancel_changes");
  console.log("cansel_changes");

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      console.log("Cancel clicked");
      const active_user = JSON.parse(localStorage.getItem("active_user"));
      if (!active_user) {
        alert("No active user found.");
        return;
      }

      const inputs = document.querySelectorAll("#form input, #form textarea");
      inputs.forEach((input) => (input.value = ""));

      if (active_user.fname && active_user.lname) {
        document.getElementById(
          "full_name"
        ).value = `${active_user.fname} ${active_user.lname}`;
      }

      if (active_user.email) {
        document.getElementById("email_address").value = active_user.email;
      }

      if (active_user.date)
        document.getElementById("dob").value = active_user.date;

      if (active_user.phone)
        document.getElementById("phone_no").value = active_user.phone;

      if (active_user.adress)
        document.getElementById("adress_info").value = active_user.adress;

      if (active_user.pin_code)
        document.getElementById("pin").value = active_user.pin_code;

      if (active_user.cite)
        document.getElementById("city").value = active_user.cite;

      if (active_user.country)
        document.getElementById("count").value = active_user.country;

      if (active_user.git_hub)
        document.getElementById("git").value = active_user.git_hub;
    });
  }
});

// cancel changes
// document.getElementById("cancel_changes").addEventListener("click", () => {
//   const active_user = JSON.parse(localStorage.getItem("active_user"));
//   console.log("cancel chanes clicked");

//   if (!active_user) {
//     alert("No active user found.");
//     return;
//   }

//   // Clear all input fields
//   const inputs = document.querySelectorAll("#form input, #form textarea");
//   inputs.forEach((input) => (input.value = ""));

//   // Set Full Name and Email
//   if (active_user.fname && active_user.lname) {
//     document.getElementById(
//       "full_name"
//     ).value = `${active_user.fname} ${active_user.lname}`;
//   }

//   if (active_user.email) {
//     document.getElementById("email_address").value = active_user.email;
//   }

//   // Optional fields - fill only if present
//   if (active_user.date) document.getElementById("dob").value = active_user.date;

//   if (active_user.phone)
//     document.getElementById("phone_no").value = active_user.phone;

//   if (active_user.adress)
//     document.getElementById("adress_info").value = active_user.adress;

//   if (active_user.pin_code)
//     document.getElementById("pin").value = active_user.pin_code;

//   if (active_user.cite)
//     document.getElementById("city").value = active_user.cite;

//   if (active_user.country)
//     document.getElementById("count").value = active_user.country;

//   if (active_user.git_hub)
//     document.getElementById("git").value = active_user.git_hub;
// });

function signOut() {
  localStorage.removeItem("active_user");

  window.location.href = "../html/signup.html";
}

// Password Update Logic
// const passwordForm = document.querySelector(".password-section form");
// const currentPasswordInput = passwordForm.querySelector(
//   "input[type='password']:nth-of-type(1)"
// );
// const newPasswordInput = passwordForm.querySelector(
//   "input[type='password']:nth-of-type(2)"
// );
// const confirmPasswordInput = passwordForm.querySelector(
//   "input[type='password']:nth-of-type(3)"
// );

function security(ere) {
  ere.preventDefault();

  const currentPassword = document.getElementById("cp").value.trim();
  const newPassword = document.getElementById("np").value.trim();
  const confirmPassword = document.getElementById("cop").value.trim();
  const passwordForm = document.getElementById("updation");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const activeUser = JSON.parse(localStorage.getItem("active_user"));
  const foundUser = users.find((u) => u.email === activeUser?.email);

  if (!foundUser) {
    alert("No active user found.");
    return;
  }

  if (currentPassword !== foundUser.password) {
    alert("Current password is incorrect.");
    return;
  }

  if (newPassword.length < 6) {
    alert("New password must be at least 6 characters.");
    return;
  }

  // 3. Check new password and confirm password match
  if (newPassword !== confirmPassword) {
    alert("New passwords do not match.");
    return;
  }

  // 4. Update password
  foundUser.password = newPassword;

  // Update users array
  const updatedUsers = users.map((user) =>
    user.email === foundUser.email ? foundUser : user
  );

  // Update localStorage
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.setItem("active_user", JSON.stringify(foundUser));

  alert("Password updated successfully.");

  // Clear the form
  passwordForm.reset();
}
const passwordForm = document.getElementById("updation");
passwordForm.addEventListener("submit", security);

// const currentPassword = currentPasswordInput.value.trim();
// const newPassword = newPasswordInput.value.trim();
// const confirmPassword = confirmPasswordInput.value.trim();

// const users = JSON.parse(localStorage.getItem("users")) || [];
// const activeUser = JSON.parse(localStorage.getItem("active_user"));

// Check if user exists
//   const foundUser = users.find((u) => u.email === activeUser?.email);

//   if (!foundUser) {
//     alert("No active user found.");
//     return;
//   }

//   // 1. Validate current password
//   if (currentPassword !== foundUser.password) {
//     alert("Current password is incorrect.");
//     return;
//   }

//   // 2. Validate new password length
//   if (newPassword.length < 6) {
//     alert("New password must be at least 6 characters.");
//     return;
//   }

//   // 3. Check new password and confirm password match
//   if (newPassword !== confirmPassword) {
//     alert("New passwords do not match.");
//     return;
//   }

//   // 4. Update password
//   foundUser.password = newPassword;

//   // Update users array
//   const updatedUsers = users.map((user) =>
//     user.email === foundUser.email ? foundUser : user
//   );

//   // Update localStorage
//   localStorage.setItem("users", JSON.stringify(updatedUsers));
//   localStorage.setItem("active_user", JSON.stringify(foundUser));

//   alert("Password updated successfully.");

//   // Clear the form
//   passwordForm.reset();
// }

// );

// Clear Button Logic
const clearBtn = passwordForm.querySelector(".btn.clear");
clearBtn.addEventListener("click", function () {
  passwordForm.reset();
});

// if (!password) {
//   showError("password", "Password is required");
//   valid = false;
// } else if (password.length < 9) {
//   showError("password", "Password must be at least 8 characters");
//   valid = false;
// }

// if (!field) {
//   showError("password", "Password is required");
//   valid = false;
// } else if (password.length < 8) {
//   showError("password", "Password must be at least 8 characters");
//   valid = false;
// }
