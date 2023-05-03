const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let timerId = null;
startButton.addEventListener('click', () => {
  if (timerId === null) {
    timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startButton.disabled = true;
  }
});
stopButton.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  startButton.disabled = false;
});
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
