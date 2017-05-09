/*
Art is 2.5-D style. Keep that in mind when programming.


Main character is a mail man when starting off. Maybe a mine worker by the end.
RPG-walking simulator?

Mechanics:  walking
				-walking will be free movement style based.
			
			interacting, talking with people, dialogue choices.

Ideas: Rally you cna go to for possible story ending or just going home. Possibly affect change of story.
		-people enter your mail office in government attire and you aren't sure what they are doing. Possible beginning story arc.

		Phase 1: Just go deliver a simple package and talk to your neighbors. Pretty simple.
*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var counter=0;
var text;

var character;
var npc1;

var dialogue;
var dialogueTimmer=-1;
var dialogueBox;

function preload(){
	this.game.load.image('ship','assets/img/ship.png');
	this.game.load.image("tier1Button","assets/img/Buttons/buttonTier1.png");
	this.game.load.image("masterClickButton","assets/img/Buttons/buttonTier1.png");
	this.game.load.image("Player","assets/img/Player/player.png");
	this.game.load.image("DialogueBox","assets/img/Displays/DialogueBox.png");

}

function createAllNPCS(){
	npc1= new genericNPCStructure(game.world.centerX*1.3,game.world.centerY*1.3,"ship");
	this.game.physics.arcade.enable(npc1);
	npc1.enableBody=true;
	npc1.body.collideWorldBounds=true;
	npc1.body.immovable=true;
	game.add.existing(npc1);
}

function createCharacter(){
	character= new player(game.world.centerX,game.world.centerY);
	this.game.physics.arcade.enable(character);
	character.enableBody=true;
	character.body.collideWorldBounds=true;
	character.body.onCollide = new Phaser.Signal();
	character.body.onCollide.add(character.talk, this);
	game.add.existing(character);	
}

function create(){
	console.log("WTF");
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	createAllNPCS();
	createCharacter();
	game.time.events.loop(Phaser.Timer.SECOND, dialogueCountDown, this);
}

function listener(){
	counter++;
//text.text="You clicked "+ counter + " times!";
}

function update(){
	 game.physics.arcade.collide(character, npc1);
}

function render(){

}


function dialogueCountDown(){
	
	if(dialogueTimmer==0){
		//clear dialogue
		dialogue.destroy();
		dialogueTimmer=-1;
		dialogueBox.kill();
		console.log("Boom");
	}
	else if(dialogueTimmer>0){
		console.log(dialogueTimmer);
		dialogueTimmer--;
	}
}

