const files = [
  { type: "image", src: "https://picsum.photos/400/300?random=1" },
  { type: "image", src: "https://picsum.photos/400/300?random=2" },
  { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { type: "image", src: "https://picsum.photos/400/300?random=3" },
  { type: "video", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" }
];

const deck = document.getElementById("deck");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const music = document.getElementById("bg-music");

let cards = [];

function createDeck() {
  files.forEach((file, i) => {
    const card = document.createElement("div");
    card.className = "card";

    if (file.type === "image") {
      const img = document.createElement("img");
      img.src = file.src;
      card.appendChild(img);
    } else if (file.type === "video") {
      const video = document.createElement("video");
      video.src = file.src;
      video.muted = true;
      video.loop = true;
      video.play();
      card.appendChild(video);
    }

    card.style.top = `${Math.random() * 60 + 20}%`;
    card.style.left = `${Math.random() * 60 + 20}%`;
    card.style.transform = `rotate(${(Math.random() - 0.5) * 30}deg)`;

    card.addEventListener("click", () => openModal(file));

    deck.appendChild(card);
    cards.push(card);
  });
}

// follow mouse to shift deck
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;

  cards.forEach((card, i) => {
    card.style.transform = `translate(${x}px, ${y}px) rotate(${(i - cards.length/2) * 5}deg)`;
  });
});

// modal view
function openModal(file) {
  modal.style.display = "flex";
  modalContent.innerHTML = "";

  if (file.type === "image") {
    const img = document.createElement("img");
    img.src = file.src;
    modalContent.appendChild(img);
  } else if (file.type === "video") {
    const video = document.createElement("video");
    video.src = file.src;
    video.controls = true;
    video.autoplay = true;
    modalContent.appendChild(video);
  }

  // start music on first click
  if (music.paused) {
    music.play().catch(()=>{});
  }
}

function closeModal() {
  modal.style.display = "none";
  modalContent.innerHTML = "";
}

createDeck();
