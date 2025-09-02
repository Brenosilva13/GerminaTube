const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPauseBtn").querySelector("img");
const audioBtn = document.getElementById("audioBtn").querySelector("img");

// ▶️ / ⏸️ play & pause
document.getElementById("playPauseBtn").addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseBtn.src = "./images/pause.png";
  } else {
    video.pause();
    playPauseBtn.src = "./images/play.png";
  }
});

// 🔇 / 🔊 mute & unmute
document.getElementById("audioBtn").addEventListener("click", () => {
  video.muted = !video.muted;
  audioBtn.src = video.muted ? "./images/mute.png" : "./images/audio.png";
});

// ⛶ fullscreen
document.getElementById("fullscreenBtn").addEventListener("click", () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
});

// 🎬 Miniaturas (hover + click invertendo com principal)
const videoCards = document.querySelectorAll(".video-card");

videoCards.forEach((card) => {
  const capaVideo = card.querySelector(".capaVideo");

  // Hover → reproduz a capaVideonail
  capaVideo.addEventListener("mouseenter", () => {
    capaVideo.play();
  });

  // Sai do hover → pausa e volta pro poster
  capaVideo.addEventListener("mouseleave", () => {
    capaVideo.pause();
    capaVideo.currentTime = 0;
    capaVideo.load();
  });

  // Clique no card inteiro → troca com principal
  card.addEventListener("click", () => {
    const mainSrc = video.getAttribute("src");
    const capaVideoSrc = capaVideo.getAttribute("src");

    // troca os vídeos
    video.setAttribute("src", capaVideoSrc);
    capaVideo.setAttribute("src", mainSrc);

    // resetar capaVideonail para mostrar capa novamente
    capaVideo.pause();
    capaVideo.currentTime = 0;

    // tocar o vídeo principal
    video.play();
    playPauseBtn.src = "./images/pause.png";
  });
});
