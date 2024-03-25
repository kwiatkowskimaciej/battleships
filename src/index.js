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
}
