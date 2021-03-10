// Each time this function is called a GameObject
// is create based on the arguments
// In JavaScript you can consider everything an Object
// including functions

var gameScore;
	var enemyNeedsMoveLocation = false;

 	var canvas = document.getElementById("the_canvas");
 // get 2D context for this canvas
var context = canvas.getContext("2d");
	    // Total Frames
 var rawString = window.location.search;
	var search = rawString.split("=");
	console.log(search[0]);
	console.log(search[1]);
    var frames = 6;

    // Current Frame
    var currentFrame = 0;

	var enemyMoving = false;
	var sprite1 = new Image();
	var sprite = new Image();
    sprite.src = "./img/Player.png"; // Frames 1 to 6
	sprite1.src = "./img/1to6.png";

	var floorSprite = new Image();
	floorSprite.src = "./img/floorSprite.png";

	var caveExitSprite = new Image();
	caveExitSprite.src ="./img/caveExit.png";
	
	var wallSprite = new Image();
	wallSprite.src = './img/BrickWall.png';
	
	var playerTurn = true;
	
	
	
	var initial = new Date().getTime();
  var currentFrame = 0;
  
  var current; // current time

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input

// Default Player
var player = new GameObject("Player", sprite, 100,35,35);
var enemy = new GameObject("enemy", sprite, 100,35*8,35*8);
var doorKey = new keyObject();
// Gameobjects is a collection of the Actors within the game
	
	
	
	
// Reading Level Information from a file
  var readJSONFromURL = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = function () {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };

    xhr.send();
  };

  readJSONFromURL('./data/myPoints.json', function (err, data) {
    if (err != null) {
      console.error(err);
    } else {
      var text = data["score"];
      gameScore = text;
	 console.log("score :", gameScore);
    }
  });
  

function onPageLoad()
{
	console.log("should resize");
	setName();
	//context.scale(.25,.25);
	window.innerWidth = window.outerWidth;
	window.innerHeight = window.outerHeight;
	
	'use strict';
	if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./service_worker.js');
			   console.log("register function");
    }
	console.log("try to fetch manifest");
	initLevel();
	
	
}

function updateScore() {
    document.getElementById("Points").innerHTML = gameScore;

}
	
	






function enemySwitch(){
	enemyMoving = !enemyMoving;
	//gameobjects[0].health = 100;
	console.log("switch");
	
}

function setName(){
	
	console.log("setName");
	document.getElementById("Name").innerHTML = search[1];
    console.log("Weapon Selected");
}


function GameObject(name, img, health,x,y) {
    this.name = name;
    this.img = img;
    this.health = localStorage.getItem("health");
	console.log(health);
    this.x = x;
    this.y = y;
	var nextMovePositionX = 0;
	var nextMovePositionY = 0;
	
}

function keyObject() {
	
	var keySprite = new Image();
	keySprite.src = './img/Key.png';
	
    this.img = keySprite;
	this.active = true;
    this.x = 0;
    this.y = 0;
	
}

function initLevel()
{
	initEnemy();
	player.x = 35;
	player.y = 35;
	
	doorKey.x = Math.floor((Math.random() * 8) + 1) * 35;	
	doorKey.y = Math.floor((Math.random() * 8) + 1) * 35;
	doorKey.active = true;
}


function initEnemy()
{
	enemy.x = Math.floor((Math.random() * 8) + 1) * 35;
	enemy.y = Math.floor((Math.random() * 8) + 1) * 35;
	if (enemy.x == 35 || enemy.y == 35)
	{
		initEnemy();
	}
}

// The GamerInput is an Object that holds the Current
// GamerInput (Left, Right, Up, Down)
function GamerInput(input) {
    this.action = input;
}
 


// Process keyboard input event
function input(event) {
    // Take Input from the Player
    // console.log("Input");
    // console.log("Event type: " + event.type);

  
    // console.log("Gamer Input :" + gamerInput.action);
}

function moveLeft(){
	if (playerTurn)
	{
	gamerInput = new GamerInput("Left");
	player.nextMovePositionX = player.x - 35;
	if (player.nextMovePositionX == 0)
	{
		player.nextMovePositionX = player.x;
	}
	
	console.log("left");
	playerTurn = false;
	enemyNeedsMoveLocation = true;
	}	
}

