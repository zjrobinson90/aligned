// This is my code to run everything and where I'll put the code for different puzzles

var square = "<div onmouseup='clicked(this)' class='square'></div>";
var triangle = "<div onmouseup='clicked(this)' class='triangle'></div>";
var totalScore = 0; // sets variable to show the total score of a user (ADD COOKIES TO THIS)
var startTime; // sets variable to check the start time of the puzzle
var elapsedTime; // sets variable to check how much time elapses between the start of the puzzle and the first click
var points; // sets variable to determine how many points are awarded based on time

// sets up function to vibrate phone
function vibrate() {
	try{
		navigator.vibrate([5]);
	}catch(e){}
}

// make full screen by clicking the DIV "banner"
function fullScreen() {
	$('#banner').click(function(){screenfull.toggle()});
}

// starts everything
window.onload = function() {
	setupGame();
	fullScreen();
	console.log("The screen is full screen: " + screenfull.isFullscreen); // checks to see if the screen is full screened (never will be on start) and console logs it
}

function setupGame(){
	// keeps the screen in portrait mode on phones and catches the error thrown when on desktop (NOT WORKING)
	screen.orientation.lock('portrait').catch(function() {// do nothing
	});
	clearPuzzle(); // clears the parent div of anything in it and runs the first puzzle
}

//rotates the selected shape back to 0 or shows a 'wrong' response
function clicked(x) {
	elapsedTime = Date.now() - startTime; // shows how much time has passed since the puzzle started
	timerPoints(); // sets the points dependent upon the elapsed time
	console.log(elapsedTime);
	vibrate(); // vibrates the phone either way
	var degZero = 0;
	// checks to see if the shape clicked is the correct one or the wrong one
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
		totalScore = totalScore + points; // adds 'points' to the total score
		
	} else {
		console.log("WRONG");
		$(x).css('background-color', 'red');
		totalScore = totalScore - 5; // subtracts points to the total score
	}
	$('#banner').html("Aligned: " + totalScore);
	// runs the clear puzzle function, starting the next puzzle
	setTimeout(function(){clearPuzzle();}, 500);
}

// clears the puzzle and starts the next one (NEED NEW PUZZLES HERE)
function clearPuzzle(){
	$('#parent').empty();
	squarePuzzle_1();
	startTime = Date.now(); // sets the start time timer for how long it takes someone to click
}

// sets the points based on amount of time elapsed
function timerPoints(){
	points = 0;
	if(elapsedTime <= 500) {
		points = 15;
	} else if(elapsedTime >= 501 && elapsedTime <= 1000) {
		points = 10;
	} else if(elapsedTime >=1001 && elapsedTime <= 1500) {
		points = 5;
	} else {
		points = 0;
	}
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




