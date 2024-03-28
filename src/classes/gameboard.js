import Ship from './ship';

class Gameboard {
  constructor() {
    this.board = this.createBoard(10);
    this.ships = [];
    this.attacks = [];
  }

  createBoard(size) {
    let board = [];

    for (let i = 0; i < size; i++) {
      board[i] = [];
      for (let j = 0; j < size; j++) {
        board[i][j] = null;
      }
    }

    return board;
  }

  placeShip(ship, coordinates, rotation) {
    const [x, y] = coordinates;

    if (rotation === 'horizontal' && x + ship.length > 10) {
      throw new Error('Out of bounds');
    }

    if (rotation === 'vertical' && y + ship.length > 10) {
      throw new Error('Out of bounds');
    }

    this.checkAdjacentSquares(x, y, ship.length, rotation);

    this.ships.push(ship);

    if (ship.length > 1 && rotation === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        this.board[y][x + i] = ship;
      }
    } else if (ship.length > 1 && rotation === 'vertical') {
      for (let i = 0; i < ship.length; i++) {
        this.board[y + i][x] = ship;
      }
    } else {
      this.board[y][x] = ship;
    }
  }

  removeShip(ship, coordinates, rotation) {
    const [x, y] = coordinates;

    this.ships = this.ships.filter((item) => item !== ship);

    if (ship.length > 1 && rotation === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        this.board[y][x + i] = null;
      }
    } else if (ship.length > 1 && rotation === 'vertical') {
      for (let i = 0; i < ship.length; i++) {
        this.board[y + i][x] = null;
      }
    } else {
      this.board[y][x] = null;
    }
  }

  receiveAttack(coordinates) {
    const target = this.getShipAt(coordinates);
    if (target instanceof Ship) {
      target.hit();
      this.attacks.push({ coordinates, result: 'hit' });
    } else {
      this.attacks.push({ coordinates, result: 'miss' });
    }
  }

  getAttackResult(coordinates) {
    const attack = this.attacks.find((attack) =>
      attack.coordinates.every((value, index) => value === coordinates[index])
    );

    return attack ? attack.result : null;
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  getShipAt(coordinates) {
    const [x, y] = coordinates;
    return this.board[y][x];
  }

  checkAdjacentSquares(x, y, length, rotation) {
    for (let i = 0; i < length; i++) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          let nx = x + (rotation === 'horizontal' ? i : 0) + dx;
          let ny = y + (rotation === 'vertical' ? i : 0) + dy;

          if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
            if (this.board[ny][nx] instanceof Ship) {
              throw new Error('Too close to another ship');
            }
          }
        }
      }
    }
  }
}

export default Gameboard;
