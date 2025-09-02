const video = document.getElementById("video");

const playPauseBtn = document.getElementById("playPauseBtn");
const audioBtn = document.getElementById("audioBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");

// ▶️ / ⏸️ play & pause
playPauseBtn.addEventListener("click", () => {
  const img = playPauseBtn.querySelector("img");

  if (video.paused) {
    video.play();
    img.src = "./images/pause.png";
    img.alt = "Pause";
  } else {
    video.pause();
    img.src = "./images/play.png";
    img.alt = "Play";
  }
});

// 🔇 / 🔊 mute & unmute
audioBtn.addEventListener("click", () => {
  const img = audioBtn.querySelector("img");

  video.muted = !video.muted;
  if (video.muted) {
    img.src = "./images/mute.png";
    img.alt = "Mudo";
  } else {
    img.src = "./images/audio.png";
    img.alt = "Áudio";
  }
});

// ⛶ fullscreen (entra e sai)
fullscreenBtn.addEventListener("click", () => {
  const img = fullscreenBtn.querySelector("img");

  if (!document.fullscreenElement) {
    video.requestFullscreen();
    img.src = "./images/minimize.png";
    img.alt = "Restaurar";
  } else {
    document.exitFullscreen();
    img.src = "./images/maximize.png";
    img.alt = "Tela cheia";
  }
});

// 🎬 Miniaturas (hover + click invertendo com principal)
const videoCards = document.querySelectorAll(".video-card");

videoCards.forEach((card) => {
  const capaVideo = card.querySelector(".capaVideo");

  // Hover → prévia
  capaVideo.addEventListener("mouseenter", () => {
    capaVideo.play();
  });

  // Sai do hover → volta pro poster
  capaVideo.addEventListener("mouseleave", () => {
    capaVideo.pause();
    capaVideo.currentTime = 0;
    capaVideo.load(); // garante que o poster reaparece
  });

  // Clique no card → troca com principal
  card.addEventListener("click", () => {
    const mainSrc = video.getAttribute("src");
    const capaVideoSrc = capaVideo.getAttribute("src");

    // troca os vídeos
    video.setAttribute("src", capaVideoSrc);
    capaVideo.setAttribute("src", mainSrc);

    // resetar miniatura
    capaVideo.pause();
    capaVideo.currentTime = 0;
    capaVideo.load();

    // tocar principal atualizado
    video.play();
    playPauseBtn.querySelector("img").src = "./images/pause.png";
    playPauseBtn.querySelector("img").alt = "Pause";
  });
});
