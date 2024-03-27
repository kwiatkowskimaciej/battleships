import Ship from '../classes/ship';
import GameController from './gameController';

function ScreenController() {
  const game = GameController();
  const gameboardContainer = document.querySelector('.gameboardContainer');
  const gameboardLeftElement = document.querySelector('.gameboardLeft');
  const gameboardRightElement = document.querySelector('.gameboardRight');
  const activePlayerElement = document.querySelector('.activePlayer');

  const displayAttackResult = (gameboard, coordinates, element) => {
    const attackResult = gameboard.getAttackResult(coordinates);
    if (attackResult) element.classList.add(attackResult);
  };

  const displayGameboard = (gameboard, element, isCurrentPlayer) => {
    gameboard.board.forEach((row, y) => {
      row.forEach((cell, x) => {
        const targetElement = document.createElement('div');
        targetElement.classList.add('target');
        targetElement.dataset.x = x;
        targetElement.dataset.y = y;
        targetElement.textContent = ' ';

        if (cell instanceof Ship && !isCurrentPlayer) {
          targetElement.classList.add('ship');
        }
        displayAttackResult(gameboard, [x, y], targetElement);

        element.appendChild(targetElement);
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

    let dragged;
    const source = document.getElementById('draggable');
    source.addEventListener('dragstart', (e) => {
      dragged = e.target;
      e.target.classList.add('dragging');
    });

    const targets = document.querySelectorAll('.target');

    targets.forEach((target) => {
      target.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      target.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('target')) {
          e.target.appendChild(dragged);
        }
      });
    });
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
