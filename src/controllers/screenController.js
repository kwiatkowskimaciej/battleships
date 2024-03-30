import setupGameboard from '../setups/setupGameboard';
import displayFleet from '../ui/displayFleet';
import displayGameboard from '../ui/displayGameboard';
import displayGraveyard from '../ui/displayGraveyard';
import displayText from '../ui/displayText';
import GameController from './gameController';

function ScreenController() {
  const game = GameController();
  const gameboardContainer = document.querySelector('.gameboardContainer');
  const dialog = document.querySelector('dialog');
  const closeButton = document.querySelector('dialog button');

  const updateScreen = () => {
    gameboardContainer.innerHTML = '';

    displayFleet('Your Fleet');
    displayFleet("Opponent's fleet");

    const gameboardOne = game.getGameboardOne();
    const gameboardTwo = game.getGameboardTwo();

    const activePlayer = game.getActivePlayer();

    const activePlayerGameboard =
      activePlayer === game.getPlayerOne() ? gameboardOne : gameboardTwo;
    const inactivePlayerGameboard =
      activePlayer === game.getPlayerOne() ? gameboardTwo : gameboardOne;

    displayGameboard(inactivePlayerGameboard, true);
    displayGameboard(activePlayerGameboard, false);

    displayGraveyard(inactivePlayerGameboard);
    displayGraveyard(activePlayerGameboard);
  };

  let isPlayerTurnOver = false;

  async function boardClickHandler(e) {
    if (isPlayerTurnOver) {
      return;
    }

    isPlayerTurnOver = true;

    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);

    game.playRound([x, y]);
    updateScreen();

    const attacks = game.getActivePlayer().gameboard.attacks;

    if (attacks[attacks.length - 1].result === 'miss') {
      await displayText("It's a miss! Next player's turn in 3... 2... 1...");
    } else {
      await displayText("It's a hit! Next player's turn in 3... 2... 1...");
    }

    if (game.getActivePlayer().gameboard.allShipsSunk()) {
      alert('Game over! ' + game.getActivePlayer().name + ' wins!');
      return;
    }

    dialog.showModal();
    game.switchPlayerTurn();
    updateScreen();
    await displayText(`${game.getActivePlayer().name}'s turn...`);

    isPlayerTurnOver = false;
  }

  const startGame = async () => {
    await displayText('Welcome to Battleships!');
    displayText(`${game.getPlayerOne().name} place your ships on the board.`);
    await setupGameboard(game.getGameboardTwo());
    gameboardContainer.innerHTML = '';

    displayText(`${game.getPlayerTwo().name} place your ships on the board.`);
    await setupGameboard(game.getGameboardOne());
    gameboardContainer.innerHTML = '';

    updateScreen();
    await displayText(`${game.getActivePlayer().name}'s turn...`, false);

    gameboardContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('target')) {
        boardClickHandler(e);
      }
    });
  };

  closeButton.addEventListener('click', () => {
    dialog.close();
  });

  startGame();
}

export default ScreenController;
