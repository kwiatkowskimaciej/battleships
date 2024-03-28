import setupGameboard from '../setups/setupGameboard';
import displayGameboard from '../ui/displayGameboard';
import GameController from './gameController';

function ScreenController() {
  const game = GameController();
  const gameboardContainer = document.querySelector('.gameboardContainer');
  const activePlayerElement = document.querySelector('.activePlayer');

  const updateScreen = () => {
    activePlayerElement.innerHTML = game.getActivePlayer().name;

    const gameboardOne = game.getGameboardOne();
    const gameboardTwo = game.getGameboardTwo();

    const activePlayer = game.getActivePlayer();

    const activePlayerGameboard =
      activePlayer === game.getPlayerOne() ? gameboardOne : gameboardTwo;
    const inactivePlayerGameboard =
      activePlayer === game.getPlayerOne() ? gameboardTwo : gameboardOne;

    displayGameboard(activePlayerGameboard);
    displayGameboard(inactivePlayerGameboard);
  };

  function boardClickHandler(e) {
    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);

    game.playRound([x, y]);

    confirm(`Pass device to the next player`);
    updateScreen();
  }

  const startGame = async () => {
    await setupGameboard(game.getGameboardTwo());
    await setupGameboard(game.getGameboardOne());

    updateScreen();
  };

  startGame();
}

export default ScreenController;
