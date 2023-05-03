import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownIntervalId;

function startCountdown(endDate) {
  clearInterval(countdownIntervalId);

  countdownIntervalId = setInterval(() => {
    const currentTime = new Date().getTime();
    const remainingTime = endDate - currentTime;

    if (remainingTime < 0) {
      clearInterval(countdownIntervalId);
      alert("Time's up!");
      return;
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    daysValue.textContent = padNumberWithLeadingZeros(days);
    hoursValue.textContent = padNumberWithLeadingZeros(hours);
    minutesValue.textContent = padNumberWithLeadingZeros(minutes);
    secondsValue.textContent = padNumberWithLeadingZeros(seconds);
  }, 1000);
}

function padNumberWithLeadingZeros(number) {
  return number.toString().padStart(2, '0');
}

function isValidDate(date) {
  const currentDate = new Date();
  return date > currentDate;
}

function handleDateSelection() {
  const selectedDate = dateTimePicker.value
    ? new Date(dateTimePicker.value)
    : null;

  if (!selectedDate) {
    startButton.disabled = true;
    return;
  }

  if (isValidDate(selectedDate)) {
    startButton.disabled = false;
  } else {
    startButton.disabled = true;
    alert('Please choose a date in the future.');
  }
}

dateTimePicker.addEventListener('change', handleDateSelection);

startButton.addEventListener('click', () => {
  const selectedDate = new Date(dateTimePicker.value);

  if (!isValidDate(selectedDate)) {
    alert('Please choose a valid date in the future.');
    return;
  }

  startCountdown(selectedDate);
});

flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
});
