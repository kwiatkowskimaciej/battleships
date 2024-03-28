import setupGameboard from '../setups/setupGameboard';
import displayGameboard from '../ui/displayGameboard';
import GameController from './gameController';

function ScreenController() {
  const game = GameController();
  const gameboardContainer = document.querySelector('.gameboardContainer');
  const activePlayerElement = document.querySelector('.activePlayer');

  const updateScreen = () => {
    gameboardContainer.innerHTML = '';
    activePlayerElement.innerHTML = game.getActivePlayer().name;

    const gameboardOne = game.getGameboardOne();
    const gameboardTwo = game.getGameboardTwo();

    const activePlayer = game.getActivePlayer();

    const activePlayerGameboard =
      activePlayer === game.getPlayerOne() ? gameboardOne : gameboardTwo;
    const inactivePlayerGameboard =
      activePlayer === game.getPlayerOne() ? gameboardTwo : gameboardOne;

    displayGameboard(inactivePlayerGameboard);
    displayGameboard(activePlayerGameboard);
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

    Promise.resolve().then(() => {
      const nextPlayer = confirm(`Pass device to the next player`);
      if (nextPlayer) {
        game.switchPlayerTurn();
        updateScreen();
      }
    });
  }

  const startGame = async () => {
    await setupGameboard(game.getGameboardTwo());
    await setupGameboard(game.getGameboardOne());

    updateScreen();

    gameboardContainer.addEventListener('click', boardClickHandler);
  };

  startGame();
}

export default ScreenController;
