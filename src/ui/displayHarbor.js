function displayHarbor() {
  const gameboardContainer = document.querySelector('.gameboardContainer');

  const harborElement = document.createElement('div');
  harborElement.classList.add('harbor');
  gameboardContainer.appendChild(harborElement);

  const harborHeader = document.createElement('div');
  harborHeader.classList.add('harborHeader');
  harborElement.appendChild(harborHeader);

  const harborHeaderText = document.createElement('span');
  harborHeaderText.textContent = 'HARBOR';
  harborHeader.appendChild(harborHeaderText);

  const harborShipyardElement = document.createElement('div');
  harborShipyardElement.classList.add('harborShipyard');
  harborElement.appendChild(harborShipyardElement);
}

export default displayHarbor;
