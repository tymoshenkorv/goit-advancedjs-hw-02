import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

let form = document.querySelector('.form');
let delayBtn = document.querySelector('input[name="delay"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  let delay = Number(delayBtn.value);

  let stateBtn = document.querySelector('input[name="state"]:checked');
  let isSuccess = stateBtn.value === 'fulfilled';

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve('Success! Value passed to resolve function');
      } else {
        reject('Error! Error passed to reject function');
      }
    }, delay);
  });

  // Registering promise callbacks
  promise.then(
    value => {
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${delay}ms`,
      });
    },
    error => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
      });
    }
  );
});
