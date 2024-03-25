import Player from '../src/classes/player';
import Gameboard from '../src/classes/gameboard';
import Ship from '../src/classes/ship';

describe('Player', () => {
  let player;
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
    player = new Player('Player 1', gameboard);
  });

  test('should have name', () => {
    expect(player.name).not.toBeNull();
  });

  test('should not attack the same position twice', () => {
    player.attack([0, 0]);
    expect(() => player.attack([0, 0])).toThrow();
  });

  test('should attack random position', () => {
    const ship = new Ship(1);
    gameboard.placeShip(ship, [0, 0], 'horizontal');

    for (let i = 0; i < 100; i++) {
      player.attackRandomPosition();
    }

    expect(ship.isSunk()).toBe(true);
  });
});
