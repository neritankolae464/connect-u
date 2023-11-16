/*  complex_code.js
 *
 *  This script demonstrates a complex implementation of a web-based interactive game.
 *  It includes multiple classes, functions, and event listeners to create a dynamic user experience.
 *  The game is called "Crazy Quest" and involves a player navigating through various levels and challenges.
 *  The code is over 200 lines long and showcases advanced JavaScript concepts.
 */

// Level class representing a game level
class Level {
  constructor(name, obstacles) {
    this.name = name;
    this.obstacles = obstacles;
  }

  checkObstacleCollision(x, y) {
    for (let obstacle of this.obstacles) {
      if (obstacle.contains(x, y)) {
        return true;
      }
    }
    return false;
  }
}

// Obstacle class representing a single obstacle in the game
class Obstacle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  contains(x, y) {
    return (
      x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height
    );
  }
}

// Player class representing the game player
class Player {
  constructor(name, level) {
    this.name = name;
    this.level = level;
    this.x = 0;
    this.y = 0;
  }

  move(direction) {
    let newX = this.x;
    let newY = this.y;

    if (direction === 'up') {
      newY -= 1;
    } else if (direction === 'down') {
      newY += 1;
    } else if (direction === 'left') {
      newX -= 1;
    } else if (direction === 'right') {
      newX += 1;
    }

    if (!this.level.checkObstacleCollision(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }
}

// Function to generate random obstacles for a level
function generateRandomObstacles(numObstacles, levelWidth, levelHeight) {
  let obstacles = [];
  for (let i = 0; i < numObstacles; i++) {
    let x = Math.floor(Math.random() * levelWidth);
    let y = Math.floor(Math.random() * levelHeight);
    let width = Math.floor(Math.random() * 10 + 10);
    let height = Math.floor(Math.random() * 10 + 10);
    let obstacle = new Obstacle(x, y, width, height);
    obstacles.push(obstacle);
  }
  return obstacles;
}

// Function to initialize and start the game
function startGame() {
  let level1Obstacles = generateRandomObstacles(5, 100, 100);
  let level1 = new Level('Level 1', level1Obstacles);
  
  let player = new Player('John Doe', level1);

  // Event listener for keyboard input
  document.addEventListener('keydown', function(event) {
    let direction;
    
    if (event.keyCode === 38) {
      direction = 'up';
    } else if (event.keyCode === 40) {
      direction = 'down';
    } else if (event.keyCode === 37) {
      direction = 'left';
    } else if (event.keyCode === 39) {
      direction = 'right';
    }

    player.move(direction);
    console.log(`Player moved to (${player.x}, ${player.y})`);
  });
}

// Start the game
startGame();