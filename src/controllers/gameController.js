import Player from '../classes/player';
import Gameboard from '../classes/gameboard';

function GameController(
  playerOneName = 'Player One',
  playerTwoName = 'Player Two'
) {
  const gameboardOne = new Gameboard();
  const gameboardTwo = new Gameboard();
  const getGameboardOne = () => gameboardOne;
  const getGameboardTwo = () => gameboardTwo;

  const playerOne = new Player(playerOneName, gameboardOne);
  const playerTwo = new Player(playerTwoName, gameboardTwo);

  const getPlayerOne = () => playerOne;
  const getPlayerTwo = () => playerTwo;

  let activePlayer = playerOne;
  const getActivePlayer = () => activePlayer;
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const playRound = (coordinates) => {
    try {
      activePlayer.attack(coordinates);
    } catch (error) {
      console.error(error.message);
    }
  };

  return {
    getGameboardOne,
    getGameboardTwo,
    getPlayerOne,
    getPlayerTwo,
    getActivePlayer,
    playRound,
    switchPlayerTurn,
  };
}

export default GameController;
