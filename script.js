console.log("let's start java script")

// add eventlistner for hamburger
// document.querySelector(".hamburger").addEventListener("click",()=>{
//     document.querySelector(".left").style.left = "0"
// })

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const leftPanel = document.querySelector(".left");

  if (hamburger && leftPanel) {
    hamburger.addEventListener("click", () => {
      leftPanel.style.left = "0";
    });
  }
});


// add eventlistner for close button

document.addEventListener("DOMContentLoaded", () => {
  const close = document.querySelector(".close");
  const leftPanel = document.querySelector(".left");

  if (close && leftPanel) {
    close.addEventListener("click", () => {
      leftPanel.style.left = "-120%";
    });
  }
});



let song = [
  "song/Aaj Ki Raat Stree 2 320 Kbps.mp3",
  "song/tera-pyar-mera-junoon-334753.mp3",
  "song/meri-duniya-294226.mp3"
];

let currentAudio = new Audio();
let currentIndex = 0;
let isPlaying = false;

function playSong(index) {
  if (index < 0 || index >= song.length) return;

  currentIndex = index;
  const url = song[index];
  const fileName = url.split("/").pop();

  currentAudio.src = url;
  currentAudio.play();
  isPlaying = true;

  document.getElementById("nowPlaying").textContent = fileName;
  const downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.href = url;
  downloadBtn.download = fileName;
  downloadBtn.disabled = false;
  document.getElementById("playPauseBtn").textContent = "⏸ Pause";
}

function togglePlayPause() {
  if (!currentAudio.src) {
    playSong(currentIndex);
    return;
  }

  if (isPlaying) {
    currentAudio.pause();
    document.getElementById("playPauseBtn").textContent = "▶️ Play";
  } else {
    currentAudio.play();
    document.getElementById("playPauseBtn").textContent = "⏸ Pause";
  }

  isPlaying = !isPlaying;
}

function nextSong() {
  let next = (currentIndex + 1) % song.length;
  playSong(next);
}

function prevSong() {
  let prev = (currentIndex - 1 + song.length) % song.length;
  playSong(prev);
}

currentAudio.addEventListener("timeupdate", () => {
  const progress = document.getElementById("progressBar");
  const current = document.getElementById("currentTime");
  const duration = document.getElementById("duration");

  if (currentAudio.duration) {
    progress.value = (currentAudio.currentTime / currentAudio.duration) * 100;
    current.textContent = formatTime(currentAudio.currentTime);
    duration.textContent = formatTime(currentAudio.duration);
  }
});

currentAudio.addEventListener("ended", () => {
  nextSong();
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}


// song show in playslist
function loadPlaylist() {
  const table = document.getElementById("playlistTable");
  table.innerHTML = ""; // 🧹 Clear old list
  song.forEach((file, index) => {
    const fileName = file.split("/").pop();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${fileName}</td>
      <td><button onclick="playSong(${index})">▶️ Play</button></td>
    `;
    table.appendChild(row);
  });
}
window.onload = function () {
  loadPlaylist();
}
