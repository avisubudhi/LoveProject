// --- helpers ---
function extractDriveId(input) {
  if (!input) return null;
  // Handle full share links like https://drive.google.com/file/d/ID/view?...
  const match = input.match(/\/d\/([^/]+)/);
  if (match && match[1]) return match[1];

  // If a raw ID was provided already
  if (/^[A-Za-z0-9_-]+$/.test(input)) return input;

  // Sometimes uc?export or other formats
  const url = new URL(input, window.location.href);
  const id = url.searchParams.get("id");
  if (id) return id;

  return null;
}

function driveImageSrc(fileId, maxWidth = 2000) {
  // Thumbnail endpoint is the most reliable for <img>
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${maxWidth}`;
  // Alternative (often works too):
  // return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

function driveVideoPreviewSrc(fileId) {
  // Must be used in <iframe>, not <video>
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

// If you keep your original arrays of share links:
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
  "https://drive.google.com/file/d/1hOg2jhHQCXX5WF2amSfn8XxKgQRRIi_Z/view?usp=drive_link",
  "https://drive.google.com/file/d/11izrM0HQFaOqW07XbQF9SnL5RNvgRQMo/view?usp=drive_link",
  "https://drive.google.com/file/d/1ATrHHzTHVndBGBw1BR67s6kaumcjdpUH/view?usp=drive_link",
  "https://drive.google.com/file/d/1ZAC0QiPMcxRGK-ycXJA1ByZ5iiLClCld/view?usp=drive_link",
  "https://drive.google.com/file/d/1VxC2uy6ukrtG5zU3KazPOHGuUJy0FQNW/view?usp=drive_link",
  "https://drive.google.com/file/d/1uWUpjKGJPcrOHk7O0nVhKzTims5iZYog/view?usp=drive_link",
  "https://drive.google.com/file/d/1jlYWIQ0lxYABquANOEHUV4AGBePTrQix/view?usp=drive_link",
  "https://drive.google.com/file/d/1OVAvBaegL_0a18ubpakv37sSsTPdudXM/view?usp=drive_link"
];

// Build normalized files array
function buildFiles() {
  const items = [];

  imageShareLinks.forEach(link => {
    const id = extractDriveId(link);
    if (id) {
      items.push({ type: "image", src: driveImageSrc(id) });
    }
  });

  videoShareLinks.forEach(link => {
    const id = extractDriveId(link);
    if (id) {
      items.push({ type: "video", src: driveVideoPreviewSrc(id) });
    }
  });

  return shuffle(items);
}

// --- use the normalized files to render cards ---
const files = buildFiles();
const container = document.querySelector(".deck");
files.forEach(file => {
  const card = document.createElement("div");
  card.className = "card";

  if (file.type === "image") {
    const img = document.createElement("img");
    img.src = file.src;
    img.loading = "lazy";
    img.referrerPolicy = "no-referrer";
    card.appendChild(img);
  } else if (file.type === "video") {
    // Use Drive preview in an iframe
    const iframe = document.createElement("iframe");
    iframe.src = file.src;
    iframe.allow = "autoplay; encrypted-media";
    iframe.allowFullscreen = true;
    iframe.frameBorder = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    card.appendChild(iframe);
  }

  container.appendChild(card);
});