function moveRight(){
	if (playerTurn)
	{
	player.nextMovePositionX = player.x + 35;
	if (player.nextMovePositionX == 315)
	{
		player.nextMovePositionX = player.x;
	}
	gamerInput = new GamerInput("Right");
	console.log("right");
	playerTurn = false;
	enemyNeedsMoveLocation = true;
	//gamerInput = new gamerInput("none");
	}
}


function moveUp(){
	if (playerTurn)
	{
	player.nextMovePositionY = player.y - 35;
	if (player.nextMovePositionY == 0)
	{
		player.nextMovePositionY = player.y;
	}
	gamerInput = new GamerInput("Up");
	console.log("up");
	playerTurn = false;
	enemyNeedsMoveLocation = true;
	}
}

function moveDown(){
	if (playerTurn )
	{
	player.nextMovePositionY = player.y + 35;
	if (player.nextMovePositionY == 315)
	{
		player.nextMovePositionY = player.y;
	}
	 gamerInput = new GamerInput("Down");
	console.log("down");
	playerTurn = false;
	enemyNeedsMoveLocation = true;
	}
}



function takeEnemyTurn()
{
	if (playerTurn == false)
	{
		
	
	if (player.x < enemy.x && enemyNeedsMoveLocation == true)
	{
	enemy.nextMovePositionX = enemy.x - 35;
	enemy.nextMovePositionY = enemy.y;
	enemyNeedsMoveLocation = false;
	
	}

	else if (player.x > enemy.x && enemyNeedsMoveLocation == true)
	{
	enemy.nextMovePositionX = enemy.x + 35;
	enemy.nextMovePositionY = enemy.y;
	enemyNeedsMoveLocation = false;
	}
	
	


	else if (player.y < enemy.y && enemyNeedsMoveLocation == true)
	{
	enemy.nextMovePositionY = enemy.y - 35;
	enemy.nextMovePositionX = enemy.x;
	enemyNeedsMoveLocation = false;
	}
	
	

	else if (player.y > enemy.y && enemyNeedsMoveLocation == true)
	{
	enemy.nextMovePositionY = enemy.y + 35;
	enemy.nextMovePositionX = enemy.x;
	enemyNeedsMoveLocation = false;
	}
	
	
	if (enemy.nextMovePositionX == player.nextMovePositionX && enemy.nextMovePositionY==player.nextMovePositionY)
	{
		console.log("player gets hit");
		player.health -=30;
		playerTurn = true;
	}
	
	
	else if (enemy.x < enemy.nextMovePositionX)
	{
		enemy.x+=1;
		console.log("enemy moving rigfht");
	}
	else if (enemy.x > enemy.nextMovePositionX)
	{
		enemy.x-=1;
		console.log("enemy moving left");
	}
	
	else if (enemy.y > enemy.nextMovePositionY)
	{
		enemy.y-=1;
		console.log("enemy moving down");
	}
	else if (enemy.y < enemy.nextMovePositionY)
	{
		enemy.y+=1;
		console.log("enemy moving up");
	}
	
	}
		
		
		
	if (enemy.x == enemy.nextMovePositionX && enemy.y == enemy.nextMovePositionY)
	{
	playerTurn = true;
	
	}
	

	
	
	
	
	
	
	
	
	
	
	
}

function update() {
    // Iterate through all GameObjects
    // Updating position and gamestate
    // console.log("Update");
	updateScore();
	
	
	takeEnemyTurn();
	
	
	if (player.x == 280 && player.y == 280 && doorKey.active == false)
	{
		initLevel();
	}
	
	if (player.x == doorKey.x && player.y == doorKey.y)
	{
		doorKey.active = false;
	}
	
	
	if (player.x == enemy.x && player.y == enemy.y && playerTurn == false)
	{
		console.log("player gets hit");
		player.health -=30;
	}
	
	if (gamerInput.action === "Up") {
		  if (player.y != player.nextMovePositionY)
		{
			player.y += -1;
            console.log("Up");
		}
        }
		else if (gamerInput.action === "Down") {
               if (player.y != player.nextMovePositionY)
			{
                player.y += 1;
                console.log("Down");
			}
            }
		else if (gamerInput.action === "Right") {
                if (player.x != player.nextMovePositionX)
			{
                player.x += 1;
                console.log("Right");
			}	
            }
		else if (gamerInput.action === "Left") {
               if (player.x != player.nextMovePositionX)
			{
                player.x += -1;
                console.log("Left");
			}
            }
	if (player.y == player.nextMovePositionY && player.x == player.nextMovePositionX)
	{
		gamerInput = new GamerInput("None"); //No Input
	}
}


