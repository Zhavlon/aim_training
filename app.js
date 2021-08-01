const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
let time = 0;
let score = 0;
const timeEL = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#d61f1f', '#283ae4', '#00ff8f', '#fbff00', '#dd2b8f', '#ffab31', '#16e6db', '#ca42f5'];

startBtn.addEventListener('click', (e) => {
	e.preventDefault();
	screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
	if (e.target.classList.contains('time-btn')) {
		time = parseInt(e.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		startGame();
	}
});

board.addEventListener('click', (e) => {
	if (e.target.classList.contains('circle')) {
		score++;
		e.target.remove();
		createRandomCircle();
	}
});

function startGame() {
	setInterval(decreaseTime, 1000);
	createRandomCircle();
	setTime(time);
}

function decreaseTime() {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;
		if (current < 10) {
			current = `0${current}`;
		}
		setTime(current);
	}
}

function setTime(value) {
	timeEL.innerHTML = `00:${value}`;
}

function finishGame() {
	timeEL.parentNode.classList.add('hide');
	board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
	const circle = document.createElement('div');
	let color = getRandomColor();
	const size = getRandomNumber(10, 60);
	const {width, height} = board.getBoundingClientRect();
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);

	circle.classList.add('circle');
	circle.style.background = color;
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;

	board.append(circle);
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
	const index = Math.floor(Math.random() * colors.length);

	return colors[index];
}