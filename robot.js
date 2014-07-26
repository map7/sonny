// Load keyboard control
var keypress = require('keypress');
// keypress(process.stdin);

// Load johnny five, modules & create a board
var five = require('johnny-five'), board, servo, led;

// Set my stop points
var STOP_RIGHT=86;
var STOP_LEFT=86;
var SPEED=10;

board = new five.Board();

board.on('ready', function(){
	// Servo hardware defining a range

	servos = {
		left: five.Servo({pin: 9,
						  range: [0,180],
						  startAt: STOP_LEFT,
						  isInverted: false
						 }
						),
		right: five.Servo({pin: 10,
						   range: [0,180],
						   startAt: STOP_RIGHT,
						   isInverted: true
						  }
						 )
	};
	servo = new five.Servo({pin: 10, range:[0,180]});

	// Brake light
 	var led = new five.Led({pin: 13});

	// Allow direct commandline access
	board.repl.inject({
		s: servos,
		led: led
	});

	// this.wait(1000, function(){
	// 	servos.left.sweep();
	// });

	// listen
	process.stdin.on('keypress', function(ch,key){
		console.log('got keypress', key);

		if (key.name == 'space') {
			servos.left.move(STOP_LEFT);
			servos.right.move(STOP_RIGHT);
			led.on();
		};

		if (key.name == 'up') {
			servos.left.move(STOP_LEFT - SPEED);
			servos.right.move(STOP_RIGHT + SPEED);
			led.off();
		};

		if (key.name == 'right') {
			servos.left.move(STOP_LEFT - SPEED);
			servos.right.move(STOP_RIGHT - SPEED);
			led.off();
		};

		if (key.name == 'left') {
			servos.left.move(STOP_LEFT + SPEED);
			servos.right.move(STOP_RIGHT + SPEED);
			led.off();
		};

		if (key.name == 'down') {
			servos.left.move(STOP_LEFT + SPEED);
			servos.right.move(STOP_RIGHT - SPEED);
			led.off();
		};


	});

});
