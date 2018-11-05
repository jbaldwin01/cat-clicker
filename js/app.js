	/* Implement Seperation of Concerns using Model View Octopus (MVO) */
	/* Model and View should never interact directly. Only through the Octopus */
	/* =========== Model ========== */
	const model = {
		currentCat: null,
		cats:	[
		{name: 'Cat 1', clickCount: 0, imgUrl: 'img/cat_picture1.jpg'},
		{name: 'Cat 2', clickCount: 0, imgUrl: 'img/cat_picture2.jpg'},
		{name: 'Cat 3', clickCount: 0, imgUrl: 'img/cat_picture3.jpg'},
		{name: 'Cat 4', clickCount: 0, imgUrl: 'img/cat_picture4.jpg'},
		{name: 'Cat 5', clickCount: 0, imgUrl: 'img/cat_picture5.jpg'},
		{name: 'Cat 6', clickCount: 0, imgUrl: 'img/cat_picture6.jpg'},
		{name: 'Cat 7', clickCount: 0, imgUrl: 'img/cat_picture7.jpg'}
		]
	};

	/* =========== Views ========== */
	const listView = {
		init() {
			this.catListElement = document.getElementById('catlist');
			this.render();
		},

		render() {
			// create a button for each cat
			let buttons = [];
			for(cat of octopus.getCats()) {
				let button = document.createElement('button');
				button.setAttribute('id', `${cat.name}`);
				button.textContent = cat.name;
				button.addEventListener('click', (function(cat) {
					return function() {
						octopus.setCurrentCat(cat);
						displayView.render();
					};
				})(cat));
				buttons.push(button);

			};
			// add buttons to DOM
			for(button of buttons) {
				this.catListElement.appendChild(button);
			};
		}
	};

	const displayView = {
		init() {
			// set DOM elements with values from current cat
			this.catElem = document.getElementById('cat');
			this.catNameElem = document.getElementById('cat-name');
			this.catCounterElem = document.getElementById('cat-counter');
			this.catImgElem = document.getElementById('cat-img');

			// setup click event on the cat image
			this.catImgElem.addEventListener('click', function() {
				octopus.incrementCounter();
			});

			this.render();
		},

		render() {
			let currentCat = octopus.getCurrentCat();
			this.catNameElem.textContent = currentCat.name;
			this.catCounterElem.textContent = currentCat.clickCount;
			this.catImgElem.src = currentCat.imgUrl;
		}
	};

	/* =========== Octopus ========== */
	const octopus = {
		init() {
			model.currentCat = model.cats[0];
			listView.init();
			displayView.init();
		},

		getCurrentCat() {
			return model.currentCat;
		},

		getCats() {
			return model.cats;
		},

		setCurrentCat(cat) {
			model.currentCat = cat;
		},

		incrementCounter() {
			model.currentCat.clickCount ++;
			displayView.render();
		}
	};

	octopus.init();
	