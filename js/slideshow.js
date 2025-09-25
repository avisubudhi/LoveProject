const slides = [
  // { image: "images/image1.jpeg", text: "Our first memory together ❤️" },
  // { image: "images/image2.jpeg", text: "That smile makes my day 😊" },
  // { image: "images/image3.jpeg", text: "Forever my adventure partner 🌍" },
  // { image: "images/image4.jpeg", text: "Cuteness overload 💕" },
  // { image: "images/image5.jpeg", text: "To endless moments together ✨" }
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1C049k5kcf4zBduu0m9fapzqBhn1zB9pi" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=14YiLLonqtZ5yQu6emurYOrp-tmN9uJez" },
  { type: "video", src: "https://drive.google.com/uc?export=download&id=1hOg2jhHQCXX5WF2amSfn8XxKgQRRIi_Z" },
  { type: "video", src: "https://drive.google.com/uc?export=download&id=11izrM0HQFaOqW07XbQF9SnL5RNvgRQMo" }
];

let currentSlide = 0;
let autoplayInterval;
let container, textDiv, imgDivs = [];

function createSlides() {
  container = document.getElementById("slideshow");
  textDiv = document.getElementById("slideshow-text");

  slides.forEach((slide, i) => {
    const div = document.createElement("div");
    div.className = "slideshow-image";
    div.style.backgroundImage = `url('${slide.image}')`;
    container.appendChild(div);
    imgDivs.push(div);
  });
}

function showSlide(index, direction = 1) {
  imgDivs.forEach(div => div.className = "slideshow-image");

  let prevSlide = currentSlide;
  currentSlide = (index + slides.length) % slides.length;

  if (direction === 1) {
    imgDivs[prevSlide].classList.add("exit-left");
  } else {
    imgDivs[prevSlide].classList.add("exit-right");
  }

  imgDivs[currentSlide].classList.add("active");
  textDiv.textContent = slides[currentSlide].text;

  updateDots();
}

function changeSlide(n) {
  showSlide(currentSlide + n, n);
}

function setupDots() {
  const dotsContainer = document.getElementById("dots");
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.addEventListener("click", () => showSlide(i, i > currentSlide ? 1 : -1));
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = document.getElementsByClassName("dot");
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active-dot");
  }
  dots[currentSlide].classList.add("active-dot");
}

function startAutoplay() {
  autoplayInterval = setInterval(() => changeSlide(1), 4000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

window.onload = () => {
  createSlides();
  setupDots();
  showSlide(0);

  startAutoplay();

  // Swipe support for touch
  let startX = 0;
  container.addEventListener("touchstart", e => {
    stopAutoplay();
    startX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) changeSlide(-1); // swipe right
    else if (startX - endX > 50) changeSlide(1); // swipe left
    startAutoplay();
  });
};
