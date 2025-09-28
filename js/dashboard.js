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

  alert("updated successfully");
}
let form = document.getElementById("form");
form.addEventListener("submit", profile);
