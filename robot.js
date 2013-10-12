// Load keyboard control
var keypress = require('keypress');
// keypress(process.stdin);

// Load johnny five & create a board
var five = require('johnny-five'), board, servo;

var stop=89;

board = new five.Board();

board.on('ready', function(){
	// Servo hardware
	// define a range of 0 to 172 otherwise it will grind (only richard's servo)
	servos = {
		left: five.Servo({pin: 9, range: [0,170]}),
		right: five.Servo({pin: 10, range: [0,170]})
	};
	// servo = new five.Servo({pin: 9, range:[0,180]});

	// Allow direct commandline access
	board.repl.inject({
		s: servos
	});

	// Center servo
	servos.left.move(stop);
	servos.right.move(stop);

	// this.wait(1000, function(){
	// 	servos.left.sweep();
	// });

	// listen
	process.stdin.on('keypress', function(ch,key){
		// console.log('got keypress', key);

		if (key.name == 'space') {
			servos.left.move(stop);
			servos.right.move(stop);
		};

		if (key.name == 'up') {
			servos.left.move(98);
			servos.right.move(80);
		};

		if (key.name == 'right') {
			servos.left.move(80);
			servos.right.move(80);
		};

		if (key.name == 'down') {
			servos.left.move(80);
			servos.right.move(98);
		};

		if (key.name == 'left') {
			servos.left.move(98);
			servos.right.move(98);
		};


	});

});
