const delayEL = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputAmount = document.querySelector('[name="amount"]');
const btnSubmit = document.querySelector('[type="submit"]');
const form = document.querySelector('.form');

function onSubmit(event) {
  event.preventDefault();

  const delay = Number(delayEL.value);
  const step = Number(inputStep.value);
  const amount = Number(inputAmount.value);

  for (let index = 1; index <= amount; index += 1) {
    const stepDelay = delay + step;
    console.log(index);
    createPromise(index, stepDelay)
      .then(({ position, delay }) => onSuccess(position, delay))
      .catch(({ position, delay }) => onError(position, delay));
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({position, delay});
      }
    }, delay);
  });
  return promise;
}

function onSuccess(position, delay) {
  alert(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError(position, delay) {
  alert(`❌ Rejected promise ${position} in ${delay}ms`);
}

form.addEventListener('submit', onSubmit);
