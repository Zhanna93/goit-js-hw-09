import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

import "flatpickr/dist/flatpickr.min.css";

const buttonStart = document.querySelector('button[data-start]');
const inputData = document.querySelector('#datetime-picker');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

buttonStart.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
 onClose(selectedDates) {
 if (Date.parse(inputData.value) > Date.parse(new Date())) {
  buttonStart.removeAttribute('disabled')
  // Notiflix.Notify.success('Success');
  return
 }
 Notiflix.Notify.failure('Please choose a date in the future')
  console.log(selectedDates[0]);
  },
};

const datePicker = flatpickr('#datetime-picker', options);

class Timer {
 constructor({onTick}) {
  this.intervalId = null;
  this.isActive = false;
  this.onTick = onTick;
 }

onButtonClick() {
 if (this.isActive) {
  return
 }
  const futureTime = inputData.value;
  const secondFutureTime = Date.parse(futureTime);
  this.isActive = true;

 // console.log(secondFutureTime)

 this.intervalId = setInterval(() => {
  const currentTime = Date.now();

  // console.log(currentTime)
  // console.log(secondFutureTime)
  const deltaTime = secondFutureTime - currentTime;
  if (deltaTime <= 1000) {
   this.stop();

   // console.log(deltaTime)
  };

  const time = this.convertMs(deltaTime);
  this.onTick(time);

  console.log(time)
 }, 1000);
}

 stop() {
 clearInterval(this.intervalId);
 this.isActive = false;
 const time = this.convertMs(0);
 this.onTick(time);
 Notiflix.Notify.success('Countdown finished!');
 };

convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = this.addLeadingZero(Math.floor(ms / day));
  const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

addLeadingZero(value) {
 return String(value).padStart(2, '0');
};
}

const timer = new Timer({
 onTick: updateMarkup,
});

buttonStart.addEventListener('click', () => {
  timer.onButtonClick()
});

// const bindFn = stop.bind(timer);
// timer.stop(bindFn);

function updateMarkup({ days, hours, minutes, seconds }) {
 daysSpan.textContent = `${days}`;
 hoursSpan.textContent = `${hours}`;
 minutesSpan.textContent = `${minutes}`;
 secondsSpan.textContent = `${seconds}`;

}





