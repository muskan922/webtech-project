function signin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email) {
    alert("Email is required");
  } else if (!/^[^\s@]+@gmail\.com$/.test(email)) {
    alert(" Only Gmail address allowed (@ gmail.com)");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const validuser = users.find(
    (jh) => jh.email === email && jh.password === password
  );

  if (validuser) {
    alert("signin successfully");
    localStorage.setItem("active_user", JSON.stringify(validuser));
    window.location.href = "dashboard.html";
  } else {
    alert("email and password not match");
  }
}
const read = document.getElementById("too");
read.addEventListener("submit", signin);

const forg = document.getElementById("forget");
const accon = document.getElementById("Create_acc");

forg.addEventListener(
  "click",
  () => (window.location.href = "../html/signup.html")
);
accon.addEventListener(
  "click",
  () => (window.location.href = "../html/signup.html")
);
