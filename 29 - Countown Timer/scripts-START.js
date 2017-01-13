let countDown
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const timerButtons = document.querySelectorAll('.timer__button')

timerButtons.forEach(x => x.addEventListener('click', onButtonClicked))
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault()
  // minutes is the name of the input inside the form
  const minutes = this.minutes.value
  this.reset()
  timer(minutes * 60)
})

function onButtonClicked() {
  const seconds = this.dataset.time
  timer(seconds)
}

function timer(seconds) {
  clearInterval(countDown)
  const now = Date.now()
  const then = now + (seconds * 1000)
  displayTimeLeft(seconds)
  displayEndTime(then)
  countDown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    if (secondsLeft < 0) {
      return clearInterval(countDown)
    }
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  const display = `${addZero(minutes)}:${addZero(remainderSeconds)}`
  document.title = display
  timerDisplay.textContent = display
}

function displayEndTime(timeStamp) {
  const end = new Date(timeStamp)
  const hour = end.getHours()
  const minutes = end.getMinutes()
  endTime.textContent = `Be back at ${addZero(hour)}:${addZero(minutes)}`
}

function addZero(number) {
  return number < 10 ? `0${number}` : `${number}`
}
