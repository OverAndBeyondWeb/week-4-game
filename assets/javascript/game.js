//Game factory function

var Game = function(hero) {
  this.hero = hero;
  this.enemies = [];
  this.chooseEnemies();
  console.log(this);
}

//Game prototype methods

Game.prototype.chooseEnemies = function() {
  console.log('enemies chosen');
}
Game.prototype.declareWin = function() {
  console.log('you win');
}
Game.prototype.declareLoss = function() {
  console.log('you lose');
}










var daenerys = {
  name: 'Daenerys Targaryen',
  healthPoints: 100,
  attackPower: 8,
  counterAttackPower: 6,
  morality: 'good',
  image: 'daenerys-targaryen.jpg'
};

var jon = {
  name: 'Jon Snow',
  healthPoints: 100,
  attackPower: 8,
  counterAttackPower: 6,
  morality: 'good',
  image: 'jon-snow.jpg'
};

var eddard = {
  name: 'Eddard Stark',
  healthPoints: 100,
  attackPower: 8,
  counterAttackPower: 6,
  morality: 'good',
  image: 'eddard-stark.jpg'
};

var brienne = {
  name: 'Brienne of Tarth',
  healthPoints: 100,
  attackPower: 8,
  counterAttackPower: 6,
  morality: 'good',
  image: 'brienne-of-tarth.jpg'
};

var bronn = {
  name: 'Bronn',
  healthPoints: 100,
  attackPower: 8,
  counterAttackPower: 6,
  morality: 'good',
  image: 'bronn.jpg'
};

var cersei = {
  name: 'Cersei Lannister',
  healthPoints: 100,
  attackPower: 8,
  counterAttackPower: 6,
  morality: 'evil',
  image: 'cersei-lannister.jpg'
};

var gregor = {
  name: 'Gregor Clegane',
  healthPoints: 100,
  attackPower: 8,
  counterAttackPower: 6,
  morality: 'evil',
  image: 'gregor-clegane.jpg'
};

var melisandre = {
  name: 'Melisandre',
  healthPoints: 100,
  attackPower: 8,
  counterAttackPower: 6,
  morality: 'evil',
  image: 'melisandre.jpg'
};

var stannis = {
  name: 'Stannis Baratheon',
  healthPoints: 100,
  attackPower: 8,
  counterAttackPower: 6,
  morality: 'evil',
  image: 'stannis-baratheon.jpg'
};

var petyr = {
  name: 'Petyr Baelish',
  healthPoints: 100,
  attackPower: 8,
  counterAttackPower: 6,
  morality: 'evil',
  image: 'petyr-baelish.jpg'
};

var characters = [
  daenerys,
  eddard,
  jon,
  brienne,
  bronn,
  cersei,
  gregor,
  melisandre,
  stannis,
  petyr,
];

characters.forEach(function(item) {
  var character = '<li><span>' + item.name + '</span><div class="char-img"><img src="assets/images/' + item.image + '"></div><span>' + item.healthPoints + '</span></li>';
  if (item.morality === 'good') {
    $('.good-guys').append(character);
  } else if (item.morality === 'evil') {
    $('.bad-guys').append(character);
  }
  
});

$('.good-guys li').click(function() {
  // What happens in the UI
  $('.good-guys li').not($(this)).animate({opacity: 0});

  $(this).addClass('selected');
  $('.bad-guys').addClass('enemies-selected');

  $('.first-instruction').delay(2500).fadeOut(8000);
  $('.second-instruction').delay(8000).fadeIn(6000);
  $('.third-instruction').delay(20000).fadeIn(8000);

  /************ Logic *************/

  //choose hero object based on text of first child of li that was clicked
  var heroName = $(this).children(':first-child').text();

  //creates a 1 item array then extracts the 1 item
  var hero = characters.filter(function(item) {
    return item.name === heroName;
  })[0];

  //new Game object initiated with the hero that was clicked on
  var game = new Game(hero);

});

