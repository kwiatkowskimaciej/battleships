import Ship from '../classes/ship';
import displayGameboard from '../ui/displayGameboard';

function setupGameboard(gameboard) {
  displayGameboard(gameboard);
  generateShips();

  const gameboardElement = document.querySelector('.gameboard');
  const harborElement = document.querySelector('.harbor');

  const confirmButton = document.createElement('button');
  confirmButton.textContent = 'Confirm placement';
  confirmButton.disabled = true;
  document.body.appendChild(confirmButton);

  const observer = new MutationObserver(() => {
    const battleships = harborElement.querySelectorAll('.battleship');
    if (battleships.length === 0) {
      confirmButton.disabled = false;
    }
  });

  observer.observe(harborElement, { childList: true });

  return new Promise((resolve) => {
    let ship;
    let originalLocation;

    const battleships = document.querySelectorAll('.battleship');
    battleships.forEach((battleship) =>
      battleship.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('battleship')) {
          ship = e.target;
          originalLocation = null;
        }
      })
    );

    gameboardElement.addEventListener('dragover', (e) => {
      if (e.target.classList.contains('target')) {
        e.preventDefault();
      }
    });

    gameboardElement.addEventListener('drop', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('target')) {
        const shipLength = parseInt(ship.dataset.length);
        const x = parseInt(e.target.dataset.x);
        const y = parseInt(e.target.dataset.y);

        try {
          const newShip = new Ship(shipLength);
          gameboard.placeShip(newShip, [x, y], 'horizontal');
          e.target.appendChild(ship);
          originalLocation = [x, y];
        } catch (error) {
          console.error(error);
        }
      }
    });

    gameboardElement.addEventListener('dragleave', (e) => {
      const targetElement = e.target.closest('.target');
      if (targetElement) {
        const x = parseInt(targetElement.dataset.x);
        const y = parseInt(targetElement.dataset.y);
        const shipAtTarget = gameboard.getShipAt([x, y]);

        if (
          shipAtTarget &&
          originalLocation &&
          originalLocation.toString() === [x, y].toString()
        ) {
          gameboard.removeShip(shipAtTarget, [x, y], 'horizontal');
        }
      }
    });

    confirmButton.addEventListener('click', () => {
      observer.disconnect();
      resolve();
      document.querySelector('.gameboard').remove();
      confirmButton.remove();
    });
  });
}

function generateShips() {
  const harborElement = document.querySelector('.harbor');
  harborElement.innerHTML = '';

  const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  ships.forEach((length) => {
    const ship = document.createElement('div');
    ship.classList.add('battleship');
    ship.dataset.length = length;
    ship.draggable = true;
    ship.textContent = length;
    harborElement.appendChild(ship);
  });
}

export default setupGameboard;
