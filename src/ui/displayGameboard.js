import Ship from '../classes/ship';

function displayGameboard(gameboard, showShips = false) {
  const gameboardContainer = document.querySelector('.gameboardContainer');
  const gameboardElement = document.createElement('div');
  gameboardElement.classList.add('gameboard');

  gameboard.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      const targetElement = document.createElement('div');
      targetElement.classList.add('target');
      targetElement.dataset.x = x;
      targetElement.dataset.y = y;
      targetElement.textContent = ' ';

      if (cell instanceof Ship && showShips) {
        targetElement.classList.add('ship');
      }
      displayAttackResult(gameboard, [x, y], targetElement);

      gameboardElement.appendChild(targetElement);
    });
  });

  gameboardContainer.appendChild(gameboardElement);
}

function displayAttackResult(gameboard, coordinates, element) {
  const attackResult = gameboard.getAttackResult(coordinates);
  if (attackResult) element.classList.add(attackResult);
}

export default displayGameboard;
