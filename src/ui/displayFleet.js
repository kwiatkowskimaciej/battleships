function displayFleet(description) {
  const gameboardContainer = document.querySelector('.gameboardContainer');

  const fleetElement = document.createElement('div');
  fleetElement.classList.add('fleet');
  gameboardContainer.appendChild(fleetElement);

  const fleetDescriptionElement = document.createElement('span');
  fleetDescriptionElement.classList.add('fleetDescription');
  fleetDescriptionElement.textContent = description;
  fleetElement.appendChild(fleetDescriptionElement);
}

export default displayFleet;
