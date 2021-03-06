// This is my code to run everything and where I'll put the code for different puzzles

var titleText = "<p class='title'>Aligned</p>";
var startButton = "<div class='start animated pulse'><p>PLAY</p></div>";
//var startText = "<div class='start'></div>";
var squareShape = "<div onmouseup='clicked(this)' class='squareLarge'></div>";
var squareShapeSmall = "<div onmouseup='clicked(this)' class='squareSmall'></div>";
var triangleShapeUp = "<div onmouseup='clicked(this)' class='triangleUp'></div>";
var triangleShapeLeft = "<div onmouseup='clicked(this)' class='triangleLeft'></div>";
var triangleShapeRight = "<div onmouseup='clicked(this)' class='triangleRight'></div>";
var spacerShape = "<div class='spacer'></div>";
var totalScore = 0; // sets variable to show the total score of a user (ADD COOKIES TO THIS)
var startTime; // sets variable to check the start time of the puzzle
var elapsedTime; // sets variable to check how much time elapses between the start of the puzzle and the first click
var points; // sets variable to determine how many points are awarded based on time
var pointsDown = -5; // sets the variable to determine how many points should be lost
var timer; // variable to hold the timer object
var countDownTime = 10; // time for the count down timer
var streakNum = 0; // variable to start the streak number
var streakBroken = "<p class='animated tada';>streak broken</p>"; // text for streak broken
var diffTop = 10;
var diffBottom = 2;
var puzzlesArray = [];

// sets up function to vibrate phone
function vibrate() {
	try{
		navigator.vibrate([5]);
	}catch(e){}
}

// make full screen by clicking the DIV "banner"
function fullScreen() {
	$('#banner').click(function(){screenfull.exit(); startScreen()});
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
	startScreen(); // creates the start screen with a play button
}

// clears the puzzle and starts the next one (NEED NEW PUZZLES HERE)
function clearPuzzle(){
	$('#parent').empty();
	puzzlesArray = [squarePuzzle_1, trianglePuzzle_1, trianglePuzzle_2, squarePuzzle_2, squarePuzzle_3]; // sets an array of all the puzzles
	var r = Math.floor(Math.random() * puzzlesArray.length); // randomly picks one of the puzzles from the array of puzzles
	//var r = 4; // testing method to build the puzzle I want
	puzzlesArray[r]('a string'); // sets the text for the puzzle function to make it activate
	startTime = Date.now(); // sets the start time timer for how long it takes someone to click
	clearInterval(timer); // ends the timer for the previous puzzle
	$("#timer").html(countDownTime); // sets the timer to say 10 again
	new RunTimer(function(val) {
		$("#timer").html(val);
	});
}

// creates a timer 'object' that counts down
// got this code from: https://stackoverflow.com/questions/32141035/countdown-timer-using-moment-js-mmss-format
function RunTimer(callback, val) {
    val = countDownTime - 1; // sets the countdown time to say the start time
	$("#timer").css({'background-color':'#57A773', 'borderColor':'#FFFFFF'}); // sets the background color and border color
    timer = setInterval(function() { 
        callback(val);
        if(val-- <= 0) { 
            clearInterval(timer);
        } else if(val <= 6 && val >=4) {
			$("#timer").css("background-color", "#EE8434");
		} else if(val <=3){
			$("#timer").css("background-color", "#EE6352");
		}
    }, 1000);
}


