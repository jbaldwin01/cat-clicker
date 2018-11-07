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
		],
		showAdmin: false
	};

	/* =========== Views ========== */
	const listView = {
		init() {
			this.catListElement = document.getElementById('catlist');
			this.render();
		},

		render() {
			this.catListElement.innerHTML = '';
			// create a button for each cat
			let buttons = [];
			for(cat of octopus.getCats()) {
				let button = document.createElement('button');
				button.setAttribute('id', `${cat.name}`);
				button.setAttribute('type', 'button');
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

	const adminView = {
		init() {
			let showAdmin = octopus.isAdminVisible();
			this.adminFormElem = document.getElementById('admin-form');
			this.inputNameElem = document.getElementById('input-name');
			this.inputURLElem = document.getElementById('input-url');
			this.inputNumClicksElem = document.getElementById('input-num-clicks');
			
			this.AdminElem = document.getElementById('admin-button');
			this.cancelElem = document.getElementById('cancel');
			this.submitElem = document.getElementById('submit');
			
			this.AdminElem.addEventListener('click', function() {
				octopus.isAdminVisible() ? octopus.setShowAdmin(false) : octopus.setShowAdmin(true);	
				adminView.render();
			});

			this.cancelElem.addEventListener('click', function() {
				octopus.setShowAdmin(false);
				adminView.render();
			});

			this.submitElem.addEventListener('click', function() {
				this.inputNameElem = document.getElementById('input-name');
				this.inputURLElem = document.getElementById('input-url');
				this.inputNumClicksElem = document.getElementById('input-num-clicks');

				octopus.setCurrentCatName(this.inputNameElem.value);
				octopus.setCurrentCatImgUrl(this.inputURLElem.value);
				octopus.setCurrentCatClicks(this.inputNumClicksElem.value);
				octopus.setShowAdmin(false);
				listView.render();
				displayView.render();
				adminView.render();
			});
		},

		render() {
			let showAdmin = octopus.isAdminVisible();
			octopus.isAdminVisible() ? this.adminFormElem.style.visibility = 'visible' : this.adminFormElem.style.visibility = 'hidden';
			this.inputNameElem.value = octopus.getCurrentCat().name;
			this.inputURLElem.value = octopus.getCurrentCat().imgUrl;
			this.inputNumClicksElem.value = octopus.getCurrentCat().clickCount;
		}
	};

	/* =========== Octopus ========== */
	const octopus = {
		init() {
			model.currentCat = model.cats[0];
			listView.init();
			displayView.init();
			adminView.init();
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

		setCurrentCatName(name) {
			model.currentCat.name = name;
		},

		setCurrentCatImgUrl(url) {
			model.currentCat.imgUrl = url;
		},

		setCurrentCatClicks(num) {
			model.currentCat.clickCount = num;
		},

		setShowAdmin(bool) {
			model.showAdmin = bool;
		},

		isAdminVisible() {
			return model.showAdmin ? true : false;
		},

		incrementCounter() {
			model.currentCat.clickCount ++;
			displayView.render();
		}
	};

	octopus.init();