'use strict';
$(function() {
	var Person = function() {
		var $person = $('#person');

		var commands = [];
		var undoneCommands = [];
		var availableCommands = {
			moveLeft: {
				do: function() {
					$person.css('left', parseInt($person.css('left'), 10) - 10);
				},
				undo: function() {
					availableCommands.moveRight.do();
				}
			},

			moveRight: {
				do: function() {
					$person.css('left', parseInt($person.css('left'), 10) + 10);
				},
				undo: function() {
					availableCommands.moveLeft.do();
				}
			},

			moveUp: {
				do: function() {
					$person.css('top', parseInt($person.css('top'), 10) - 10);
				},
				undo: function() {
					availableCommands.moveDown.do();
				}
			},

			moveDown: {
				do: function() {
					$person.css('top', parseInt($person.css('top'), 10) + 10);
				},
				undo: function() {
					availableCommands.moveUp.do();
				}
			}
		};

		return {
			execute: function(cmd) {
				commands.push(cmd);
				availableCommands[cmd].do.apply();
				undoneCommands = [];
			},
			undo: function() {
				if(commands.length > 0){
					var command = commands.pop();
					undoneCommands.push(command);
					availableCommands[command].undo.apply();
				}else{
					console.log('No commands to undo');
				}
				
			},
			redo: function() {
				if(undoneCommands.length > 0){
					var command = undoneCommands.pop();
					commands.push(command);
					availableCommands[command].do.apply();
				}else{
					console.log('No commands to redo');
				}
				
			}
		};

	};

	var person = new Person();

	$('.commands li').click(function() {
		var cmd = $(this).data('cmd');
		if(cmd === 'undo') {
			person.undo();
		}
		else if(cmd === 'redo') {
			person.redo();
		}
		else {
			person.execute(cmd);
		}
	});
});