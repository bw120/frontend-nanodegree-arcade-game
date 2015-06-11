// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.enemySpeed = this.setSpeed(gManager.gameLevel * 100);
    this.enemyLane = this.setLane();
    this.x = this.setXloc();
    this.y = this.setYloc();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //moves enemies left to right
    this.x = this.x + this.enemySpeed * dt;

    //if enemies go off screen it returns them to the left of the canvas
    if (this.x > canvas.width) {
        this.x = -101;
        //change lanes & speed
        this.setLane();
        this.setSpeed(gManager.gameLevel * 100);
    }
};

//checks if enemies occupy the same space
Enemy.prototype.collisions = function() {
    //define space used by player
    var playerLeft = player.x + 10;
    var playerRight = player.x + 90;
    var playerTop = player.y;
    var playerBottom = player.y + 70;

    //define space used by enemy
    var enemyLeft = this.x + 10;
    var enemyRight = this.x + 90;
    var enemyTop = this.y;
    var enemyBottom = this.y + 70;

    //check if they overlap
    if (enemyLeft <= playerRight && enemyRight >= playerLeft && enemyTop <= playerBottom && enemyBottom >= playerTop) {
        player.die();
    }
};

//generate random speed so all enemies speeds are different
Enemy.prototype.setSpeed = function(speed) {
    speed = (speed / 4) + (Math.random() * 100 + 100);
    return speed;
};

//randomly select a lane to place the enemy
Enemy.prototype.setLane = function() {
    var lane;
    lane = Math.floor(Math.random() * 3 + 1);
    this.enemyLane = lane;
    this.setYloc();
    return lane;
};

//define the y coordinate based on the Lane number
Enemy.prototype.setYloc = function() {
    var yLoc;
    yLoc = ((this.enemyLane * 83) - 20);
    this.y = yLoc;
    return yLoc;
};

//randomly select the x coordinate so they don't all start at the same place
Enemy.prototype.setXloc = function() {
    var xLoc;
    xLoc = (0 - (Math.random() * 400 + 100));
    return xLoc;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //fixed variables storing starting location for when game is initiated and restarted.
    this.startX = 202;
    this.startY = 402;

    //variables that store current location
    this.x = this.startX;
    this.y = this.startY;
    this.alive = "no";

    //default image used for player character
    this.sprite = "images/char-boy.png";
};

//moves character on canvas with input from handleInput()
Player.prototype.update = function(xMove, yMove) {

    if (xMove || yMove) {
        //after key press, calculate new x & y coordinates for the player
        var xLoc = this.x + xMove;
        var yLoc = this.y + yMove;
        //prevent player from moving off canvas. Only updates characters location
        //if location moving to is still on screen.
        if (xLoc < canvas.width && xLoc >= 0) {
            this.x = xLoc;
        }
        if (yLoc < (canvas.height - 203) && yLoc >= -15) {
            this.y = yLoc;
        }
    }
};

//draws the character on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//When player dies reduce number of lives and calls for game reset
Player.prototype.die = function() {
    gManager.lives = gManager.lives - 1;
    this.alive = "no";
    gManager.reset();
};

//converts key presses into relative movements
Player.prototype.handleInput = function(keyPressed) {

    var xMove = 0;
    var yMove = 0;

    //If game is running use key input to determin relative movement.
    
        if (keyPressed === "left") {
            xMove = -101;
            yMove = 0;
        } else if (keyPressed === "right") {
            xMove = 101;
            yMove = 0;
        } else if (keyPressed === "up") {
            xMove = 0;
            yMove = -83;
        } else if (keyPressed === "down") {
            xMove = 0;
            yMove = 83;
        }
    
    //pass move info over to Player.update()
    this.update(xMove, yMove);
};

//the Item class is the base for all items that you collect on the board such as
//gems, hearts.
var Item = function() {
    this.x = this.chooseXloc();
    this.y = this.chooseYloc();
    this.visible = "yes";
};

//generates random Y location
Item.prototype.chooseYloc = function() {
    var yLoc = Math.floor(Math.random() * 3 + 1);
    yLoc = (yLoc * 83) - 35;
    this.y = yLoc;
    return yLoc;
};

