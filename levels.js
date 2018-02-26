


var square = "<div onmouseup='clicked(this)' class='square'></div>";

window.onload = function() {
	setupGame();
}

function setupGame(){
	//creates the shapes
	var n = 0;
	for(i=0; i<5; i++){
		for (j=0; j<5; j++){
			$(square).appendTo('#parent');
			$('.square:eq(' + n + ')').attr('id', 'square' + n);
			n++;
		}
	}
	

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

}



/*
var canvas;
var context;
var circles=[];
var squares=[];

function degreesToRadians(degrees) {
	return(degrees * Math.PI)/180;
}

function makeShapes(){
	//creates shadows for all shapes
	context.shadowColor="black";
	context.shadowBlur="20";
	context.shadowOffsetX=5;
	context.shadowOffsetY=5;
	
	for(i = 0; i < 5; i++){
		circles.push(new circle(100 + (i*200), canvas.height/2));
	}

	for(i = 0; i < 5; i++){
		var size = 200;
		var xPos = 250;
		var yPos = 250;
		context.save();
		if(i == 1){
			context.translate(size, size);
			//context.translate(xPos + (size / 2), yPos +  (size / 2));
			context.rotate(Math.PI / 45);
			context.translate(-size, -size);
			//context.translate(-1 * (xPos + (size / 2)), -1 * (yPos +  (size / 2)));
			squares.push(new square(xPos + (i * (size + 10)), yPos, size));
		} else {
			squares.push(new square(xPos + (i * (size + 10)), yPos, size));
		}
		context.restore();
	}
}

function square(x, y, s){
	context.beginPath();
	context.rect(x, y, s, s);
	context.strokeStyle="black";
	context.lineWidth=5;
	context.fillStyle="lightgray";
	context.stroke();
	context.fill();
}

function circle(x, y){
	context.beginPath();
	var radius = 100;
	context.arc(x, y, radius, 0, 2*Math.PI);
	context.strokeStyle="black";
	context.lineWidth=5;
	context.fillStyle="lightgray";
	context.stroke();
	context.fill();
	//context.fill();
}


window.onload = function() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	makeShapes();
}
*/





















