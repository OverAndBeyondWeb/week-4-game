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
  console.log($(this));
  $('.good-guys li').not($(this)).animate({opacity: 0});

  $(this).addClass('selected');
  $('.bad-guys').addClass('enemies-selected');
});

