import Ship from '../src/classes/ship';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('should be defined', () => {
    expect(ship).toBeDefined();
  });

  test('should initialize with correct length', () => {
    expect(ship.length).toBe(3);
  });

  test('should initialize with zero hits', () => {
    expect(ship.hits).toBe(0);
  });

  test('should initialize as not sunk', () => {
    expect(ship.isSunk()).toBe(false);
  });

  test('hit() should increase the number of hits', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('isSunk() should return false if the number of hits is less than the length', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test('isSunk() should return true if the number of hits is equal to the length', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
