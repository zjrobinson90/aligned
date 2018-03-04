


var square = "<div onmouseup='clicked(this)' class='square'></div>";
var triangle = "<div onmouseup='clicked(this)' class='triangle'></div>";

window.onload = function() {
	setupGame();
}

function setupGame(){
	squarePuzzle_1()
}

//rotates the selected shape back to 0 or shows a 'wrong' response
function clicked(x) {
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
	setTimeout(window.location.reload.bind(window.location), 750);
}

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


/*
window.onload = function() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	makeShapes();
}
*/





















