import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const buttonStart = document.querySelector('button[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
 onClose(selectedDates) {
  buttonStart.addEventListener('click', timer.updateMarkup());
  console.log(selectedDates[0]);
  },
};

const datePicker = flatpickr('#datetime-picker', options);

const inputData = document.querySelector('#datetime-picker');

buttonStart.setAttribute('disabled', '')

inputData.value = ''

class CountDownTimer {
 constructor({ selector, inputData }) {
  this.inputData = inputData.value;
  this.daysSpan = document.querySelector('[data-days]')
  this.hoursSpan = document.querySelector('[data-hours]')
  this.minutesSpan = document.querySelector('[data-minutes]')
  this.secondsSpan = document.querySelector('[data-seconds]')
 }

 updateMarkup() {
  setInterval(() => {
   const currentTime = Date.now();
   const delta = this.targetDate - currentTime;
   const { days, hours, minutes, seconds } = this.convertMs(delta)
   this.daysSpan.textContent = days;
   this.hoursSpan.textContent = hours;
   this.minutesSpan.textContent = minutes;
   this.secondsSpan.textContent = seconds;
  }, 1000)
 }

convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
}

const timer = new CountDownTimer({
 selector: '.timer',
 inputData: inputData.value,
})

inputData.oninput = () => {
 if (Date.parse(inputData.value) > Date.parse(new Date())) {
  buttonStart.removeAttribute('disabled')

  return
 }
 window.alert("Please choose a date in the future")
}