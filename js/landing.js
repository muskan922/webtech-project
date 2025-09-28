document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".hj");
  const slides = document.querySelectorAll(".mode");
  const prevBtn = document.querySelector(".lk.prev");
  const nextBtn = document.querySelector(".lk.next");
  const dots = document.querySelectorAll(".dot");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateSlider();
    });
  });

  // Auto Slide every 4s
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }, 4000);

  updateSlider();
});
const login = document.getElementById("log");
login.addEventListener(
  "click",
  () => (window.location.href = "../html/signin.html")
);

const signup = document.getElementById("sign");
signup.addEventListener(
  "click",
  () => (window.location.href = "../html/signup.html")
);

const dash = document.getElementById("op");
dash.addEventListener(
  "click",
  () => (window.location.href = "../html/signin.html")
);

const started = document.getElementById("help");
started.addEventListener(
  "click",
  () => (window.location.href = "../html/signup.html")
);
