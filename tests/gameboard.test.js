import Gameboard from '../src/classes/gameboard';
import Ship from '../src/classes/ship';

describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('should be able to place ships at specific coordinates', () => {
    const ship = new Ship(1);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    expect(gameboard.getShipAt([0, 0])).toBe(ship);
  });

  test('should place the ship horizontally based on rotation', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    expect(gameboard.getShipAt([0, 0])).toBe(ship);
    expect(gameboard.getShipAt([1, 0])).toBe(ship);
    expect(gameboard.getShipAt([2, 0])).toBe(ship);
  });

  test('should place the ship vertically based on rotation', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'vertical');
    expect(gameboard.getShipAt([0, 0])).toBe(ship);
    expect(gameboard.getShipAt([0, 1])).toBe(ship);
    expect(gameboard.getShipAt([0, 2])).toBe(ship);
  });

  test('should not place the ship if it would be out of bounds', () => {
    const ship = new Ship(3);
    expect(() => gameboard.placeShip(ship, [10, 0], 'horizontal')).toThrow();
    expect(() => gameboard.placeShip(ship, [[0, 10], 'vertical'])).toThrow();
  });

  test('should not allow ships to be placed less than one block from each other', () => {
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);
    gameboard.placeShip(ship1, [1, 1]);
    expect(() => gameboard.placeShip(ship2, [1, 0], 'horizontal')).toThrow();
    expect(() => gameboard.placeShip(ship2, [2, 1], 'horizontal')).toThrow();
    expect(() => gameboard.placeShip(ship2, [1, 2], 'horizontal')).toThrow();
    expect(() => gameboard.placeShip(ship2, [0, 1], 'horizontal')).toThrow();
    expect(() => gameboard.placeShip(ship2, [0, 0], 'horizontal')).toThrow();
    expect(() => gameboard.placeShip(ship2, [2, 0], 'horizontal')).toThrow();
    expect(() => gameboard.placeShip(ship2, [2, 2], 'horizontal')).toThrow();
    expect(() => gameboard.placeShip(ship2, [0, 2], 'horizontal')).toThrow();
  });

  test('receiveAttack() should record hit coordinates', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0]);
    gameboard.receiveAttack([0, 0]);
    expect(ship.hits).toBe(1);
  });

  test('receiveAttack() should record missed coordinates', () => {
    gameboard.receiveAttack([0, 0]);
    const attack = gameboard.getAttackResult([0, 0]);
    expect(attack).toBe('miss');
  });

  test('should report whether all ships have been sunk', () => {
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);
    gameboard.placeShip(ship1, [0, 0]);
    gameboard.placeShip(ship2, [2, 0]);
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([2, 0]);
    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test('removes a ship from the ships array', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    gameboard.removeShip(ship, [0, 0], 'horizontal');
    expect(gameboard.ships).not.toContain(ship);
  });

  test('removes a horizontal ship from the board', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    gameboard.removeShip(ship, [0, 0], 'horizontal');
    expect(gameboard.board[0][0]).toBeNull();
    expect(gameboard.board[0][1]).toBeNull();
    expect(gameboard.board[0][2]).toBeNull();
  });

  test('removes a vertical ship from the board', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'vertical');
    gameboard.removeShip(ship, [0, 0], 'vertical');
    expect(gameboard.board[0][0]).toBeNull();
    expect(gameboard.board[1][0]).toBeNull();
    expect(gameboard.board[2][0]).toBeNull();
  });
});
