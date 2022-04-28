
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form')


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promiseCreate = new Promise((fulfill, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        Notify.success(`✅ Fulfilled promiseCreate ${position} in ${delay}ms`);
      } else {
        // Reject
        Notify.failure(`❌ Rejected promiseCreate ${position} in ${delay}ms`);
      }
    }, delay);
  });

  promiseCreate
    .then(result => {
      Notify.success(result);
    })
    .catch(result => {
      Notify.failure(result);
    });
}

const onSubmitInit = e => {
  e.preventDefault();

  const delay = document.querySelector('[name="delay"]')
  let delayNumber = Number(delay.value)
  const step = document.querySelector('[name="step"]')
  const stepNumber = Number(step.value)
  const amount = document.querySelector('[name="amount"]')
  const amountNumber = Number(step.value)

  for (let i = 0; i < amountNumber; i += 1) {
    createPromise(i + 1, delayNumber);
    delayNumber += stepNumber;
  }
}

form.addEventListener('submit', onSubmitInit);
