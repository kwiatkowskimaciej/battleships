import Ship from '../classes/ship';
import GameController from './gameController';

function ScreenController() {
  const game = GameController();
  const gameboardOneElement = document.querySelector('.gameboardOne');
  const gameboardTwoElement = document.querySelector('.gameboardTwo');
  const activePlayerElement = document.querySelector('.activePlayer');

  const displayAttackResult = (gameboard, position, button) => {
    const missedAttack = gameboard.missedAttacks.some((array) =>
      array.every((value, index) => value === position[index])
    );

    if (missedAttack) {
      button.classList.add('miss');
    }
  };

  const displayGameboard = (gameboard, element) => {
    gameboard.board.forEach((row, y) => {
      row.forEach((cell, x) => {
        const targetButton = document.createElement('button');
        targetButton.classList.add('target');
        targetButton.dataset.x = x;
        targetButton.dataset.y = y;
        targetButton.textContent = ' ';

        displayAttackResult(gameboard, [y, x], targetButton);
        if (cell instanceof Ship) targetButton.classList.add('ship');

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

    if (!x || !y) return;

    game.playRound([y, x]);
    updateScreen();
  }

  gameboardOneElement.addEventListener('click', boardClickHandler);
  gameboardTwoElement.addEventListener('click', boardClickHandler);

  updateScreen();
}

export default ScreenController;
