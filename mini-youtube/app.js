const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPauseBtn");
const audioBtn = document.getElementById("audioBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const volumeControl = document.getElementById("volumeControl");
const progressBar = document.getElementById("progressBar");
const timeDisplay = document.getElementById("timeDisplay");

const videoTitle = document.getElementById("videoTitle");
const videoViews = document.getElementById("videoViews");
const videoDescription = document.getElementById("videoDescription");

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
  const img = audioBtn.querySelector("img");
  video.muted = !video.muted;
  if (video.muted) {
    img.src = "./images/mutar.png";
    img.alt = "Mudo";
  } else {
    img.src = "./images/audio.png";
    img.alt = "Áudio";
  }
});

volumeControl.addEventListener("input", () => {
  video.volume = volumeControl.value;
});

video.addEventListener("timeupdate", () => {
  progressBar.max = video.duration;
  progressBar.value = video.currentTime;
  let current = formatTime(video.currentTime);
  let total = formatTime(video.duration);
  timeDisplay.textContent = `${current} / ${total}`;
});

progressBar.addEventListener("input", () => {
  video.currentTime = progressBar.value;
});

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0"+sec : sec}`;
}

fullscreenBtn.addEventListener("click", () => {
  const img = fullscreenBtn.querySelector("img");
  if (!document.fullscreenElement) {
    video.requestFullscreen();
    img.src = "./images/minimizar.png";
    img.alt = "Restaurar";
  } else {
    document.exitFullscreen();
    img.src = "./images/maximizar.png";
    img.alt = "Tela cheia";
  }
});

const videoCards = document.querySelectorAll(".video-card");

function carregarVideo(src, poster, titulo, views, descricao) {
  video.setAttribute("src", src);
  video.setAttribute("poster", poster);
  video.play();
  playPauseBtn.querySelector("img").src = "./images/pause.png";
  playPauseBtn.querySelector("img").alt = "Pause";

  videoTitle.textContent = titulo;
  videoViews.textContent = views;
  videoDescription.textContent = descricao;
}

videoCards.forEach((card) => {
  const capaVideo = card.querySelector(".capaVideo");
  const videoSrc = card.getAttribute("data-src");
  const poster = card.getAttribute("data-poster");
  const id = card.getAttribute("data-id");

  const titulo = card.querySelector(".titulo").textContent;
  const views = card.querySelector(".canal").textContent;
  const descricao = card.getAttribute("data-descricao") || "Sem descrição disponível.";

  capaVideo.addEventListener("mouseenter", () => capaVideo.play());
  capaVideo.addEventListener("mouseleave", () => {
    capaVideo.pause();
    capaVideo.currentTime = 0;
    capaVideo.load();
  });

  card.addEventListener("click", () => {
    carregarVideo(videoSrc, poster, titulo, views, descricao);
    location.hash = `#/video/${id}`;
  });
});

window.addEventListener("hashchange", () => {
  const rota = location.hash;
  if (rota.startsWith("#/video/")) {
    const id = rota.split("/")[2];
    const card = document.querySelector(`.video-card[data-id="${id}"]`);
    if (card) {
      const src = card.getAttribute("data-src");
      const poster = card.getAttribute("data-poster");
      const titulo = card.querySelector(".titulo").textContent;
      const views = card.querySelector(".canal").textContent;
      const descricao = card.getAttribute("data-descricao") || "Sem descrição disponível.";
      carregarVideo(src, poster, titulo, views, descricao);
    }
  }
});

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

const comentariosLista = document.getElementById("comentariosLista");
const comentarioTexto = document.getElementById("comentarioTexto");
const enviarComentario = document.getElementById("enviarComentario");

let hideControlsTimeout;
video.addEventListener("mousemove", () => {
  document.querySelector(".video-principal").classList.remove("hide-controls");
  clearTimeout(hideControlsTimeout);
  hideControlsTimeout = setTimeout(() => {
    document.querySelector(".video-principal").classList.add("hide-controls");
  }, 3000);
});
