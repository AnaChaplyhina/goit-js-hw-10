import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const delay = Number(form.delay.value);
  const state = form.state.value;

  // Створення промісу з затримкою
  createPromise(delay, state)
    .then((delay) => {
      // Виведення повідомлення у разі виконання (fulfilled)
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        timeout: 5000,
      });
    })
    .catch((delay) => {
      // Виведення повідомлення у разі відхилення (rejected)
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 5000,
      });
    });
}

function createPromise(delay, state) {
  // Повертаємо новий проміс
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Виконується проміс або відхиляється в залежності від вибраного стану
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay); // Використовуємо введене користувачем значення затримки
  });
}