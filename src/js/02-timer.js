import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const timer = document.querySelector('.timer');

timer.style.marginTop = '20px';
timer.style.display = 'flex';
timer.style.justifyContent = 'center'
timer.style.gap = '30px';
timer.style.width = '400px';

let timerId = '';
btnStart.disabled = true;
let selectedDate = null;


btnStart.addEventListener('click', handleStart);


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0].getTime()
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
        } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function handleStart() { 
  btnStart.disabled = true;
  timerId = setInterval(() => { 
    const deadlineDate = selectedDate - new Date()
    const convertDate = convertMs(deadlineDate)
    showDate(convertDate)
    timeIsOut(deadlineDate)
  }, 1000)
}

function showDate(time) { 
  daysEl.textContent = addLeadingZero(time.days)
  hoursEl.textContent = addLeadingZero(time.hours)
  minutesEl.textContent = addLeadingZero(time.minutes)
  secondsEl.textContent = addLeadingZero(time.seconds)
}

function timeIsOut(deadlineDate) { 
  if (deadlineDate < 1000) {
    clearInterval(timerId)
    Notiflix.Notify.success('Time is over!');
  }  
}

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
