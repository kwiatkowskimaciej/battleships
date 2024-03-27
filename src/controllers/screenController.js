import Ship from '../classes/ship';
import GameController from './gameController';

function ScreenController() {
  const game = GameController();
  const gameboardContainer = document.querySelector('.gameboardContainer');
  const gameboardLeftElement = document.querySelector('.gameboardLeft');
  const gameboardRightElement = document.querySelector('.gameboardRight');
  const activePlayerElement = document.querySelector('.activePlayer');

  const displayAttackResult = (gameboard, coordinates, button) => {
    const attackResult = gameboard.getAttackResult(coordinates);
    if (attackResult) button.classList.add(attackResult);
  };

  const displayGameboard = (gameboard, element, isCurrentPlayer) => {
    gameboard.board.forEach((row, y) => {
      row.forEach((cell, x) => {
        const targetButton = document.createElement('button');
        targetButton.classList.add('target');
        targetButton.dataset.x = x;
        targetButton.dataset.y = y;
        targetButton.textContent = ' ';

        if (cell instanceof Ship && !isCurrentPlayer) {
          targetButton.classList.add('ship');
        }
        displayAttackResult(gameboard, [x, y], targetButton);

        element.appendChild(targetButton);
      });
    });
  };

  const updateScreen = () => {
    gameboardLeftElement.innerHTML = '';
    gameboardRightElement.innerHTML = '';
    activePlayerElement.innerHTML = game.getActivePlayer().name;

    const gameboardOne = game.getGameboardOne();
    const gameboardTwo = game.getGameboardTwo();

    const activePlayer = game.getActivePlayer();

    const activePlayerGameboard =
      activePlayer === game.getPlayerOne() ? gameboardOne : gameboardTwo;
    const inactivePlayerGameboard =
      activePlayer === game.getPlayerOne() ? gameboardTwo : gameboardOne;

    displayGameboard(activePlayerGameboard, gameboardRightElement, true);
    displayGameboard(inactivePlayerGameboard, gameboardLeftElement, false);
  };

  function boardClickHandler(e) {
    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);

    game.playRound([x, y]);

    confirm(`Pass device to the next player`);
    updateScreen();
  }

  gameboardLeftElement.addEventListener('click', boardClickHandler);
  gameboardRightElement.addEventListener('click', boardClickHandler);

  updateScreen();
}

export default ScreenController;
