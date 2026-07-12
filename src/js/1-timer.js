// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

console.log('timer.js');
console.log(flatpickr);

const timer = {
  //   deadline: null,
  intervalId: null,
  refs: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },

  start() {
    this.intervalId = setInterval(() => {
      //   const diff = this.deadline - Date.now();
      const diff = userSelectedDate - Date.now();
      //   console.log(diff);
      if (diff <= 0) {
        this.stop();
        return;
      }
      const timerValues = convertMs(diff);
      console.log(timerValues);
      this.refs.days.textContent = pad(timerValues.days);
      this.refs.hours.textContent = pad(timerValues.hours);
      this.refs.minutes.textContent = pad(timerValues.minutes);
      this.refs.seconds.textContent = pad(timerValues.seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer.stop();
    timer.refs.days.textContent = '00';
    timer.refs.hours.textContent = '00';
    timer.refs.minutes.textContent = '00';
    timer.refs.seconds.textContent = '00';
    console.log('selectedDates[0]:', selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDates[0];
      //   timer.deadline = userSelectedDate;
      console.log('timer.deadline:', userSelectedDate);
    }
  },
};
// console.log(selectedDates[0]);

let startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

flatpickr('#datetime-picker', options);

// timer.start();
startBtn.addEventListener('click', () => {
  timer.start();
  startBtn.disabled = true;
  console.log('Timer started');
});

document.addEventListener('click', () => {
  //   timer.stop();
  console.log('Timer stopped');
});

// console.log(timer);

// const days = '24';
// console.log(days.padStart(2, '0')); // "04"
