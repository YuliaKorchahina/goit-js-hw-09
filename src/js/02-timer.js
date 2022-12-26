import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const INVALID_MESSAGE_DATE = 'Please choose a date in the future';

const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');

const dayEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const timer = document.querySelector('.timer');

timer.style.marginTop = '20px';
timer.style.display = 'flex';
timer.style.justifyContent = 'center'
timer.style.gap = '30px';
timer.style.width = '400px';

let currentDateInCounter = {};
btnStart.disabled = true;

const getInvalidMessage = message => {
  window.alert(message);
};

const isSelectedDateValid = (defaultDate, selectedDate) => {
  return selectedDate < defaultDate;
};

const onCloseHandle = date => {
  if (isSelectedDateValid(options.defaultDate, date)) {
    getInvalidMessage(INVALID_MESSAGE_DATE);
    return;
  }
  if (date) {
    btnStart.disabled = false;
    currentDateInCounter = new Date(date - options.defaultDate);
    const { day, hour, minute, second } = getDateElemnts(currentDateInCounter);
    setDateToInput(day, hour, minute, second);
  }
};

const defaultOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    onCloseHandle(selectedDate[0]);
  },
};

const options = {
  ...defaultOptions,
};

const setDateToInput = (day, hour, minute, second) => {
  dayEl.textContent = day;
  hoursEl.textContent = hour;
  minutesEl.textContent = minute;
  secondsEl.textContent = second;
};

const getDateElemnts = date => {
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return { day, hour, minute, second };
};

const handlCounter = () => {
  if (currentDateInCounter <= 0) {
    btnStart.disabled = true;
    inputEl.disabled = true;
    return;
  }
  currentDateInCounter -= 1000;
  const { day, hour, minute, second } = getDateElemnts(
    new Date(currentDateInCounter)
  );
  setDateToInput(day, hour, minute, second);
};

const handleStart = () => {
  btnStart.disabled = true;
  inputEl.disabled = true;
  setInterval(() => {
    handlCounter();
  }, 1000);
};

flatpickr(inputEl, options);
btnStart.addEventListener('click', handleStart);
