// Wrap to avoid global leaks and ensure order
(function () {
  // --- extract Google Drive file id ---
  function extractDriveId(input) {
    if (!input) return null;
    const match = String(input).match(/\/d\/([^/]+)(?:\/|$)/);
    if (match && match[1]) return match[1];
    try {
      const u = new URL(String(input), window.location.href);
      const id = u.searchParams.get("id");
      if (id) return id;
    } catch (e) {}
    if (/^[A-Za-z0-9_-]{10,}$/.test(String(input))) return String(input);
    return null;
  }

  // --- build Drive-safe URLs ---
  function driveImageSrc(fileId, maxWidth = 2000) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${maxWidth}`;
  }

  function driveVideoPreviewSrc(fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  // --- your links (share links are OK) ---
  const imageShareLinks = [
    "https://drive.google.com/file/d/1_h1CQii6k7s2ZJkyb0muXryNaubJg6lJ/view?usp=sharing",
    "https://drive.google.com/file/d/1VpG8z5Bp6bZxQvgaJ44AeV9QI4hviGrl/view?usp=drive_link",
    "https://drive.google.com/file/d/1EE-XEGw72VOoc9eB2D4zNEPm7ruBfEh-/view?usp=drive_link",
    "https://drive.google.com/file/d/1mPn1xdPOVmTjzjjRBwjgSadXI4_in1NZ/view?usp=drive_link",
    "https://drive.google.com/file/d/1js3MM6ZQjZ_wlzJ3pk6pHfSaYCLvT8iT/view?usp=drive_link",
    "https://drive.google.com/file/d/1qdf-u2F_lT-LMpg7unS6Nr6a29WlXqnU/view?usp=drive_link",
    "https://drive.google.com/file/d/1dP6Lv1bzTTQxUJh_V4BumyYfVJemupkc/view?usp=drive_link",
    "https://drive.google.com/file/d/1yzDKAREI_e4D5E_--h6Mtlo7ACCBmotl/view?usp=drive_link",
    "https://drive.google.com/file/d/1wHplm7-QJFyfC4-048xCX8pPJ8XxHLXz/view?usp=drive_link",
    "https://drive.google.com/file/d/1997m4hT36xImxhX0uzjeiKult2RZL3l8/view?usp=drive_link",
    "https://drive.google.com/file/d/1a5OOEVkmHnkrMhxxdRn3Tb4yfFSqoNJG/view?usp=drive_link",
    "https://drive.google.com/file/d/1KRSrZT3Z3ByEAAuMgCA_FDgFGWfZaaQk/view?usp=drive_link",
    "https://drive.google.com/file/d/16d1KqcKyMgsnzgpV_UyH5K_nsDhooju2/view?usp=drive_link",
    "https://drive.google.com/file/d/1083KsDR2x99eSf_C09NuyTyOuP_0aFxD/view?usp=drive_link",
    "https://drive.google.com/file/d/1TP6eMMZnJTcRWnvobMVw_WZqnMyT7yKa/view?usp=drive_link",
    "https://drive.google.com/file/d/1dPN7KT8xliUFf_jWx3_XMrp1-x-pSi_E/view?usp=drive_link",
    "https://drive.google.com/file/d/1E713zJDJJx-z9NiCFGbnt1K6bBWUSaK-/view?usp=drive_link",
    "https://drive.google.com/file/d/1N980Krrl-mZVVD_U77cyFklufXG_RXap/view?usp=drive_link",
    "https://drive.google.com/file/d/1m5J2ekgBiVyLjwFkmq9dlTkES7w9u9AV/view?usp=drive_link",
    "https://drive.google.com/file/d/1PtPboeon8yhCojlkCtWDXczVUUkF8KFb/view?usp=drive_link",
    "https://drive.google.com/file/d/15w9oDyKCtDwOo5g5276zAHgIQQGQ29kJ/view?usp=drive_link",
    "https://drive.google.com/file/d/1YpCZyW50o0JIMeWgYpXkmoDI2yO53rTY/view?usp=drive_link",
    "https://drive.google.com/file/d/1mV-XqQ0lm604c_9IFOCYNpfdqccHXSs-/view?usp=drive_link",
    "https://drive.google.com/file/d/16P42XWEGEEft_XT0feliSACpJv3VTWAn/view?usp=drive_link",
    "https://drive.google.com/file/d/1X__ypXd7rLXQmWQGnHLg67GPMqiX4S5E/view?usp=drive_link",
    "https://drive.google.com/file/d/13aLSQbZIqv2R4r8yJHpg5gETuqdFxdvQ/view?usp=drive_link",
    "https://drive.google.com/file/d/1C049k5kcf4zBduu0m9fapzqBhn1zB9pi/view?usp=drive_link",
    "https://drive.google.com/file/d/14YiLLonqtZ5yQu6emurYOrp-tmN9uJez/view?usp=sharing"
  ];

  const videoShareLinks = [
    "https://drive.google.com/file/d/1dx1gT7dlKTuuzvziVg1wg_4N_mqCLD4a/view?usp=drive_link",
    "https://drive.google.com/file/d/11izrM0HQFaOqW07XbQF9SnL5RNvgRQMo/view?usp=drive_link",
    "https://drive.google.com/file/d/1ATrHHzTHVndBGBw1BR67s6kaumcjdpUH/view?usp=drive_link",
    "https://drive.google.com/file/d/1ZAC0QiPMcxRGK-ycXJA1ByZ5iiLClCld/view?usp=drive_link",
    "https://drive.google.com/file/d/1VxC2uy6ukrtG5zU3KazPOHGuUJy0FQNW/view?usp=drive_link",
    "https://drive.google.com/file/d/1uWUpjKGJPcrOHk7O0nVhKzTims5iZYog/view?usp=drive_link",
    "https://drive.google.com/file/d/1jlYWIQ0lxYABquANOEHUV4AGBePTrQix/view?usp=drive_link",
    "https://drive.google.com/file/d/1OVAvBaegL_0a18ubpakv37sSsTPdudXM/view?usp=drive_link"
  ];

  // --- normalize into files[] (no shuffle function used) ---
  function buildFiles() {
    const items = [];

    imageShareLinks.forEach((link) => {
      const id = extractDriveId(link);
      if (id) items.push({ type: "image", src: driveImageSrc(id) });
    });

    videoShareLinks.forEach((link) => {
      const id = extractDriveId(link);
      if (id) items.push({ type: "video", src: driveVideoPreviewSrc(id) });
    });

    // Randomize order without external shuffle
    items.sort(() => Math.random() - 0.5);
    return items;
  }

  // --- DOM refs ---
  const deck = document.getElementById("deck") || document.querySelector(".deck");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  let cards = [];
  let isSpreading = false;
  let hoveredCard = null;
  let animationFrame = null;

  // --- create scattered deck ---
  function createDeck() {
    const files = buildFiles();
    console.log("Built files:", files.length);

    if (!files.length) {
      const msg = document.createElement("div");
      msg.style.color = "#fff";
      msg.textContent = "No items resolved. Check Drive sharing and links.";
      deck.appendChild(msg);
      return;
    }

    files.forEach((file, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.index = index;

      if (file.type === "image") {
        const img = document.createElement("img");
        img.src = file.src;
        img.loading = "lazy";
        img.referrerPolicy = "no-referrer";
        img.onerror = () => console.warn("Image failed:", img.src);
        card.appendChild(img);
      } else if (file.type === "video") {
        // Use video element for autoplay instead of iframe
        const video = document.createElement("video");
        video.src = file.src.replace('/preview', ''); // Remove preview for direct video
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        video.playsInline = true;
        video.controls = false;
        video.style.width = "100%";
        video.style.height = "100%";
        video.style.objectFit = "cover";
        
        // Try to play the video
        video.play().catch(() => {
          // If autoplay fails, fallback to iframe
          const iframe = document.createElement("iframe");
          iframe.src = file.src;
          iframe.allow = "autoplay; encrypted-media";
          iframe.allowFullscreen = true;
          iframe.frameBorder = "0";
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          card.replaceChild(iframe, video);
        });
        
        card.appendChild(video);
      }

      const topPct = Math.random() * 60 + 20;
      const leftPct = Math.random() * 60 + 20;
      const rotateDeg = (Math.random() - 0.5) * 30;

      card.style.top = `${topPct}%`;
      card.style.left = `${leftPct}%`;
      card.style.transform = `rotate(${rotateDeg}deg)`;
      card.dataset.baseRotate = String(rotateDeg);
      card.dataset.baseTop = String(topPct);
      card.dataset.baseLeft = String(leftPct);

      // Store file data for modal
      card.dataset.fileType = file.type;
      card.dataset.fileSrc = file.src;

      // Add hover/touch interactions with throttling
      let hoverTimeout;
      card.addEventListener("mouseenter", () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => handleCardHover(card, true), 50);
      });
      
      card.addEventListener("mouseleave", () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => handleCardHover(card, false), 100);
      });
      
      card.addEventListener("touchstart", (e) => handleCardTouch(card, e), { passive: true });
      card.addEventListener("click", (e) => handleCardClick(card, e));

      deck.appendChild(card);
      cards.push(card);
    });
  }

  // --- handle card hover/touch ---
  function handleCardHover(card, isEntering) {
    if (isEntering) {
      hoveredCard = card;
      spreadCards(card);
    } else {
      hoveredCard = null;
      resetCards();
    }
  }

  function handleCardTouch(card, e) {
    e.preventDefault();
    if (hoveredCard === card) {
      hoveredCard = null;
      resetCards();
    } else {
      hoveredCard = card;
      spreadCards(card);
    }
  }

  function handleCardClick(card, e) {
    e.preventDefault();
    e.stopPropagation();
    
    const fileType = card.dataset.fileType;
    const fileSrc = card.dataset.fileSrc;
    
    // Auto-open videos in modal
    openModal({ type: fileType, src: fileSrc });
  }

  // --- smooth spread cards animation ---
  function spreadCards(centerCard) {
    if (isSpreading) return;
    isSpreading = true;

    const centerIndex = parseInt(centerCard.dataset.index);
    const centerRect = centerCard.getBoundingClientRect();
    const centerX = centerRect.left + centerRect.width / 2;
    const centerY = centerRect.top + centerRect.height / 2;

    // Use requestAnimationFrame for smooth animation
    function animateSpread() {
      cards.forEach((card, index) => {
        if (card === centerCard) {
          card.style.zIndex = "100";
          card.style.transform += " scale(1.05)";
          return;
        }

        const cardRect = card.getBoundingClientRect();
        const cardX = cardRect.left + cardRect.width / 2;
        const cardY = cardRect.top + cardRect.height / 2;

        const dx = cardX - centerX;
        const dy = cardY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const spreadFactor = Math.min(distance / 300, 1.5);
        const angle = Math.atan2(dy, dx);
        
        const spreadX = Math.cos(angle) * spreadFactor * 40;
        const spreadY = Math.sin(angle) * spreadFactor * 40;

        const baseRotate = parseFloat(card.dataset.baseRotate || "0");
        const baseTop = parseFloat(card.dataset.baseTop || "50");
        const baseLeft = parseFloat(card.dataset.baseLeft || "50");

        card.style.top = `${baseTop + spreadY / 15}%`;
        card.style.left = `${baseLeft + spreadX / 15}%`;
        card.style.transform = `translate(${spreadX}px, ${spreadY}px) rotate(${baseRotate + spreadFactor * 5}deg)`;
        card.style.zIndex = "10";
      });
    }

    animateSpread();
  }

  // --- smooth reset cards animation ---
  function resetCards() {
    if (!isSpreading) return;
    isSpreading = false;

    // Use requestAnimationFrame for smooth reset
    function animateReset() {
      cards.forEach((card) => {
        const baseRotate = parseFloat(card.dataset.baseRotate || "0");
        const baseTop = parseFloat(card.dataset.baseTop || "50");
        const baseLeft = parseFloat(card.dataset.baseLeft || "50");

        card.style.top = `${baseTop}%`;
        card.style.left = `${baseLeft}%`;
        card.style.transform = `rotate(${baseRotate}deg)`;
        card.style.zIndex = "1";
      });
    }

    animateReset();
  }

  // --- smooth parallax follow mouse ---
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener("mousemove", (e) => {
    if (!cards.length || isSpreading) return;
    
    targetX = (e.clientX / window.innerWidth - 0.5) * 30;
    targetY = (e.clientY / window.innerHeight - 0.5) * 30;
  });

  // Smooth parallax animation loop
  function animateParallax() {
    if (!isSpreading && cards.length) {
      mouseX += (targetX - mouseX) * 0.1;
      mouseY += (targetY - mouseY) * 0.1;

      cards.forEach((card) => {
        const base = parseFloat(card.dataset.baseRotate || "0");
        card.style.transform = `translate(${mouseX}px, ${mouseY}px) rotate(${base}deg)`;
      });
    }
    
    animationFrame = requestAnimationFrame(animateParallax);
  }

  // Start animation loop
  animateParallax();

  // --- modal ---
  function openModal(file) {
    if (!modal || !modalContent) return;

    modalContent.innerHTML = "";

    if (file.type === "image") {
      const img = document.createElement("img");
      img.src = file.src;
      img.referrerPolicy = "no-referrer";
      modalContent.appendChild(img);
    } else if (file.type === "video") {
      const iframe = document.createElement("iframe");
      iframe.src = file.src;
      iframe.allow = "autoplay; encrypted-media";
      iframe.allowFullscreen = true;
      iframe.frameBorder = "0";
      iframe.style.width = "100%";
      iframe.style.height = "70vh";
      modalContent.appendChild(iframe);
    }

    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!modal || !modalContent) return;
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modalContent.innerHTML = "";
  }

  window.closeModal = closeModal;

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });

  // init
  createDeck();
})();
