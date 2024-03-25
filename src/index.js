import './style.css';
import Player from './classes/player';
import Gameboard from './classes/gameboard';
import Ship from './classes/ship';

function GameController(
  playerOneName = 'Player One',
  playerTwoName = 'PlayerTwo'
) {
  const gameboardOne = new Gameboard();
  const gameboardTwo = new Gameboard();
  const getGameboardOne = () => gameboardOne;
  const getGameboardTwo = () => gameboardTwo;

  const playerOne = new Player(playerOneName, gameboardOne);
  const playerTwo = new Player(playerTwoName, gameboardTwo);

  let activePlayer = playerOne;
  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerTwo;
  };

  const placeShips = () => {
    gameboardOne.placeShip(new Ship(1), [0, 0], 'horizontal');
    gameboardTwo.placeShip(new Ship(1), [0, 0], 'horizontal');
  };

  placeShips();

  const playRound = (coordinates) => {
    try {
      activePlayer.attack(coordinates);
      switchPlayerTurn();
    } catch (error) {
      console.error(error.message);
    }
  };

  return {
    getGameboardOne,
    getGameboardTwo,
    getActivePlayer,
    playRound,
  };
}

function ScreenController() {
  const game = GameController();
  const gameboardOneElement = document.querySelector('.gameboardOne');
  const gameboardTwoElement = document.querySelector('.gameboardTwo');

  const updateScreen = () => {
    gameboardOneElement.innerHTML = '';
    gameboardTwoElement.innerHTML = '';

    const gameboardOne = game.getGameboardOne();
    const gameboardTwo = game.getGameboardTwo();
    const activePlayer = game.getActivePlayer();

    gameboardOne.board.forEach((row, rowIndex) => {
      row.forEach((target, targetIndex) => {
        const targetButton = document.createElement('button');
        targetButton.classList.add('target');
        targetButton.dataset.x = targetIndex;
        targetButton.dataset.y = rowIndex;
        targetButton.textContent = ' ';
        if (target instanceof Ship) targetButton.classList.add('ship');
        gameboardOneElement.appendChild(targetButton);
      });
    });

    gameboardTwo.board.forEach((row, rowIndex) => {
      row.forEach((target, targetIndex) => {
        const targetButton = document.createElement('button');
        targetButton.classList.add('target');
        targetButton.dataset.x = targetIndex;
        targetButton.dataset.y = rowIndex;
        targetButton.textContent = ' ';
        if (target instanceof Ship) targetButton.classList.add('ship');
        gameboardTwoElement.appendChild(targetButton);
      });
    });
  };

  updateScreen();
}

ScreenController();
