function displayGraveyard(gameboard) {
  const shipNames = ['Patrol Boat', 'Submarine', 'Destroyer', 'Battleship'];

  const gameboardContainer = document.querySelector('.gameboardContainer');

  const graveyardElement = document.createElement('div');
  graveyardElement.classList.add('graveyard');
  gameboardContainer.appendChild(graveyardElement);

  const graveyardHeader = document.createElement('div');
  graveyardHeader.classList.add('graveyardHeader');
  graveyardElement.appendChild(graveyardHeader);

  const graveyardHeaderText = document.createElement('span');
  graveyardHeaderText.textContent = 'GRAVEYARD';
  graveyardHeader.appendChild(graveyardHeaderText);

  const graveyardShips = document.createElement('div');
  graveyardShips.classList.add('graveyardShips');
  graveyardElement.appendChild(graveyardShips);

  for (let ship of gameboard.ships) {
    const shipElement = document.createElement('div');
    shipElement.textContent = `${shipNames[ship.length - 1]} (${ship.length})`;
    if (ship.isSunk()) shipElement.dataset.isSunk = 'true';
    graveyardShips.appendChild(shipElement);
  }
}

export default displayGraveyard;
