'use strict';

(function() {
	/////////
	/////////
	/////////
	/// Setup
	/////////
	/////////
	/////////
	function ObserverList() {
		return {
			observerList: [],
			add: function(obj) {
				return this.observerList.push(obj);
			},
			count: function() {
				return this.observerList.length;
			},
			get: function(index) {
				if (index > -1 && index < this.observerList.length) {
					return this.observerList[index];
				}
			},
			indexOf: function(obj, startIndex) {
				var i = startIndex;
				while (i < this.observerList.length) {
					if (this.observerList[i] === obj) {
						return i;
					}
					i++;
				}

				return -1;
			},
			removeAt: function(index) {
				if (index > -1 && index < this.observerList.length) {
					this.observerList.splice(index, 1);
				}
			}
		};
	}

	function Subject() {
		return {
			observers: new ObserverList(),
			addObserver: function(observer){
				this.observers.add(observer);
			},
			removeObserver: function(observer){
				this.observers.removeAt(this.observers.indexOf( observer, 0) );
			},
			notify: function(context){
				var observerCount = this.observers.count();
				for(var i=0; i < observerCount; i++){
					this.observers.get(i).update( context );
				}
			}
		};
	}

	function Observer() {
		return{
			update: function() {

			}
		};
	}

	// Extend an object with an extension
	function extend(extension, obj) {
		for(var key in extension) {
			obj[key] = extension[key];
		}
	}



	/////////
	/////////
	/////////
	/// Implementation
	/////////
	/////////
	/////////

	// References to our DOM elements

	var $controlCheckbox = $('#mainCheckbox');
	var $addBtn = $('#addNewObserver');
	var $container = $('#observersContainer');

	//////
	// Concrete Subject
	//////

	// Extend the controlling checkbox with the Subject class
	extend(new Subject(), $controlCheckbox.get(0));

	// Clicking the checkbox will trigger notifications to its observers
	$controlCheckbox.click(function() {
		this.notify($controlCheckbox.get(0).checked);
	});

	//////
	// Concrete Observer
	//////

	function addNewObserver() {
		// Create a new checkbox to be added
		console.log('addNewObserver');
		var check = document.createElement('input');
		check.type = 'checkbox';

		//Extend the checkbox with the Observer class
		extend( new Observer(), check);

		// Override with custom update behaviour
		check.update = function(value) {
			this.checked = value;
		};

		// Add the new observer to our list of observers
		// for our main subject
		$controlCheckbox.get(0).addObserver(check);

		// Append the item to the container

		$container.append(check);
	}

	$addBtn.click(function() {
		addNewObserver();
	});

})();
