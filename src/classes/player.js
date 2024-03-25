class Player {
  constructor(name, gameboard) {
    this.name = name;
    this.gameboard = gameboard;
  }

  attack(coordinates) {
    if (!this.canAttack(coordinates)) {
      throw new Error('Position already attacked');
    }
    this.gameboard.receiveAttack(coordinates);
  }

  attackRandomPosition() {
    let x, y;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (!this.canAttack([x, y]));

    this.attack([x, y]);
  }

  canAttack(coordinates) {
    return !this.gameboard.missedAttacks.some((array) =>
      array.every((value, index) => value === coordinates[index])
    );
  }
}

export default Player;
