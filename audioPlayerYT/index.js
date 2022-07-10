const audio = document.querySelector('.audiocls');
const thumbnail = document.querySelector('.tumbnailsimg');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const startTime = document.querySelector('.startTime');
const endTime = document.querySelector('.endTime');
const pre = document.querySelector('.audio__pre');
const pre10 = document.querySelector('.audio__pre10');
const playpause = document.querySelector('.audio__playpause');
const nxt10 = document.querySelector('.audio__nxt10');
const nxt = document.querySelector('.audio__nxt');
const progressBar = document.querySelector('.progressBar');
const songListElem = document.querySelector('.songList');
const volnum = document.querySelector('.volNum');
const volumePro = document.querySelector('#volid');
let playstate = false;
let songPos = 0;
const loadList = () => {
    for (let i = 0; i < songList.length; i++) {

        let createList = `   <div class="songContainer song${i}" id="${i}">
        <audio src= "${songList[i].srcUrl}" class ="cls${i}"> </audio>
                    <div class="titleandart">
                        <p class="title">${songList[i].title}</p>
                        <p class="artist">${songList[i].artist}</p>
                    </div>
                    <div class="timeContainer${i}">0.00</div>
                </div>`;
        songListElem.insertAdjacentHTML('beforeend', createList);
        let maudio = document.querySelector(`.cls${i}`);
        let timeContainer = document.querySelector(`.timeContainer${i}`);
        let songContainer = document.querySelector(`.song${i}`);
        maudio.addEventListener('loadeddata', (e) => {
            let totalDuration = e.target.duration;
            let totalMin = Math.floor(totalDuration / 60);
            let totalSec = Math.floor(totalDuration % 60);
            timeContainer.innerHTML = `${totalMin}.${totalSec>9?totalSec:'0'+totalSec}`;
        });
        songContainer.addEventListener('click', (e) => {
            songPos = parseInt(e.currentTarget.id);
            loadMusic(songList[songPos].thumbnail);
            playMusic();
        });
    }
}

volumePro.addEventListener('input', (e) => {
    let currentProDuration = parseInt(e.target.value);
    let currvol = (currentProDuration / 10) * 2;
    audio.volume = currvol;
    volnum.innerHTML = currentProDuration;
});

const loadMusic = (thumb = './src/thumbnails/thumb4.png') => {
    thumbnail.src = `${thumb}`;
    audio.src = `${songList[songPos].srcUrl}`;
    title.innerHTML = `${songList[songPos].title}`;
    artist.innerHTML = `${songList[songPos].artist}`;
}
const playMusic = () => {
    playpause.src = './src/icon/play.png';
    playstate = true;
    audio.play();
}
const pauseMusic = () => {
    playpause.src = './src/icon/pause.png';
    playstate = false;
    audio.pause();
}
const preMusic10 = () => {
    audio.currentTime -= 10;
}
const preMusic = () => {
    if (songPos > 0) {
        songPos -= 1;
        loadMusic();
        playMusic();
    }
}
const nxtMusic10 = () => {
    audio.currentTime += 10;
}
const nxtMusic = () => {
    if (songPos < songList.length - 1) {
        songPos += 1;
        loadMusic(songList[songPos].thumbnail);
        playMusic();
    }
}
window.addEventListener('load', () => {
    loadMusic(songList[songPos].thumbnail);
    loadList();
});
pre10.addEventListener('click', () => {
    preMusic10();
});
pre.addEventListener('click', () => {
    preMusic();
});
playpause.addEventListener('click', () => {
    playstate ? pauseMusic() : playMusic();
});
nxt10.addEventListener('click', () => {
    nxtMusic10();
});
nxt.addEventListener('click', () => {
    nxtMusic();
});
progressBar.addEventListener('mousedown', () => {
    audio.pause();
    progressBar.addEventListener('input', (e) => {
        let currentProDuration = e.target.value;
        audio.currentTime = currentProDuration;
    });
    progressBar.addEventListener('mouseup', () => {
        playstate ? audio.play() : audio.pause();
    })
})
audio.addEventListener('loadeddata', (e) => {
    let totalDuration = e.target.duration;
    progressBar.max = `${totalDuration}`;
    let totalMin = Math.floor(totalDuration / 60);
    let totalSec = Math.floor(totalDuration % 60);
    endTime.innerHTML = `${totalMin}.${totalSec>9?totalSec:'0'+totalSec}`
    audio.addEventListener('timeupdate', (event) => {
        let currentDurations = event.target.currentTime;
        let currentMins = Math.floor(currentDurations / 60);
        let currentSecs = Math.floor(currentDurations % 60);
        progressBar.value = currentDurations;
        startTime.innerHTML = `${currentMins}.${currentSecs>9?currentSecs:'0'+currentSecs}`
    });
});
document.addEventListener('keydown', (e) => {
    console.log(e.code)
    switch (e.code) {
        case 'Space':
            playstate ? pauseMusic() : playMusic();
            break;

        default:
            break;
    }
})