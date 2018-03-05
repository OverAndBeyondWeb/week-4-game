//Game factory function
var Game = function(hero, characters) {
  this.hero = hero;
  this.enemies = [];
  this.chooseEnemies(characters);
};

//Game prototype methods
Game.prototype.chooseEnemies = function(characters) {

  //filter out evil characters
  var enemies = characters.filter(function(character) {
    return character.morality === 'evil';
  });
  
  //choose 3 evil characters randomly
  while (this.enemies.length < 3) {
    var randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    if (this.enemies.indexOf(randomEnemy) === -1) {
      this.enemies.push(randomEnemy);
    }
     
  }  
};

Game.prototype.declareWin = function() {
  console.log('you win');
};

Game.prototype.declareLoss = function() {
  console.log('you lose');
}


//Character Factory Function

var Character = function(name, healthPoints, attackPower, counterAttackPower, morality, image) {
    this.name = name;
    this.healthPoints = healthPoints;
    this.attackPower = attackPower;
    this.counterAttackPower = counterAttackPower;
    this.morality = morality;
    this.image = image;
    this.battlesWon = 0;
    this.registerForGame();
};

//Character prototype methods and properties

Character.prototype.characters = [];

Character.prototype.registerForGame = function() {
  this.characters.push(this);
};

Character.prototype.chooseAnOpponent = function(opponentThatWasClicked) {
  opponentThatWasClicked.find('img').css( "border-color", "green" );

  var opponent = Character.prototype.characters.filter(function(item) {
    return item.name === opponentThatWasClicked.find('span:first-child').text();
  })[0];


  $('.evil .character').off();

  var hero = this;

  $('.attack-btn').click(function() {

    hero.attack(opponent, opponentThatWasClicked);

  });
};

Character.prototype.attack = function(opponent, opponentNode) {
  var hero = this;
  opponent.healthPoints -= this.attackPower;
  if (opponent.healthPoints < 1) {
    opponentNode.animate({opacity: 0}, 1000).animate({width: [0, 'linear']}, 2000);
    this.battlesWon++;
    opponentNode.find('span:last-child').text(0);
    if (this.battlesWon < 3) {
      console.log($('attack-btn'));
      $('.attack-btn').off();
      $('.evil .character').click(function() {
        
        var characterToFight = $(this);
        hero.chooseAnOpponent(characterToFight);
      });
      setTimeout(function() {
        var singularOrPluralBattle;
        if (hero.battlesWon > 1) {
          singularOrPluralBattle = 'battles';
        } else {
          singularOrPluralBattle = 'battle';
        }
        alert('Choose another enemy, you hav won ' + hero.battlesWon + ' ' + singularOrPluralBattle);
        alert('choose another enemy to fight');
      }, 0);
    } else {
      alert('you won, game ove , nice work!');
    }
    
  }else {
    opponentNode.find('span:last-child').text(opponent.healthPoints);
    setTimeout(function() {
      opponent.counterAttack(hero)
    }, 200);
  }

  
};

Character.prototype.counterAttack = function(opponent) {
  alert('you have been hit, ' + opponent.name);
  opponent.healthPoints -= this.counterAttackPower;
  $('.character').has('button').find('span').eq(1).text(opponent.healthPoints);
  opponent.attackPower += 3;
};


// initialize characters

var daenerys = new Character('Daenerys Targaryen', 100, 8, 6,'good', 'daenerys-targaryen.jpg'),
  jon = new Character('Jon Snow', 100, 8, 6,'good', 'jon-snow.jpg'),
  eddard = new Character('Eddard Stark', 100, 8, 6,'good', 'eddard-stark.jpg'),
  brienne = new Character('Brienne of Tarth', 100, 8, 6, 'good', 'brienne-of-tarth.jpg'),
  bronn = new Character('Bronn', 100, 8, 6, 'good', 'bronn.jpg'),
  cersei = new Character('Cersei Lannister', 100, 8, 6, 'evil', 'cersei-lannister.jpg'),
  gregor = new Character('Gregor Clegane', 100, 8, 6, 'evil', 'gregor-clegane.jpg'),
  melisandre = new Character('Melisandre', 100, 8, 6, 'evil', 'melisandre.jpg'),
  stannis = new Character('Stannis Baratheon', 100, 8, 6, 'evil', 'stannis-baratheon.jpg'),
  petyr = new Character('Petyr Baelish', 100, 8, 6, 'evil', 'petyr-baelish.jpg');




// wait for document to load
$(document).ready(function() {
 
  // add characters to the document
  Character.prototype.characters.forEach(function(item) {
    var character = '<div class="character"><span>' + item.name + '</span><div class="char-img"><img src="assets/images/' + item.image + '"></div><span>' + item.healthPoints + '</span></div>';
    if (item.morality === 'good') {
      $('.good').append(character);
    } else if (item.morality === 'evil') {
      $('.evil').append(character);
    }
  });





  //click handler to start a game
  $('.good .character').click(function() {

    

    //get hero name from text of first child of li that was clicked
    var heroName = $(this).children(':first-child').text();

    //creates a 1 item array then extracts the 1 item for a reference to
    //the chosen good character
    var hero = Character.prototype.characters.filter(function(item) {
      return item.name === heroName;
    })[0];

    //new Game object initiated with the hero that was clicked on
    var game = new Game(hero, hero.characters);

    // click to choose a good character, fade out the others
    $('.good .character').not($(this)).animate({opacity: 0});

    //bring chosen character towards center of screen
    //and add an attack button
    $(this).animate({right: '10%', top: '150px', width: '20%'})
        .append('<button class="attack-btn">ATTACK</button>');

    //
    jQuery.each($('.evil .character'), function(index, value) {

      var el = $(value).find('span:first-child'),
        currentEnemyNames = game.enemies.map(function(item) {
          //creates an array of enemy names from the enemy objects
          return item.name;
        });

      //enemy elements that match the enemy objects of the current game
      //are brought towards the center of the screen,the others fade out
      if (currentEnemyNames.indexOf(el.text()) === -1) {
        $(this).animate({opacity: 0}, 1000).animate({width: [0, 'linear']}, 2000); 
      } else {
        $(this).animate({left: '-=45%', bottom: '+=40%', width: '16%'});
      }

    });

    //remove click from chosen character element
    $(this).off();

    //add click to remaining evil characters
    $('.evil .character').click(function() {

      //save a reference to the evil character element that was clicked
      var characterToFight = $(this);

      //pass the evil character reference to the good character object
      hero.chooseAnOpponent(characterToFight);

      //remove the click from all evil character elements
      $(this).off();
    });

  });
});




