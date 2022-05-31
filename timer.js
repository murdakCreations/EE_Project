const startingMinutes = 1
let time = startingMinutes * 60

const countDownEl = document.querySelector('#timer')

setInterval(updateCountdown, 1000)

function updateCountdown() {
    const minutes = Math.floor(time/60)
    let seconds = time % 60

    seconds = seconds < 10 ? '0' + seconds : seconds
    
    countDownEl.innerHTML = minutes +':' + seconds
    time--
}