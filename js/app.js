const kittenImage = document.getElementById('kitten-image');
const catImage = document.getElementById('cat-image');
const kittenCounter = document.querySelector('.kitten-count');
const catCounter = document.querySelector('.cat-count');
let kittenClicks = 0;
let catClicks = 0;
let catList = [];

let catContent = document.createElement('div');

kittenImage.addEventListener('click', function() {
  kittenClicks += 1;
  kittenCounter.innerText = kittenClicks;
});

catImage.addEventListener('click', function() {
  catClicks += 1;
  catCounter.innerText = catClicks;
});