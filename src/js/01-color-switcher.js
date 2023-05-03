const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let timerId = null;
stopButton.disabled = true;
startButton.addEventListener('click', () => {
  if (timerId === null) {
    timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startButton.disabled = true;
    stopButton.disabled = false; 
  }
});
stopButton.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  startButton.disabled = false;
  stopButton.disabled = true;
});
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
