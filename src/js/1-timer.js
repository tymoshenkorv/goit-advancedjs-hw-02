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

let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(userSelectedDate);
    console.log('selectedDates[0]:', selectedDates[0]);
    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      timer.deadline = userSelectedDate;
      console.log('timer.deadline:', timer.deadline);
    }
  },
};
// console.log(selectedDates[0]);

flatpickr('#datetime-picker', options);

const timer = {
  deadline: new Date('2026-07-10T17:28:00'),
  intervalId: null,
  refs: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },

  start() {
    this.intervalId = setInterval(() => {
      const diff = this.deadline - Date.now();
      //   console.log(diff);
      if (diff <= 0) {
        this.stop();
        return;
      }
      const timerValues = this.convertMs(diff);
      //   console.log(timerValues);
      this.refs.days.textContent = this.pad(timerValues.days);
      this.refs.hours.textContent = this.pad(timerValues.hours);
      this.refs.minutes.textContent = this.pad(timerValues.minutes);
      this.refs.seconds.textContent = this.pad(timerValues.seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  convertMs(ms) {
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
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },
};

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

timer.start();

document.addEventListener('click', () => {
  timer.stop();
  console.log('Timer stopped');
});

// console.log(timer);

// const days = '24';
// console.log(days.padStart(2, '0')); // "04"
