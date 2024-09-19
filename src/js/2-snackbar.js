function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const promises = [
  createPromise(1, 1000),
  createPromise(2, 1500),
  createPromise(3, 2000),
];

promises.forEach((promise, index) => {
  promise
    .then(({ position, delay }) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise ${position} in ${delay}ms`,
      });
    })
    .catch(({ position, delay }) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise ${position} in ${delay}ms`,
      });
    });
});
