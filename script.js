const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const btnPlay = document.getElementById('play');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const elcurrentTime = document.getElementById('current-time');
const elduration = document.getElementById('duration');

let counter = 0;

// music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Moti Elmakayes',
  },
  {
    name: 'jacinto-2',
    displayName: 'Electric Chill Machine 1',
    artist: 'Moti Elmakayes',
  },
  {
    name: 'jacinto-3',
    displayName: 'Electric Chill Machine 2',
    artist: 'Moti Elmakayes',
  },
  {
    name: 'metric-1',
    displayName: 'Electric Chill Machine 3',
    artist: 'Moti Elmakayes',
  },
];

btnNext.addEventListener('click', nextSong);
btnPrev.addEventListener('click', prevSong);

function prevSong() {
  counter--;
  if (counter < 0) {
    counter = songs.length - 1;
  }
  console.log(songs[counter]);
  loadSong(songs[counter]);
  play();
  console.log('end');
}

function nextSong() {
  counter++;
  if (counter === songs.length - 1) {
    counter = 0;
  }

  loadSong(songs[counter]);
  play();
  console.log('end');
}
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

loadSong(songs[counter]);

function play() {
  btnPlay.classList.replace('fa-play', 'fa-pause');
  btnPlay.setAttribute('title', 'pause');
  music.play();
}

function stop() {
  btnPlay.classList.replace('fa-pause', 'fa-play');
  btnPlay.setAttribute('title', 'play');
  music.pause();
}

btnPlay.addEventListener('click', () => (music.paused ? play() : stop()));
// function setMusic() {
//   music.paused ? music.play() : music.pause();
// }

function updateProgressBar(e) {
  if (!music.paused) {
    const { duration, currentTime } = e.srcElement;
    const d = Math.floor(duration / 60);
    if (d < 10) d = `0${d}`;
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    elcurrentTime.textContent = Math.ceil(currentTime);
    elduration.textContent = `${d}:${durationSeconds}`;
    const p = (currentTime / duration) * 100;
    progress.style.width = `${p}%`;
    console.log(durationSeconds);
  }
}

music.addEventListener('timeupdate', updateProgressBar);
