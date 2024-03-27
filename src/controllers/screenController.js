import Ship from '../classes/ship';
import GameController from './gameController';

function ScreenController() {
  const game = GameController();
  const gameboardOneElement = document.querySelector('.gameboardOne');
  const gameboardTwoElement = document.querySelector('.gameboardTwo');
  const activePlayerElement = document.querySelector('.activePlayer');

  const displayAttackResult = (gameboard, coordinates, button) => {
    const attackResult = gameboard.getAttackResult(coordinates);
    if (attackResult) button.classList.add(attackResult);
  };

  const displayGameboard = (gameboard, element) => {
    gameboard.board.forEach((row, y) => {
      row.forEach((cell, x) => {
        const targetButton = document.createElement('button');
        targetButton.classList.add('target');
        targetButton.dataset.x = x;
        targetButton.dataset.y = y;
        targetButton.textContent = ' ';

        if (cell instanceof Ship) targetButton.classList.add('ship');
        displayAttackResult(gameboard, [x, y], targetButton);

        element.appendChild(targetButton);
      });
    });
  };

  const updateScreen = () => {
    gameboardOneElement.innerHTML = '';
    gameboardTwoElement.innerHTML = '';
    activePlayerElement.innerHTML = game.getActivePlayer().name;

    const gameboardOne = game.getGameboardOne();
    const gameboardTwo = game.getGameboardTwo();

    displayGameboard(gameboardOne, gameboardOneElement);
    displayGameboard(gameboardTwo, gameboardTwoElement);
  };

  function boardClickHandler(e) {
    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);

    game.playRound([x, y]);
    updateScreen();
  }

  gameboardOneElement.addEventListener('click', boardClickHandler);
  gameboardTwoElement.addEventListener('click', boardClickHandler);

  updateScreen();
}

export default ScreenController;
