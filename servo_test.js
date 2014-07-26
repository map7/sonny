// Load johnny five, modules & create a board
var five = require('johnny-five'), board, servo, led;

board = new five.Board();

board.on('ready', function(){
	servo = new five.Servo({pin: 11, range:[0,180]});

	// Allow direct commandline access
	board.repl.inject({s: servo});
});
