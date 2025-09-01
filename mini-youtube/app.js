const video = document.getElementById("video");

const playPauseBtn = document.getElementById("playPauseBtn");
const audioBtn = document.getElementById("audioBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");

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

audioBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  const img = audioBtn.querySelector("img");
  if (video.muted) {
    img.src = "./images/mute.png";
    img.alt = "Mudo";
  } else {
    img.src = "./images/audio.png";
    img.alt = "Áudio";
  }
});

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
