

var square = "<div onmouseup='clicked(this)' class='square'></div>";
var triangle = "<div onmouseup='clicked(this)' class='triangle'></div>";

// Setting up function to vibrate phone
function vibrate() {
	try{
		navigator.vibrate([5]);
	}catch(e){}
}

// make full screen by clicking the DIV "banner"
function fullScreen() {
	document.getElementById('banner').addEventListener('click', () => {
		screenfull.toggle();
	});
}


window.onload = function() {
	setupGame();
	fullScreen();
	// checks to see if the screen is full screened (never will be on start) and console logs it
	console.log("The screen is fullscreen: " + screenfull.isFullscreen);
}

function setupGame(){
	// keeps the screen in portrait mode on phones and catches the error thrown when on desktop
	screen.orientation.lock('portrait').catch(function() {// do nothing
	});
	// runs the first puzzle
	squarePuzzle_1();
}

//rotates the selected shape back to 0 or shows a 'wrong' response
function clicked(x) {
	vibrate(); // vibrates the phone either way
	var degZero = 0;
	if($(x).attr('name') == 'answer'){
		console.log("CORRECT");
		$(x).css({
		'-webkit-transform': 'rotate(' + degZero + 'deg)',
		'-moz-transform': 'rotate(' + degZero + 'deg)',
        '-ms-transform': 'rotate(' + degZero + 'deg)',
        '-o-transform': 'rotate(' + degZero + 'deg)',
        'transform': 'rotate(' + degZero + 'deg)',
		'transform': 'rotate(' + degZero + 'deg)',
		});
		$(x).css('background-color', 'green');
	} else {
		console.log("WRONG");
		$(x).css('background-color', 'red');
	}
	// runs the clear puzzle function, starting the next puzzle
	setTimeout(function(){clearPuzzle();}, 500);
}

// clears the puzzle and starts the next one (NEED NEW PUZZLES HERE)
function clearPuzzle(){
	$('#parent').empty();
	squarePuzzle_1();
}

// Puzzle 1
function squarePuzzle_1(){
	//makes first square puzzle
	//creates the shapes and gives them an id
	var n = 0;
	for(i=0; i<3; i++){
		for (j=0; j<2; j++){
			$(square).appendTo('#parent');
			//gives the shapes an id by calling their class array position
			$('.square:eq(' + n + ')').attr('id', 'square' + n);
			n++;
		}	
	}
	//randomly rotates one of the shapes
	var degree = Math.floor(Math.random() * 11) + 1;
	var rando = Math.floor(Math.random() * $('.square').length);
	console.log("Number of boxes: " + $('.square').length);
	$('#square' + rando).css({
		'-webkit-transform': 'rotate(' + degree + 'deg)',
		'-moz-transform': 'rotate(' + degree + 'deg)',
        '-ms-transform': 'rotate(' + degree + 'deg)',
        '-o-transform': 'rotate(' + degree + 'deg)',
        'transform': 'rotate(' + degree + 'deg)',
		});
		$('#square' + rando).attr('name', 'answer');
}