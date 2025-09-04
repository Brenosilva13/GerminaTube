// Seletores principais do player
const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPauseBtn");
const audioBtn = document.getElementById("audioBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const volumeControl = document.getElementById("volumeControl");
const progressBar = document.getElementById("progressBar");
const timeDisplay = document.getElementById("timeDisplay");

// Elementos de texto do vídeo
const videoTitle = document.getElementById("videoTitle");
const videoViews = document.getElementById("videoViews");
const videoDescription = document.getElementById("videoDescription");

// Play / Pause
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

// Mutar / Desmutar
audioBtn.addEventListener("click", () => {
  const img = audioBtn.querySelector("img");
  video.muted = !video.muted;
  img.src = video.muted ? "./images/mutar.png" : "./images/audio.png";
  img.alt = video.muted ? "Mudo" : "Áudio";
});

// Controle de volume
volumeControl.addEventListener("input", () => {
  video.volume = volumeControl.value;
});

// Formata tempo mm:ss
function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0"+sec : sec}`;
}

// Atualiza barra de progresso e tempo
video.addEventListener("timeupdate", () => {
  progressBar.value = video.currentTime;
  let current = formatTime(video.currentTime);
  let total = formatTime(video.duration);
  timeDisplay.textContent = `${current} / ${total}`;
});

// Mostra tempo total quando metadados carregam
video.addEventListener("loadedmetadata", () => {
  progressBar.max = video.duration;
  timeDisplay.textContent = `0:00 / ${formatTime(video.duration)}`;
});

// Pular para posição na barra
progressBar.addEventListener("input", () => {
  video.currentTime = progressBar.value;
});

// Modo tela cheia
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

// Troca de vídeos com cards laterais
const videoCards = document.querySelectorAll(".video-card");

// Carrega vídeo no player principal
function carregarVideo(src, poster, titulo, views, descricao) {
  video.setAttribute("src", src);
  video.setAttribute("poster", poster);
  videoTitle.textContent = titulo;
  videoViews.textContent = views;
  videoDescription.textContent = descricao;
}

// Pega dados atuais do player
function getVideoAtual() {
  return {
    src: video.getAttribute("src"),
    poster: video.getAttribute("poster"),
    titulo: videoTitle.textContent,
    views: videoViews.textContent,
    descricao: videoDescription.textContent
  };
}

// Clique nos cards para trocar vídeo
videoCards.forEach(card => {
  card.addEventListener("click", () => {
    const atual = getVideoAtual();

    // Dados do card clicado
    const novoSrc = card.getAttribute("data-src");
    const novoPoster = card.getAttribute("data-poster");
    const novoTitulo = card.querySelector(".titulo").textContent;
    const novoViews = card.querySelector(".canal").textContent;
    const novoDescricao = card.getAttribute("data-descricao") || "Sem descrição disponível.";

    // Carrega vídeo novo
    carregarVideo(novoSrc, novoPoster, novoTitulo, novoViews, novoDescricao);

    // Devolve vídeo antigo para o card
    card.setAttribute("data-src", atual.src);
    card.setAttribute("data-poster", atual.poster);
    card.setAttribute("data-descricao", atual.descricao);

    const capaVideo = card.querySelector(".capaVideo");
    capaVideo.setAttribute("src", atual.src);
    capaVideo.setAttribute("poster", atual.poster);
    card.querySelector(".titulo").textContent = atual.titulo;
    card.querySelector(".canal").textContent = atual.views;
  });
});

// Navegação via hash (#/video/id)
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

// Tema claro/escuro
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Ocultar controles do vídeo após 3s sem movimento
let hideControlsTimeout;
video.addEventListener("mousemove", () => {
  document.querySelector(".video-principal").classList.remove("hide-controls");
  clearTimeout(hideControlsTimeout);
  hideControlsTimeout = setTimeout(() => {
    document.querySelector(".video-principal").classList.add("hide-controls");
  }, 3000);
});
