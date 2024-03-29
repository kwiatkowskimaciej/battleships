import setupGameboard from '../setups/setupGameboard';
import displayFleet from '../ui/displayFleet';
import displayGameboard from '../ui/displayGameboard';
import displayGraveyard from '../ui/displayGraveyard';
import GameController from './gameController';

function ScreenController() {
  const game = GameController();
  const gameboardContainer = document.querySelector('.gameboardContainer');

  const updateScreen = () => {
    gameboardContainer.innerHTML = '';

    displayFleet('Your Fleet');
    displayFleet("Opponent's fleet");

    const gameboardOne = game.getGameboardOne();
    const gameboardTwo = game.getGameboardTwo();

    const activePlayer = game.getActivePlayer();

    const activePlayerGameboard =
      activePlayer === game.getPlayerOne() ? gameboardOne : gameboardTwo;
    const inactivePlayerGameboard =
      activePlayer === game.getPlayerOne() ? gameboardTwo : gameboardOne;

    displayGameboard(inactivePlayerGameboard, true);
    displayGameboard(activePlayerGameboard, false);

    displayGraveyard(inactivePlayerGameboard);
    displayGraveyard(activePlayerGameboard);
  };

  function boardClickHandler(e) {
    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);

    game.playRound([x, y]);
    updateScreen();

    if (game.getActivePlayer().gameboard.allShipsSunk()) {
      alert('Game over! ' + game.getActivePlayer().name + ' wins!');
      return;
    }

    setTimeout(() => {
      const nextPlayer = confirm(`Pass device to the next player`);
      if (nextPlayer) {
        game.switchPlayerTurn();
        updateScreen();
      }
    }, 100);
  }

  const startGame = async () => {
    await setupGameboard(game.getGameboardTwo());
    gameboardContainer.innerHTML = '';

    await setupGameboard(game.getGameboardOne());
    gameboardContainer.innerHTML = '';

    updateScreen();

    gameboardContainer.addEventListener('click', boardClickHandler);
  };

  startGame();
}

export default ScreenController;
