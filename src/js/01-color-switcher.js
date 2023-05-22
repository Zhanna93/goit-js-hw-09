const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

buttonStart.addEventListener('click', () => {
 timerId = setInterval(() => {
body.style.backgroundColor = getRandomHexColor()
 }, 1000);
 buttonStart.setAttribute('disabled', '');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

buttonStop.addEventListener('click', () => {
 clearInterval(timerId);
 buttonStart.removeAttribute('disabled');
})
