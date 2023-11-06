// Filename: ComplexCode.js

// This complex code demonstrates an implementation of a text-based adventure game
// with multiple game states, complex interactions, and an intricate storyline.

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let player = {
  name: '',
  health: 100,
  inventory: []
};

let currentLocation = '';
let gameState = '';

const locations = {
  bedroom: {
    description: 'You wake up in a dimly lit bedroom. There is a door in front of you.',
    items: ['key']
  },
  hallway: {
    description: 'You are standing in a long hallway. There are two doors on your left and right.',
    items: []
  },
  livingRoom: {
    description: 'The living room is filled with dusty furniture and broken shards of glass.',
    items: ['sword']
  },
  kitchen: {
    description: 'The kitchen is a mess with rotten food and broken appliances.',
    items: ['apple', 'knife']
  },
  garden: {
    description: 'The garden is overgrown with tall weeds and smells of decay.',
    items: ['shovel']
  }
};

const gameStates = {
  starting: {
    text: 'Welcome to the ComplexCode text adventure game!\nPlease enter your name: ',
    next: 'intro'
  },
  intro: {
    text: 'Welcome, {playerName}! Your adventure begins...\nYou find yourself in a mysterious old mansion...\n' +
          'You must find a way to escape this eerie place...\n',
    next: 'bedroom'
  },
  bedroom: {
    text: '{playerName}, ' + locations.bedroom.description + '\nWhat would you like to do?\n',
    next: 'bedroomChoice'
  },
  bedroomChoice: {
    next: 'hallway',
    choices: [
      {
        text: 'Open the door',
        next: 'hallway'
      },
      {
        text: 'Search the room',
        next: 'searchBedroom'
      }
    ]
    // More choices and logic can be added here
  },
  searchBedroom: {
    text: 'You search the room but find nothing interesting...\n',
    next: 'bedroomChoice'
  },
  // More game states and interactions can be added here
};

function getNextState(next) {
  return gameStates[next] || gameStates['starting'];
}

function showCurrentGameState() {
  let currentState = gameStates[gameState];
  let nextText = currentState.text.replace('{playerName}', player.name);
  console.log(nextText);
}

function processPlayerInput(input) {
  let nextState = getNextState(gameState).next;

  if (gameState === 'bedroomChoice') {
    if (input === '1') {
      nextState = 'hallway';
    } else if (input === '2') {
      nextState = 'searchBedroom';
    }
  }

  gameState = nextState;
  showCurrentGameState();
}

function initializeGame() {
  rl.question(getNextState('starting').text, (name) => {
    player.name = name;

    gameState = getNextState('intro').next;
    showCurrentGameState();

    rl.on('line', (input) => {
      processPlayerInput(input);
    });
  });
}

initializeGame();  // Start the game

// More functions, interactions, and logic can be added below
// This is just a basic skeleton code to illustrate a complex text-based game.