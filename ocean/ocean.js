gsap.to('.timer', {opacity: 1, y: 30, easeOut: "power5", duration: 1.2, delay: .5})
gsap.to('button', {opacity: 1, stagger: 1, duration: 1.5, delay: 1.2})
gsap.to('.set-time', {opacity: 1, x: -30, easeOut: "slow", duration: 1.2, delay: 2})
gsap.to('a', {opacity: 1, x: 10, easeOut: "slow", duration: 1.2, delay: 2.1})


const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const time = document.querySelector('#time');

const btnStart = document.querySelector('#start');
const btnPause = document.querySelector('#pause');
const btnReset = document.querySelector('#reset');

const video = document.querySelector('#myVideo');
const audio = document.querySelector('#player');

let min;
let sec;
let amountTime;

let timerID;

btnStart.addEventListener('click', () => {
    if (min === undefined) {
        min = time.value;
        sec = 0;
    }

    else if (min != undefined) {
        min = +minutes.textContent;
        sec = +seconds.textContent;
    }

    amountTime = min * 60 + sec;

    video.play();
    audio.play();

    timerID = setInterval(startTimer, 1000);

    time.setAttribute('disabled', 'true');
    btnStart.setAttribute('disabled', 'true');
    btnPause.removeAttribute('disabled');
})

btnPause.addEventListener('click', () => {
    video.pause();
    audio.pause();

    btnStart.removeAttribute('disabled');
    btnPause.setAttribute('disabled', 'true');

    stopTimer();
})

btnReset.addEventListener('click', () => {
    document.location.reload();
})

function startTimer() {
    min = Math.floor(amountTime / 60);
    sec = amountTime % 60;
    amountTime--;

    if (amountTime === 0) {
        video.pause();
        audio.pause();

        min = time.value;
        sec = 0;

        stopTimer();

        btnStart.removeAttribute('disabled');
        time.removeAttribute('disabled');
    }

    display();
}

function stopTimer() {
    clearInterval(timerID);
}

function display() {
    minutes.textContent = min;
    seconds.textContent = sec;

    if (min < 10) {
        minutes.textContent = '0' + min;
    }
    if (sec < 10) {
        seconds.textContent = '0' + sec;
    }
}