//generates random x location
Item.prototype.chooseXloc = function() {
    var xLoc = Math.floor(Math.random() * 5);
    xLoc = xLoc * 101;
    this.x = xLoc;
    return xLoc;
};

//check to see if player overlaps gems. If so pick up gem and give rewards
Item.prototype.pickupGem = function() {
    //define space used by player
    var playerLeft = player.x + 10;
    var playerRight = player.x + 90;
    var playerTop = player.y;
    var playerBottom = player.y + 70;

    //define space used by gem
    var gemLeft = this.x;
    var gemRight = this.x + 90;
    var gemTop = this.y;
    var gemBottom = this.y + 70;

    //if gem is visible and hasn't been collected yet check if they overlap and give reward
    if (this.visible === "yes") {
        if (gemLeft <= playerRight && gemRight >= playerLeft && gemTop <= playerBottom && gemBottom >= playerTop) {
            gManager.points = gManager.points + this.points;
            gManager.lives = gManager.lives + this.life;
            this.visible = "no";
        }
    }
};

// Draw the gems on the screen if they are set to visible
Item.prototype.render = function() {
    if (this.visible === "yes") {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

//define points and sprite for green gem
var GreenGem = function() {
    Item.call(this);
    this.points = 30;
    this.life = 0;
    this.sprite = 'images/Gem-Green.png';
};
GreenGem.prototype = Object.create(Item.prototype);
GreenGem.prototype.constructor = GreenGem;

//define points and sprite for blue gem
var BlueGem = function() {
    Item.call(this);
    this.points = 20;
    this.life = 0;
    this.sprite = 'images/Gem-Blue.png';
};
BlueGem.prototype = Object.create(Item.prototype);
BlueGem.prototype.constructor = BlueGem;

//define points and sprite for orange gem
var OrangeGem = function() {
    Item.call(this);
    this.points = 10;
    this.life = 0;
    this.sprite = 'images/Gem-Orange.png';
};
OrangeGem.prototype = Object.create(Item.prototype);
OrangeGem.prototype.constructor = OrangeGem;

//define points and sprite for heart gem
var Heart = function() {
    Item.call(this);
    this.points = 0;
    this.life = 1;
    this.sprite = 'images/Heart.png';
};
Heart.prototype = Object.create(Item.prototype);
Heart.prototype.constructor = Heart;

//this class defines the area on the game board that you are trying to reach with the player
//in order to complete the game level
var Goal = function() {
    //boundaries of goal
    this.goalLeft = -1;
    this.goalWidth = 505;
    this.goalTop = 50;
    this.goalHeight = 60;
};

//checks if player and goal occupy the same space. If they do the level is complete
Goal.prototype.scoreGoal = function() {
    //define space used by player
    var playerLeft = player.x + 10;
    var playerRight = player.x + 90;
    var playerTop = player.y;
    var playerBottom = player.y + 70;

    //check if they overlap
    if (this.goalLeft <= playerRight && this.goalWidth >= playerLeft && this.goalTop <= playerBottom && this.goalHeight >= playerTop) {
        gManager.points = gManager.points + 100;
        gManager.gameLevel = gManager.gameLevel + 1;
        gManager.reset();
    }
};

//this is the game manager. It manages various aspects of the games such as
//character selections, number of lives, points, and game over
var GameManager = function() {
    this.gameRunning = "no";
    this.charSelected = "no";
    this.screenTime = 0;
    this.characters = [
        "images/char-boy.png",
        "images/char-cat-girl.png",
        "images/char-horn-girl.png",
        "images/char-pink-girl.png",
        "images/char-princess-girl.png"
        ];

    this.lives = 3;
    this.points = 0;
    this.cursorLoc = 60;
    this.gameLevel = 1;
};

//resets game. returns player to start location and sets a counter variable screenTime that is used for
//determining how long the screens are displayed. The screes are used to indicate "game over", goal, or number of lives after player dies
GameManager.prototype.reset = function() {
    player.x = player.startX;
    player.y = player.startY;
    this.screenTime = 15;
};

//this function controls what feedback info should be provided to the user. It calls functions to display the game over screen,
//goal screen and info bar at the top of the board that displays # of points and lives remaining.
//it uses the screenTime variable as a count down clock to determine how long the screen stays on the screen. Each
//cycle through it subtracts from this variable until less than 0.
GameManager.prototype.render = function(dt) {

    //if character is not selected, show character selection screen
    if (this.charSelected === "no") {
        this.selectCharScreen();
    }

    //if the game is in progress, show the info bar at the top of screen
    if (this.gameRunning === "yes") {
        this.gameInfoBar();
    }

    //if player died either show "game over" screen or number of lives remaining
    if (this.screenTime > 0 && player.alive === "no") {

        this.screenTime = this.screenTime - (dt * 10);
        if (this.lives < 0) {
            this.gameRunning = "no";
            this.gameOver();
        } else if (this.lives >= 0) {
            this.gameRunning = "no";
            this.died();
        }
    }

    //if player reached goal show goal screen
    if (this.screenTime > 0 && this.lives >= 0 && player.alive === "yes") {
        this.screenTime = this.screenTime - (dt * 10);
        this.gameRunning = "no";
        this.goalScreen();
    }
};


//builds the game over screen
GameManager.prototype.gameOver = function() {
    //gray out game board an overlay message
    ctx.fillStyle = "rgba(0,0,0,.75)";
    ctx.fillRect(0, 20, canvas.width, (canvas.height -40));

    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.font = "36pt impact";
    ctx.textAlign="center";
    ctx.fillText("Game Over!", (canvas.width/2), 160);

    ctx.strokeStyle = "white";
    ctx.font = "36pt impact";
    ctx.textAlign="center";
    ctx.lineWidth = 1;
    ctx.strokeText("Game Over!", (canvas.width/2), 160);

    //once the screen time runs out reset game
    if (this.screenTime <= 0) {
        player.alive = "yes";
        this.points = 0;
        this.charSelected = "no"
        this.lives = 3;
        this.gameLevel = 1;
        //returns enemies # and speed to level one settings
        if (allEnemies.length > 4) {
            var toDelete = allEnemies.length - 4;
            allEnemies.splice(4, toDelete);
         }
        for (var i = 0; i < allEnemies.length; i++){
            allEnemies[i].enemySpeed = allEnemies[i].setSpeed((this.gameLevel * 100));
        }
        //reset gems
        for (var i = 0; i < allItems.length; i++) {
            allItems[i].visible = "yes";
            allItems[i].chooseXloc();
            allItems[i].chooseYloc();
        }
    }
};

//displays the number of remaining lives when the player dies
GameManager.prototype.died = function() {
    //gray out game board an overlay message
    ctx.fillStyle = "rgba(0,0,0,.75)";
    ctx.fillRect(0, 20, canvas.width, (canvas.height -40));
    //add text fill and then text outline
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.font = "36pt impact";
    ctx.textAlign="center";
    ctx.fillText("You have " + gManager.lives + " lives left!", (canvas.width/2), 160);

    ctx.strokeStyle = "white";
    ctx.font = "36pt impact";
    ctx.textAlign="center";
    ctx.lineWidth = 1;
    ctx.strokeText("You have " + gManager.lives + " lives left!", (canvas.width/2), 160);

    //reset for next life
    if (this.screenTime <= 0) {
        player.alive = "yes";
        this.gameRunning = "yes";
    }
};

//builds the goal screen when player completes the level
GameManager.prototype.goalScreen = function() {
    //Increases game level
    
    //gray out game board an overlay message
    ctx.fillStyle = "rgba(0,0,0,.75)";
    ctx.fillRect(0, 20, canvas.width, (canvas.height -40));
    //add text fill and then text outline
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.font = "36pt impact";
    ctx.textAlign="center";
    ctx.fillText("Goal!", (canvas.width/2), 160);

    ctx.strokeStyle = "white";
    ctx.font = "36pt impact";
    ctx.lineWidth = 1;
    ctx.textAlign="center";
    ctx.strokeText("Goal!", (canvas.width/2), 160);

    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.font = "36pt impact";
    ctx.textAlign="center";
    ctx.fillText("Level " + this.gameLevel, (canvas.width/2), 260);

    ctx.strokeStyle = "white";
    ctx.font = "36pt impact";
    ctx.lineWidth = 1;
    ctx.textAlign="center";
    ctx.strokeText("Level " + this.gameLevel, (canvas.width/2), 260);

    //reset for next level
    if (this.screenTime <= 0) {
        this.gameRunning = "yes";
        this.nextLevel();
    }
};

//Sets up the board for the next level
GameManager.prototype.nextLevel = function() {
    //add another enemy and reset gems every 3rd level
    if (this.gameLevel % 3 === 0) {
        allEnemies.push(new Enemy());
        //reset gems
        for (var i = 0; i < allItems.length; i++) {
            allItems[i].visible = "yes";
            allItems[i].chooseXloc();
            allItems[i].chooseYloc();
        }
    }
    //increase the speed of enemies
    for (var i = 0; i < allEnemies.length; i++){
        allEnemies[i].enemySpeed = allEnemies[i].setSpeed((this.gameLevel * 100));
    }
};

//builds the player selection screen
GameManager.prototype.selectCharScreen = function() {

    //gray out game and overlay player selection
    ctx.fillStyle = "rgba(0,0,0,.75)";
    ctx.fillRect(0, 20, canvas.width, (canvas.height -40));

    var xlocation = 350;
    var ylocation = 10;

    //cycle through characters and draw on canvas
    for (i = 0; i < (this.characters.length ); i++) {
        ctx.drawImage(Resources.get(this.characters[i]), xlocation, ylocation, 101, 171);
        ylocation = ylocation + 100;
    }

    //draw the cursor around one of the characters
    ctx.strokeStyle = "rgba(255,0,0,1)";
    ctx.lineWidth = 5;
    ctx.strokeRect(350, this.cursorLoc, 101, 101);

    //add some text to tell user what to do
    ctx.textAlign="left";
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.font = "36pt impact";
    ctx.fillText("Select a player", 40, 120);

    ctx.strokeStyle = "white";
    ctx.font = "36pt impact";
    ctx.lineWidth = 1;
    ctx.strokeText("Select a player", 40, 120);

    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.font = "14pt impact";
    ctx.fillText("use arrow and enter keys to select", 70, 500);
};

//display bar at top of canvas with number of lives & points
GameManager.prototype.gameInfoBar = function() {
    //draw black background
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 20, canvas.width, 30);
    //add text showing lives & points
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.font = "12pt impact";
    ctx.textAlign="left";
    ctx.fillText("Lives: " + this.lives, 350, 40);
    ctx.fillText("Level: " + this.gameLevel, 10, 40);
    ctx.fillText("Points: " + this.points, 410, 40);
};

//handles the key input while the character selection screen is displayed
GameManager.prototype.handleInput = function(keyPressed) {

        //changes curson location when using arrows
        if (keyPressed === "up" && this.cursorLoc > 60) {
            this.cursorLoc = this.cursorLoc - 100;
        } else if (keyPressed === "down" && this.cursorLoc <= 360) {
            this.cursorLoc = this.cursorLoc + 100;
        }

        //selects character when "enter" key is pressed
        if (keyPressed === "enter") {
            var theChar = (this.cursorLoc - 60) / 100;
            player.sprite = this.characters[theChar];
            player.alive = "yes";
            this.charSelected = "yes";
            this.gameRunning = "yes";
        }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//start game manager
var gManager = new GameManager();

//instantiate goal
var goal = new Goal();

//generate all enemies and store in an array
var allEnemies = [];
var numEnemies = 4; //game starts with 4 enemies
for (var i = 0; i < numEnemies; i++){
    allEnemies.push(new Enemy());
}

//initiate and put items that you collect on the board into an array to 
//make it easier to work with
var allItems = [];
allItems.push(new Heart());
allItems.push(new BlueGem());
allItems.push(new GreenGem());
allItems.push(new OrangeGem());

//initiate player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };
    //passes input to player or game manager
    if (gManager.gameRunning === "yes") { 
        player.handleInput(allowedKeys[e.keyCode]);
    } else if (gManager.gameRunning === "no") {
        gManager.handleInput(allowedKeys[e.keyCode]);
    }
});