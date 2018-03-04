

var square = "<div onmouseup='clicked(this)' class='square'></div>";
var triangle = "<div onmouseup='clicked(this)' class='triangle'></div>";

// Setting up function to vibrate phone
function vibrate() {
	try{
		navigator.vibrate([5]);
	}catch(e){}
}

window.onload = function() {
	setupGame();
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
	//refreshes the page so the puzzle resets (THIS NEEDS TO BE CHANGES TO MOVE TO NEXT PUZZLE)
	setTimeout(window.location.reload.bind(window.location), 500);
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
	console.log($('.square').length);
	$('#square' + rando).css({
		'-webkit-transform': 'rotate(' + degree + 'deg)',
		'-moz-transform': 'rotate(' + degree + 'deg)',
        '-ms-transform': 'rotate(' + degree + 'deg)',
        '-o-transform': 'rotate(' + degree + 'deg)',
        'transform': 'rotate(' + degree + 'deg)',
		});
		$('#square' + rando).attr('name', 'answer');
}



//code that looks to see if the phone is in portrait and then asks them to turn it back
window.addEventListener("resize", function() {
	if( window.outerWidth > window.outerHeight ){
		window.scrollTo(1,1);
		$('#landscape').show();
		lockScroll();
		}else{
			$('#landscape').hide();
			unLockScroll();
			}
		}, false);
// There are two functions lockScroll() and unLockScroll() which are used to prevent scrolling of the webpage.
function lockScroll(){
	$(document).bind("touchmove",function(event){
		event.preventDefault();
		});
}
function unLockScroll(){
	$(document).unbind("touchmove");
}


