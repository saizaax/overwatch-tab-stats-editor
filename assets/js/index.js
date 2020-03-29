let canvas = document.getElementById('imageCanvas');
let ctx = canvas.getContext('2d');

let bgr = new Image();
let mdl = new Image();

const FuturaDemiCFont = new FontFace('FuturaDemiC', 'url(assets/fonts/Futura/FuturaDemiC.woff)');
FuturaDemiCFont.load().then(function(font) {
	document.fonts.add(font);
});

const FuturaBookCFont = new FontFace('FuturaBookC', 'url(assets/fonts/Futura/FuturaBookC.woff)');
FuturaBookCFont.load().then(function(font) {
	document.fonts.add(font);
});

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
let randombgr = getRandomInt(1, 6);

bgr.src = `assets/img/background-${randombgr}.png`;
mdl.src = 'assets/img/golden-medal.png';

$('#imageCanvas').tilt({
	scale: 1.2,
	maxTilt: 12
});

$('#imageCanvas').click(function() {
	canvas.toBlob((blob) => {
		const objectURL = URL.createObjectURL(blob);
		window.open(objectURL);
	}, 'image/png');
});

function setData() {
	let defaultScore = parseInt($('#input-number').val());
	let score;

	let index = $('#input-text').val();
	index = index.toUpperCase();

	if (defaultScore < 100000 && defaultScore >= 0 && index.length < 17) {
		if (isNaN(defaultScore / 1000) || defaultScore / 1000 < 1) {
			score = Math.floor(defaultScore);
		} else {
			defaultScore /= 1000;
			let scorestr = new String(defaultScore);
			score = scorestr.replace('.', ',');
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(bgr, 0, 0, 270, 90);
		ctx.drawImage(mdl, 24, 18, 40, 40);

		ctx.fillStyle = '#ffffff';

		canvas.style.letterSpacing = '0px';
		ctx.font = 'normal 22.75px FuturaDemiC';
		ctx.fillText(score, 72.5, 42.5);

		canvas.style.letterSpacing = '0.575px';
		ctx.font = 'normal 17.3px FuturaBookC';
		ctx.fillText(index, 71.575, 68);
	}
}

$('#golden').click(function() {
	let str = $('#golden').text();
	$('#select-input').text(str);
	mdl.src = 'assets/img/golden-medal.png';
});

$('#silver').click(function() {
	let str = $('#silver').text();
	$('#select-input').text(str);
	mdl.src = 'assets/img/silver-medal.png';
});

$('#bronze').click(function() {
	let str = $('#bronze').text();
	$('#select-input').text(str);
	mdl.src = 'assets/img/bronze-medal.png';
});

$('#nothing').click(function() {
	let str = $('#nothing').text();
	$('#select-input').text(str);
	mdl.src = 'assets/img/no-medal.png';
});

$('#apply-button').click(function() {
	setData();
});

$(document).ready(function() {
	setTimeout(function() {
		setData();
	}, 500);
});
