var rgbspan = document.querySelector('h1 span');
var h1 = document.querySelector('h1');
var btns = document.getElementsByClassName('btn');
var newcolor = btns[0];
var easy = btns[1];
var hard = btns[2];
var notifytext = document.querySelector('#notifytext');
var squares = document.getElementsByClassName('square');

var colorarr = null;
var pickedcolor = null;
var easyhard = true;
var guess = false;

var num = 6;
setDefaultColor();
selectedButton(num);
setNewSquareColor(6);
setSquareColor(num);

easy.addEventListener('click', function() {
	if (easyhard === true && guess === false) {
		setDefaultColor();
		num = 3;
		selectedButton(num);
		setSquareColor(num);
		easyhard = false;
	}
});
hard.addEventListener('click', function() {
	if (easyhard === false && guess === false) {
		setDefaultColor();
		num = 6;
		setSquareColor(num);
		selectedButton(num);
		easyhard = true;
	}
});

function selectedButton(num) {
	if (num === 6) {
		hard.classList.add('selected');
		easy.classList.remove('selected');
	} else {
		hard.classList.remove('selected');
		easy.classList.add('selected');
	}
}

function setDefaultColor() {
	for (var i = 0; i < 6; i++) {
		squares[i].style.background = '#232323';
	}
	pickedcolor = null;
	notifytext.textContent = '';
	h1.style.background = 'steelblue';
}

function setSquareColor(num) {
	pickedcolor = colorarr[Math.floor(Math.random() * num)];
	rgbspan.textContent = pickedcolor;

	for (var i = 0; i < num; i++) {
		squares[i].style.background = colorarr[i];
	}
}
function setNewSquareColor(num) {
	colorarr = colorarraygenerator(num);
	pickedcolor = colorarr[Math.floor(Math.random() * num)];

	rgbspan.textContent = pickedcolor;
}
for (var i = 0; i < squares.length; i++) {
	squares[i].addEventListener('click', function() {
		var colorselected = this.style.background;
		if (colorselected === pickedcolor) {
			notifytext.textContent = 'Correct';
			h1.style.background = pickedcolor;
			for (var i = 0; i < num; i++) {
				squares[i].style.background = pickedcolor;
			}
			newcolor.textContent = 'PLAY AGAIN';
		} else {
			this.style.background = '#232323';
			notifytext.textContent = 'Try Again';
		}
		guess = true;
	});
}

newcolor.addEventListener('click', function() {
	guess = false;
	newcolor.textContent = 'NEW COLORS';
	setDefaultColor();
	setNewSquareColor(6);
	setSquareColor(num);
});

function colorarraygenerator(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(randomcolorgenerator());
	}
	return arr;
}

function randomcolorgenerator() {
	var r = Math.floor(Math.random() * 256);
	var y = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return 'rgb(' + r + ', ' + y + ', ' + b + ')';
}