//rotates the selected shape back to 0 or shows a 'wrong' response
function clicked(x) {
	elapsedTime = Date.now() - startTime; // shows how much time has passed since the puzzle started
	timerPoints(); // sets the points dependent upon the elapsed time
	vibrate(); // vibrates the phone either way
	var degZero = 0;
	// checks to see if the shape clicked is the correct one or the wrong one
	if($(x).attr('name') == 'answer'){
		$(x).css({
		'-webkit-transform': 'rotate(' + degZero + 'deg)',
		'-moz-transform': 'rotate(' + degZero + 'deg)',
        '-ms-transform': 'rotate(' + degZero + 'deg)',
        '-o-transform': 'rotate(' + degZero + 'deg)',
        'transform': 'rotate(' + degZero + 'deg)',
		'transform': 'rotate(' + degZero + 'deg)',
		});
		$(x).css('background-color', '#57A773'); // sets the color of the div to green for correct
		totalScore = totalScore + points; // adds 'points' to the total score
		$(x).html( "<p class='animated fadeOutUp';>" + points + "</p>"); // shows the amount of points won
		streakNum++; // increases the streak number
		$('#streak').html(streakNum + " streak"); // shows the current streak
		// runs the clear puzzle function, starting the next puzzle
		setTimeout(function(){clearPuzzle();}, 500);
	} else {
		$(x).css('background-color', '#EE6352'); // sets the color of the div to red for incorrect
		$(x).toggleClass('animated shake');
		totalScore = totalScore + pointsDown; // subtracts points to the total score
		$(x).html( "<p class='animated fadeOutUp';>" + pointsDown + "</p>");
		streakNum = 0; // decreases the streak number back to zero
		$('#streak').html(streakBroken); // shows the text "streak broken"
	}
	$('#banner').html("<div class='pointCenter'>" + totalScore + "</div><div class='pointCenter2'>points</div>"); // updates the score in the banner
	// WORK WITH THIS ZACK - fix the points words
}

// sets the points based on amount of time elapsed
function timerPoints(){
	points = Math.max(Math.floor((countDownTime - (elapsedTime / 1000))+1), 1); 
}


// Start Screen
function startScreen() {
	clearInterval(timer); // ends the timer for the previous puzzle
	$("#timer").empty(); // sets the timer to blank
		$("#timer").css({'background-color':'transparent', 'borderColor':'transparent'}); // sets the background color and border color
	$("#streak").empty(); // sets the streak to blank
	streakNum = 0; // decreases the streak number back to zero
	$('#parent').empty(); // clears out the screen to make new divs	
	$('#banner').html("<div class='pointCenter'>" + totalScore + "</div><div class='pointCenter2'>points</div>"); // updates the score in the banner
	$(titleText).appendTo('#parent');
	$(startButton).appendTo('#parent');
	$('.start').click(function(){screenfull.request(); clearPuzzle()}); // sets the 'start' class to be able to toggle full screen and play the puzzle
}

// ----------------------------------------------------------------------------------------------------- Puzzles -----------------------------------------------------------------------------------------------------
function squarePuzzle_1(){
	//makes first square puzzle
	//creates the shapes and gives them an id
	var n = 0;
	for(i=0; i<3; i++){
		for (j=0; j<2; j++){
			$(squareShape).appendTo('#parent');
			//gives the shapes an id by calling their class array position
			$('.squareLarge:eq(' + n + ')').attr('id', 'squarePuzzle_1' + n); // assigns an ID to the shape using the same name as the puzzle
			n++;
		}
	}
	//randomly rotates one of the shapes
	var degreePos = Math.floor(Math.random() * diffTop) + diffBottom; // rotating right
	var degreeNeg = Math.floor(Math.random() * (diffTop * (-1))) - (diffBottom - 1); // rotating left
	var degree;
	// randomly sets the direction of the rotation to left or right
	if((Math.floor(Math.random() * 2) + 1) == 1) {
		degree = degreePos;
	} else {
		degree = degreeNeg;
	}
	var rando = Math.floor(Math.random() * n);
	console.log("Number of boxes: " + n);
	$('#squarePuzzle_1' + rando).css({
		'-webkit-transform': 'rotate(' + degree + 'deg)',
		'-moz-transform': 'rotate(' + degree + 'deg)',
        '-ms-transform': 'rotate(' + degree + 'deg)',
        '-o-transform': 'rotate(' + degree + 'deg)',
        'transform': 'rotate(' + degree + 'deg)',
		});
		$('#squarePuzzle_1' + rando).attr('name', 'answer');
}

