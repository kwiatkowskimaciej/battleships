class Player {
  constructor(name, gameboard) {
    this.name = name;
    this.gameboard = gameboard;
  }

  attack(coordinates) {
    if (this.gameboard.getAttackResult(coordinates) != null) {
      throw new Error('Position already attacked');
    }
    this.gameboard.receiveAttack(coordinates);
  }

  attackRandomPosition() {
    let x, y;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (this.gameboard.getAttackResult([x, y]) != null);

    this.attack([x, y]);
  }
}

export default Player;
