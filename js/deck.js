// 🔀 Shuffle helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 📂 Media files (converted to direct links)
const files = shuffle([
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1_h1CQii6k7s2ZJkyb0muXryNaubJg6lJ" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1VpG8z5Bp6bZxQvgaJ44AeV9QI4hviGrl" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1EE-XEGw72VOoc9eB2D4zNEPm7ruBfEh-" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1mPn1xdPOVmTjzjjRBwjgSadXI4_in1NZ" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1js3MM6ZQjZ_wlzJ3pk6pHfSaYCLvT8iT" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1qdf-u2F_lT-LMpg7unS6Nr6a29WlXqnU" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1dP6Lv1bzTTQxUJh_V4BumyYfVJemupkc" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1yzDKAREI_e4D5E_--h6Mtlo7ACCBmotl" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1wHplm7-QJFyfC4-048xCX8pPJ8XxHLXz" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1997m4hT36xImxhX0uzjeiKult2RZL3l8" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1a5OOEVkmHnkrMhxxdRn3Tb4yfFSqoNJG" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1KRSrZT3Z3ByEAAuMgCA_FDgFGWfZaaQk" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=16d1KqcKyMgsnzgpV_UyH5K_nsDhooju2" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1083KsDR2x99eSf_C09NuyTyOuP_0aFxD" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1TP6eMMZnJTcRWnvobMVw_WZqnMyT7yKa" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1dPN7KT8xliUFf_jWx3_XMrp1-x-pSi_E" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1E713zJDJJx-z9NiCFGbnt1K6bBWUSaK-" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1N980Krrl-mZVVD_U77cyFklufXG_RXap" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1m5J2ekgBiVyLjwFkmq9dlTkES7w9u9AV" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1PtPboeon8yhCojlkCtWDXczVUUkF8KFb" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=15w9oDyKCtDwOo5g5276zAHgIQQGQ29kJ" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1YpCZyW50o0JIMeWgYpXkmoDI2yO53rTY" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1mV-XqQ0lm604c_9IFOCYNpfdqccHXSs-" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=16P42XWEGEEft_XT0feliSACpJv3VTWAn" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1X__ypXd7rLXQmWQGnHLg67GPMqiX4S5E" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=13aLSQbZIqv2R4r8yJHpg5gETuqdFxdvQ" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=1C049k5kcf4zBduu0m9fapzqBhn1zB9pi" },
  { type: "image", src: "https://drive.google.com/uc?export=download&id=14YiLLonqtZ5yQu6emurYOrp-tmN9uJez" },
  { type: "video", src: "https://drive.google.com/uc?export=download&id=1hOg2jhHQCXX5WF2amSfn8XxKgQRRIi_Z" },
  { type: "video", src: "https://drive.google.com/uc?export=download&id=11izrM0HQFaOqW07XbQF9SnL5RNvgRQMo" },
  { type: "video", src: "https://drive.google.com/uc?export=download&id=1ATrHHzTHVndBGBw1BR67s6kaumcjdpUH" },
  { type: "video", src: "https://drive.google.com/uc?export=download&id=1ZAC0QiPMcxRGK-ycXJA1ByZ5iiLClCld" },
  { type: "video", src: "https://drive.google.com/uc?export=download&id=1VxC2uy6ukrtG5zU3KazPOHGuUJy0FQNW" },
  { type: "video", src: "https://drive.google.com/uc?export=download&id=1uWUpjKGJPcrOHk7O0nVhKzTims5iZYog" },
  { type: "video", src: "https://drive.google.com/uc?export=download&id=1jlYWIQ0lxYABquANOEHUV4AGBePTrQix" },
  { type: "video", src: "https://drive.google.com/uc?export=download&id=1OVAvBaegL_0a18ubpakv37sSsTPdudXM" }
]);

// 🎭 Build cards
const container = document.querySelector(".deck");

files.forEach(file => {
  const card = document.createElement("div");
  card.className = "card";

  if (file.type === "image") {
    const img = document.createElement("img");
    img.src = file.src;
    card.appendChild(img);
  } else if (file.type === "video") {
    const vid = document.createElement("video");
    vid.src = file.src;
    vid.loop = true;
    vid.muted = true;
    card.appendChild(vid);
  }

  card.addEventListener("click", () => {
    document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    const video = card.querySelector("video");
    if (video) {
      video.play();
    }
  });

  container.appendChild(card);
});
