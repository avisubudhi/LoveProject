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

  function driveVideoPreviewSrc(fileId, { autoplay = false } = {}) {
    // Use Drive preview iframe; can request autoplay & mute
    const base = `https://drive.google.com/file/d/${fileId}/preview`;
    return autoplay ? `${base}?autoplay=1&mute=1` : base;
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
      if (id) items.push({ type: "video", src: driveVideoPreviewSrc(id, { autoplay: true }) });
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
  let mode = "free"; // "free" | "stack"
  let hoveredCard = null;

  // stack state
  let pointerActive = false;
  let stackCenterX = 0;
  let stackCenterY = 0;
  let stackIndex = 0; // float index into cards
  let stackBaseIndex = 0;
  let lastPointerX = 0;
  let lastPointerY = 0;
  const STACK_SPACING_Y = 70;   // vertical distance between stacked cards (px)
  const STACK_SPACING_X = 18;   // slight horizontal offset (px)
  const STACK_SCALE_FOCUS = 1.1;

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
        // Use Drive preview iframe with autoplay in-card
        const iframe = document.createElement("iframe");
        iframe.src = file.src; // already includes autoplay=1&mute=1
        iframe.allow = "autoplay; encrypted-media";
        iframe.allowFullscreen = true;
        iframe.frameBorder = "0";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        card.appendChild(iframe);
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

      // Click opens modal (both image and video)
      card.addEventListener("click", (e) => {
        if (mode === "stack") return; // click is handled on release in stack mode
        e.preventDefault();
        e.stopPropagation();
        openModal({ type: file.type, src: file.src });
      });

      deck.appendChild(card);
      cards.push(card);
    });
  }

  // --- STACK MODE LAYOUT ---
  function layoutStack() {
    const deckRect = deck.getBoundingClientRect();
    const centerX = stackCenterX - deckRect.left;
    const centerY = stackCenterY - deckRect.top;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const rect = card.getBoundingClientRect();
      const midX = rect.left - deckRect.left + rect.width / 2;
      const midY = rect.top - deckRect.top + rect.height / 2;

      const offset = i - stackIndex; // float; 0 means focused
      const spreadX = STACK_SPACING_X * offset;
      const spreadY = STACK_SPACING_Y * offset;

      const dx = centerX - midX + spreadX;
      const dy = centerY - midY + spreadY;

      const scale = i === Math.round(stackIndex) ? STACK_SCALE_FOCUS : 1.0;
      const rotate = 0;

      card.style.zIndex = String(1000 - Math.abs(Math.round(offset)));
      card.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scale}) rotate(${rotate}deg)`;
    }
  }

  function resetToFreeLayout() {
    for (const card of cards) {
      const baseRotate = parseFloat(card.dataset.baseRotate || "0");
      card.style.transform = `rotate(${baseRotate}deg)`;
      card.style.zIndex = "1";
    }
  }

  // --- POINTER EVENTS (mouse + touch unified) ---
  deck.addEventListener("pointerdown", (e) => {
    pointerActive = true;
    mode = "stack";
    deck.setPointerCapture(e.pointerId);

    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    stackCenterX = e.clientX;
    stackCenterY = e.clientY;

    // pick nearest card to pointer as starting focus
    const nearestIndex = findNearestCardIndex(e.clientX, e.clientY);
    stackIndex = nearestIndex;
    stackBaseIndex = nearestIndex;

    layoutStack();
  }, { passive: false });

  deck.addEventListener("pointermove", (e) => {
    if (!pointerActive || mode !== "stack") return;

    const dx = e.clientX - lastPointerX;
    const dy = e.clientY - lastPointerY;

    // move stack center with pointer
    stackCenterX += dx;
    stackCenterY += dy;

    // vertical movement changes focused index
    stackIndex -= dy / STACK_SPACING_Y; // dragging up (negative dy) moves to next cards
    stackIndex = Math.max(0, Math.min(cards.length - 1, stackIndex));

    lastPointerX = e.clientX;
    lastPointerY = e.clientY;

    layoutStack();
  }, { passive: false });

  deck.addEventListener("pointerup", () => {
    if (!pointerActive) return;
    pointerActive = false;

    // Snap to nearest and open
    const focus = Math.round(stackIndex);
    const card = cards[focus];
    if (card) {
      openModal({ type: card.dataset.fileType, src: card.dataset.fileSrc });
    }

    mode = "free";
    resetToFreeLayout();
  });

  deck.addEventListener("pointercancel", () => {
    if (!pointerActive) return;
    pointerActive = false;
    mode = "free";
    resetToFreeLayout();
  });

  function findNearestCardIndex(clientX, clientY) {
    const deckRect = deck.getBoundingClientRect();
    let nearest = 0;
    let best = Infinity;
    cards.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const d = Math.hypot(cx - clientX, cy - clientY);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    return nearest;
  }

  // --- PARALLAX when not in stack mode ---
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener("mousemove", (e) => {
    if (!cards.length || mode !== "free") return;
    targetX = (e.clientX / window.innerWidth - 0.5) * 30;
    targetY = (e.clientY / window.innerHeight - 0.5) * 30;
  });

  function animateParallax() {
    if (mode === "free" && cards.length) {
      mouseX += (targetX - mouseX) * 0.1;
      mouseY += (targetY - mouseY) * 0.1;

      cards.forEach((card) => {
        const base = parseFloat(card.dataset.baseRotate || "0");
        card.style.transform = `translate(${mouseX}px, ${mouseY}px) rotate(${base}deg)`;
      });
    }
    requestAnimationFrame(animateParallax);
  }
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
      // Ensure autoplay in modal as well
      iframe.src = file.src.includes("autoplay=1")
        ? file.src
        : `${file.src}${file.src.includes("?") ? "&" : "?"}autoplay=1&mute=1`;
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

  // init
  createDeck();
})();
