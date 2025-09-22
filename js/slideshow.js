const slides = [
  { image: "images/photo1.jpg", text: "Our first memory together ❤️" },
  { image: "images/photo2.jpg", text: "This smile always makes my day 😊" },
  { image: "images/photo3.jpg", text: "Forever my favorite adventure partner 🌍" },
  { image: "images/photo4.jpg", text: "Cuteness overload 💕" },
  { image: "images/photo5.jpg", text: "Here's to endless moments together ✨" }
];

let currentSlide = 0;
let imgDiv, textDiv;

function showSlide(index) {
  const slide = slides[index];

  // Reset classes for fade animation
  imgDiv.classList.remove("show");
  textDiv.classList.remove("show");

  setTimeout(() => {
    imgDiv.style.backgroundImage = `url('${slide.image}')`;
    textDiv.textContent = slide.text;

    // Trigger fade-in
    imgDiv.classList.add("show");
    textDiv.classList.add("show");
  }, 200);

  // Update dots
  const dots = document.getElementsByClassName("dot");
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  dots[index].classList.add("active");
}

function changeSlide(n) {
  currentSlide = (currentSlide + n + slides.length) % slides.length;
  showSlide(currentSlide);
}

function setupDots() {
  const dotsContainer = document.getElementById("dots");
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.addEventListener("click", () => {
      currentSlide = i;
      showSlide(currentSlide);
    });
    dotsContainer.appendChild(dot);
  });
}

window.onload = () => {
  imgDiv = document.getElementById("slideshow-image");
  textDiv = document.getElementById("slideshow-text");

  setupDots();
  showSlide(currentSlide);

  // Optional auto-play
  // setInterval(() => changeSlide(1), 5000);
};
