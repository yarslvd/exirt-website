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

    audio.volume = 0.4;
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
    const progressPercent = (currentTime / duration) * 100 / 4;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration * 4;
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

audio.addEventListener('ended', () => {
    let modal = document.querySelector(".modal");
    let close = document.querySelector('.close-modal');
    modal.style.visibility = 'visible';
    let span = document.getElementsByClassName("close")[0];
    const body = document.querySelector("body");

    modal.style.display = "flex";
    body.style.overflow = "none";

    close.onclick = function() {
        modal.style.display = "none";
        body.style.overflow = "auto";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
          body.style.overflow = "auto";
        }
      }
});


audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('timeupdate', getTime);
progressContainer.addEventListener('click', setProgress);