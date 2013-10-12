// Load johnny five & create a board
var five = require('johnny-five');
var board, servo;

board = new five.Board();

board.on('ready', function(){
	// Servo hardware
	// define a range of 0 to 172 otherwise it will grind (only richard's servo)
	servo = new five.Servo({pin: 9, range: [0,172]});
	// servo = new five.Servo({pin: 9, range:[0,180]});

	// Allow direct commandline access
	board.repl.inject({
		servo: servo
	});

	servo.center();


});
