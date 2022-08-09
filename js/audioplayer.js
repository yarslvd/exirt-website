'use strict'

const playBtn = document.querySelector('.play');
const musicContainer = document.querySelector('.music-container');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const time = document.querySelector('.time');



function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    playBtn.querySelector('i.fas').classList.remove('fa-play');

    audio.volume = 0.2;
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
    progress.style.width = `${audio.currentTime}`
}

function getTime(e) {
    const { duration, currentTime } = e.srcElement;

    // Get minutes
    let minutes;
    if(currentTime === null) {
        minutes = 0;
    }
    else {
        minutes = Math.floor(currentTime / 60);
    }

    // Get seconds
    let seconds;
    if(Math.floor(currentTime) < 60) {
        seconds = Math.floor(currentTime);
    }
    else {
        for (var i = 1; i<=60; i++){
            if(Math.floor(currentTime)>=(60*i) && Math.floor(currentTime)<(60*(i+1))) {
                seconds = Math.floor(currentTime) - (60 * i);
            }
        }
    }

    seconds = seconds < 10 ? '0' + seconds : seconds;

    time.innerHTML = minutes + ':' + seconds;
    console.log(seconds);

}

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
})

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('timeupdate', getTime);
audio.addEventListener('ended', () => {console.log('ended!')});
progressContainer.addEventListener('click', setProgress);