function trianglePuzzle_1(){
	//makes first triangle puzzle
	//creates the shapes and gives them an id
	var n = 0;
	for(i=0; i<4; i++){
		for (j=0; j<3; j++){
			$(triangleShapeUp).appendTo('#parent');
			//gives the shapes an id by calling their class array position
			$('.triangleUp:eq(' + n + ')').attr('id', 'trianglePuzzle_1' + n); // assigns an ID to the shape using the same name as the puzzle
			n++;
		}
	}
	//randomly rotates one of the shapes
	var degreePos = Math.floor(Math.random() * diffTop) + diffBottom; // rotating right
	var degreeNeg = Math.floor(Math.random() * (diffTop * (-1))) - (diffBottom - 1); // rotating left
	var degree;
	// randomly sets the direction of the rotation to left or right
	if((Math.floor(Math.random() * 2) + 1) == 1) {
		degree = degreePos;
	} else {
		degree = degreeNeg;
	}
	var rando = Math.floor(Math.random() * n);
	console.log("Number of triangles: " + n);
	$('#trianglePuzzle_1' + rando).css({
		'-webkit-transform': 'rotate(' + degree + 'deg)',
		'-moz-transform': 'rotate(' + degree + 'deg)',
        '-ms-transform': 'rotate(' + degree + 'deg)',
        '-o-transform': 'rotate(' + degree + 'deg)',
        'transform': 'rotate(' + degree + 'deg)',
		});
		$('#trianglePuzzle_1' + rando).attr('name', 'answer');
}

function trianglePuzzle_2(){
	//makes second triangle puzzle
	//creates the shapes and gives them an id
	var n = 0; // used to number the shape IDs
	var m = 0; // used to determine the item in the array of one class
	var p = 0; // used to determine the item in the array of another class
	for(i=0; i<4; i++){
		for (j=0; j<2; j++){
			$(triangleShapeLeft).appendTo('#parent');
			//gives the shapes an id by calling their class array position
			$('.triangleLeft:eq(' + m + ')').attr('id', 'trianglePuzzle_2' + n); // assigns an ID to the shape using the same name as the puzzle
			n++;
			$(triangleShapeRight).appendTo('#parent');
			//gives the shapes an id by calling their class array position
			$('.triangleRight:eq(' + p + ')').attr('id', 'trianglePuzzle_2' + n); // assigns an ID to the shape using the same name as the puzzle
			n++;
			m++;
			p++;
		}
	}
	//randomly rotates one of the shapes
	var degreePos = Math.floor(Math.random() * diffTop) + diffBottom; // rotating right
	var degreeNeg = Math.floor(Math.random() * (diffTop * (-1))) - (diffBottom - 1); // rotating left
	var degree;
	// randomly sets the direction of the rotation to left or right
	if((Math.floor(Math.random() * 2) + 1) == 1) {
		degree = degreePos;
	} else {
		degree = degreeNeg;
	}
	var rando = Math.floor(Math.random() * n); // picks a random number within the range of all the shapes built (by using 'n' which is how we named the shapes
	console.log("Number of triangles: " + n);
	$('#trianglePuzzle_2' + rando).css({
		'-webkit-transform': 'rotate(' + degree + 'deg)',
		'-moz-transform': 'rotate(' + degree + 'deg)',
        '-ms-transform': 'rotate(' + degree + 'deg)',
        '-o-transform': 'rotate(' + degree + 'deg)',
        'transform': 'rotate(' + degree + 'deg)',
		});
		$('#trianglePuzzle_2' + rando).attr('name', 'answer');
}