function weaponSelection() {
	console.log("weaponSelect");
  var selection = document.getElementById("equipment").value;
  console.log(selection);
  var active = document.getElementById("active");
  console.log(active);
  if (active.checked == true) {
    document.getElementById("HUD").innerHTML = selection + " active ";
    console.log("Weapon Active");
  } else {
    document.getElementById("HUD").innerHTML = selection + " selected ";
    console.log("Weapon Selected");
  }
}



// Draw GameObjects to Console
// Modify to Draw to Screen
function draw() {
    // Clear Canvas
    // Iterate through all GameObjects
    // Draw each GameObject
    // console.log("Draw");
	
	context.clearRect(0, 0, canvas.width * 4, canvas.height * 4);

	

    // Sprite
   
	
    //for (i = 0; i < gameobjects.length; i++) {
    //    if (gameobjects[i].health > 0) {
            // console.log("Image :" + gameobjects[i].img);
    //    }
  //  }
	
	
	//context.clearRect(0, 0, canvas.width * 4, canvas.height * 4);
	
    //context.drawImage(gameobjects[1].img, (sprite.width / 6) * currentFrame, 0, 100, 100, gameobjects[1].x, gameobjects[1].y, 256, 256);	
	
	
	for (var i = 0; i < 10; i ++)
	{
		for (var j = 0; j <10; j++)
		{
			context.beginPath();
			
			
			if (j==0 || i==0 || j==9 || i==9)
			{
				context.fillStyle = "#000000";
				context.fill();
				drawOuterWalls();
				
			}
			//context.rect(i *35, j * 35, 35, 35);
			context.stroke();
			
		}
	}
	
	context.drawImage(player.img, player.x,player.y);
	context.drawImage(enemy.img, enemy.x,enemy.y);
	animate();
	if (doorKey.active)
	{
	context.drawImage(doorKey.img,doorKey.x,doorKey.y);
	}
	else 
	{
		context.drawImage(doorKey.img,player.x,player.y);
	}
   var width = 100;
   var height = 20;
   var max = 100;
  

  // Draw the background
  context.fillStyle = "#000000";
 
  context.fillRect(0, 0, width, height);
	
  // Draw the fill
  context.fillStyle = "#00FF00";
  var fillVal = Math.min(Math.max(player.health / max, 0), 1);
  context.fillRect(0, 0, fillVal * width, height);
	context.stroke();
}


function drawOuterWalls()
{
	
	
	
		context.drawImage(floorSprite,0,0 ); //draw sprite for floor
	
	
	for (var i = 0; i <10; i++)//draw sprites for outer walls
	{
	
	context.drawImage(wallSprite,i*35,0);
	
	context.drawImage(wallSprite,0,i*35);
	
	context.drawImage(wallSprite,35 * 9,i*35);
	
	context.drawImage(wallSprite,i*35,9 *35);
	}
	context.drawImage(caveExitSprite,280,280);
}


var options = [{
    "text": "This is a selection box",
    "value": "No Weapon",
    "selected": true
  },
  {
    "text": "Pistol",
    "value": "Handgun"
  },
  {
    "text": "Rifle",
    "value": "Sniper Rifle"
  },
  {
    "text": "shotgun",
    "value": "Pump-action shotgun"
  }
];

var selectBox = document.getElementById('equipment');

for (var i = 0; i < options.length; i++) {
  var option = options[i];
  selectBox.options.add(new Option(option.text, option.value, option.selected));
}



function animate() {
	
	
	
    current = new Date().getTime(); // update current
    if (current - initial >= 500) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
    } 
	console.log(currentFrame);
}

function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

function reportWindowSize() {
 // window.innerWidth = window.outerWidth;
 // window.innerHeight = window.outerHeight;
 // the_canvas.height = window.innerHeight - 500;
  //context.scale(.25,.25);
  console.log("window resized");
}


// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// Handle Keypressed
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);
window.addEventListener('resize', reportWindowSize);
