const startButton = document.querySelector('button[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');
let userSelectedDate = null;
let countdownInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', () => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  
  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeDifference = userSelectedDate - now;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerUI(0, 0, 0, 0);
      iziToast.success({
        title: 'Finished',
        message: 'Countdown has reached zero',
      });
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimerUI(days, hours, minutes, seconds);
  }, 1000);

  startButton.disabled = true;
  document.querySelector('#datetime-picker').disabled = true;
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerUI(days, hours, minutes, seconds) {
  daysField.textContent = addLeadingZero(days);
  hoursField.textContent = addLeadingZero(hours);
  minutesField.textContent = addLeadingZero(minutes);
  secondsField.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(targetTime) {
  const currentTime = new Date().getTime();
  const deltaTime = targetTime - currentTime;

  if (deltaTime > 0) {
    const days = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((deltaTime % (1000 * 60)) / 1000);

    document.querySelector("[data-days]").textContent = String(days).padStart(2, '0');
    document.querySelector("[data-hours]").textContent = String(hours).padStart(2, '0');
    document.querySelector("[data-minutes]").textContent = String(minutes).padStart(2, '0');
    document.querySelector("[data-seconds]").textContent = String(seconds).padStart(2, '0');
  }
}