function squarePuzzle_2(){
	//makes second square puzzle
	//creates the shapes and gives them an id
	var n = 0; // used to number the shape IDs
	// function to make row "Square spacer Square"
	function S_S() {
		$(squareShapeSmall).appendTo('#parent');
		//gives the shapes an id by calling their class array position
		$('.squareSmall:eq(' + n + ')').attr('id', 'squarePuzzle_2' + n); // assigns an ID to the shape using the same name as the puzzle
		n++;
		// the spacer doesn't need an id
		$(spacerShape).appendTo('#parent');
		$(squareShapeSmall).appendTo('#parent');
		//gives the shapes an id by calling their class array position
		$('.squareSmall:eq(' + n + ')').attr('id', 'squarePuzzle_2' + n); // assigns an ID to the shape using the same name as the puzzle
		n++;
	}
	// function to make row "spacer Square spacer"
	function _S_() {
		// the spacer doesn't need an id
		$(spacerShape).appendTo('#parent');
		$(squareShapeSmall).appendTo('#parent');
		//gives the shapes an id by calling their class array position
		$('.squareSmall:eq(' + n + ')').attr('id', 'squarePuzzle_2' + n); // assigns an ID to the shape using the same name as the puzzle
		n++;
		// the spacer doesn't need an id
		$(spacerShape).appendTo('#parent');
	}
	for(i=0; i<1; i++){
		S_S();
		_S_();
		S_S();
		_S_();
		S_S();
	}
	//randomly rotates one of the shapes
	var degreePos = Math.floor(Math.random() * diffTop) + diffBottom; // rotating right
	var degreeNeg = Math.floor(Math.random() * (diffTop * (-1))) - (diffBottom - 1); // rotating left
	var degree;
	// randomly sets the direction of the rotation to left or right
	if((Math.floor(Math.random() * 2) + 1) == 1) {
		degree = degreePos;
	} else {
		degree = degreeNeg;
	}
	var rando = Math.floor(Math.random() * n); // picks a random number within the range of all the shapes built (by using 'n' which is how we named the shapes
	console.log("Number of triangles: " + n);
	$('#squarePuzzle_2' + rando).css({
		'-webkit-transform': 'rotate(' + degree + 'deg)',
		'-moz-transform': 'rotate(' + degree + 'deg)',
        '-ms-transform': 'rotate(' + degree + 'deg)',
        '-o-transform': 'rotate(' + degree + 'deg)',
        'transform': 'rotate(' + degree + 'deg)',
		});
		$('#squarePuzzle_2' + rando).attr('name', 'answer');
}

function squarePuzzle_3(){
	var w = "20vw";
	//makes third square puzzle
	// changes the width of the large square class
	var squareShape = "<div onmouseup='clicked(this)' class='squareLarge' style='width:" + w + "'></div>";
	//creates the shapes and gives them an id
	var n = 0;
	for(i=0; i<3; i++){
		for (j=0; j<4; j++){
			$(squareShape).appendTo('#parent');
			//gives the shapes an id by calling their class array position
			$('.squareLarge:eq(' + n + ')').attr('id', 'squarePuzzle_3' + n); // assigns an ID to the shape using the same name as the puzzle
			n++;
		}
	}
	//randomly rotates one of the shapes
	var degreePos = Math.floor(Math.random() * diffTop) + diffBottom; // rotating right
	var degreeNeg = Math.floor(Math.random() * (diffTop * (-1))) - (diffBottom - 1); // rotating left
	var degree;
	// randomly sets the direction of the rotation to left or right
	if((Math.floor(Math.random() * 2) + 1) == 1) {
		degree = degreePos;
	} else {
		degree = degreeNeg;
	}
	var rando = Math.floor(Math.random() * n);
	console.log("Number of boxes: " + n);
	$('#squarePuzzle_3' + rando).css({
		'-webkit-transform': 'rotate(' + degree + 'deg)',
		'-moz-transform': 'rotate(' + degree + 'deg)',
        '-ms-transform': 'rotate(' + degree + 'deg)',
        '-o-transform': 'rotate(' + degree + 'deg)',
        'transform': 'rotate(' + degree + 'deg)',
		});
		$('#squarePuzzle_3' + rando).attr('name', 'answer');
}








