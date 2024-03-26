import Ship from '../classes/ship';
import GameController from './gameController';

function ScreenController() {
    const game = GameController();
    const gameboardOneElement = document.querySelector('.gameboardOne');
    const gameboardTwoElement = document.querySelector('.gameboardTwo');
  
    const updateScreen = () => {
      gameboardOneElement.innerHTML = '';
      gameboardTwoElement.innerHTML = '';
  
      const gameboardOne = game.getGameboardOne();
      const gameboardTwo = game.getGameboardTwo();
      const activePlayer = game.getActivePlayer();
  
      gameboardOne.board.forEach((row, rowIndex) => {
        row.forEach((target, targetIndex) => {
          const targetButton = document.createElement('button');
          targetButton.classList.add('target');
          targetButton.dataset.x = targetIndex;
          targetButton.dataset.y = rowIndex;
          targetButton.textContent = ' ';
          if (target instanceof Ship) targetButton.classList.add('ship');
          gameboardOneElement.appendChild(targetButton);
        });
      });
  
      gameboardTwo.board.forEach((row, rowIndex) => {
        row.forEach((target, targetIndex) => {
          const targetButton = document.createElement('button');
          targetButton.classList.add('target');
          targetButton.dataset.x = targetIndex;
          targetButton.dataset.y = rowIndex;
          targetButton.textContent = ' ';
          if (target instanceof Ship) targetButton.classList.add('ship');
          gameboardTwoElement.appendChild(targetButton);
        });
      });
    };
  
    function boardClickHandler(e) {
      const x = Number(e.target.dataset.x);
      const y = Number(e.target.dataset.y);
  
      if (!x || !y) return;
  
      game.playRound([x, y]);
      updateScreen();
    }
  
    gameboardOneElement.addEventListener('click', boardClickHandler);
    gameboardTwoElement.addEventListener('click', boardClickHandler);
  
    updateScreen();
  }

  export default ScreenController;