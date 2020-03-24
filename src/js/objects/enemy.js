import Phaser from 'phaser';

import { gameState } from '../currentGameState';

export default class extends Phaser.GameObjects.Group {
  constructor({ game, parent, name, addToStage, enableBody, physicsBodyType }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType);
    this.countEnemies = game.rnd.integerInRange(5, 25);
    this.move = game.rnd.integerInRange(1, 2);
    this.a = 0;
    this.b = 50;
    this.again = 0;
    game.physics.enable(this, Phaser.Physics.ARCADE);
  }

  update() {
    this[`move${this.move}`]();
  }

  boundsHandler(enemy, enemies) {
    enemy.kill();
    if (enemies.children[enemies.total] === enemy) {
      enemies.again = 1;
      enemies = null;
    }
  }

  boundsHandlerFor3(enemy, enemies) {
    enemy.kill();
    if (enemies.children[enemies.total] === enemy) {
      enemies.again = 1;
      enemies = null;
    }
  }

  onEnemyEnterBounds(enemy, enemies) {
    enemy.events.onOutOfBounds.add(this.boundsHandler.bind(this, enemy, enemies), game);
  }

  onEnemyEnterBoundsFor3(enemy, enemies) {
    enemy.events.onOutOfBounds.add(this.boundsHandlerFor3.bind(this, enemy, enemies), game);
  }
  // --------------------enemies position---------------------------------------------------

  position1() { // rand one row
    const randYpos = game.rnd.integerInRange(100, gameState.gameHeight - 200);
    const randAmplitude = game.rnd.integerInRange(10, 100);
    const rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
    const yPos = randYpos;
    let xPos = gameState.gameWidth - 1;
    let tw;

    for (let y = 0; y < this.countEnemies; y += 1) {
      xPos += 100 + gameState.gameWidth / 35;// scale -----------------------------------
      const enemy = this.create(xPos, yPos, rndEnemy);
      enemy.setScale(gameState.gameWidth / 1424);// scale------------------------------------
      enemy.setOrigin(0.5);
      game.physics.enable(enemy, Phaser.Physics.ARCADE);
      enemy.checkWorldBounds = true;
      enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, enemy, this), game);

      if (y == this.countEnemies) {
        enemy.last = true;
      }

      // -------------------behavior----------------------------
      // set tween within position
      tw = y % 2 ? randYpos + randAmplitude : randYpos - randAmplitude;
      game.add.tween(enemy).to(
        { y: tw },
        1000,
        Phaser.Easing.Linear.None,
        true,
        0,
        100,
        true,
      );
    }
  }

  position2() { // rand Two rows
    let randYpos = game.rnd.integerInRange(100, gameState.gameHeight - 200);
    const randAmplitude = game.rnd.integerInRange(10, 100);
    const rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
    let yPos = randYpos;
    let xPos = gameState.gameWidth - 1;
    let tw;

    for (let y = 0; y < this.countEnemies; y += 1) {
      xPos += 100 + gameState.gameWidth / 35;// scale -----------------------------------
      const enemy = this.create(xPos, yPos, rndEnemy);
      enemy.setScale(gameState.gameWidth / 1424);// scale------------------------------------
      enemy.setOrigin(0.5);
      game.physics.enable(enemy, Phaser.Physics.ARCADE);
      enemy.checkWorldBounds = true;
      enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, enemy, this), game);

      if (y == this.countEnemies) {
        enemy.last = true;
      }

      // -------------------behavior----------------------------
      // set tween within position
      tw = y % 2 ? randYpos + randAmplitude : randYpos - randAmplitude;
      game.add.tween(enemy).to(
        { y: tw },
        1000,
        Phaser.Easing.Linear.None,
        true,
        0,
        100,
        true,
      );
    }

    if (randYpos > gameState.gameHeight / 2) {
      randYpos -= gameState.gameHeight / 2;// gameState.gameHeight-200;
    } else {
      randYpos += gameState.gameHeight / 2;
    }

    yPos = randYpos;
    xPos = gameState.gameWidth - 1;

    for (let y = 0; y < this.countEnemies; y += 1) {
      xPos += 100 + gameState.gameWidth / 35;// scale -----------------------------------
      const enemy = this.create(xPos, yPos, rndEnemy);
      enemy.setScale(gameState.gameWidth / 1424);// scale------------------------------------
      enemy.setOrigin(0.5);
      game.physics.enable(enemy, Phaser.Physics.ARCADE);
      enemy.checkWorldBounds = true;
      enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, enemy, this), game);

      if (y == this.countEnemies) {
        enemy.last = true;
      }

      // -------------------behavior----------------------------
      // set tween within position
      tw = y % 2 ? randYpos + randAmplitude : randYpos - randAmplitude;
      game.add.tween(enemy).to(
        { y: tw },
        1000,
        Phaser.Easing.Linear.None,
        true,
        0,
        100,
        true,
      );
    }
  }

  position3() { // columnAndRows
    const randYpos = game.rnd.integerInRange(100, gameState.gameHeight / 2);
    const rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
    const rndRows = game.rnd.integerInRange(1, 5);
    let yPos = randYpos;// gameState.gameHeight-200;
    let xPos = gameState.gameWidth + 50;

    for (let z = 0; z < rndRows; z++) {
      for (let y = 0; y < 7; y += 1) {
        // xPos++;
        const enemy = this.create(xPos, yPos, rndEnemy);
        enemy.setScale(gameState.gameWidth / 1424);// scale------------------------------------
        enemy.setOrigin(0.5);
        game.physics.enable(enemy, Phaser.Physics.ARCADE);
        enemy.checkWorldBounds = true;
        enemy.events.onEnterBounds.add(this.onEnemyEnterBoundsFor3.bind(this, enemy, this), game);

        if (z == rndRows) {
          enemy.last = true;
        }

        yPos += 60 + gameState.gameHeight / 26;// scale -----------------------------------
      }

      xPos += 120 + gameState.gameWidth / 35;// scale -----------------------------------
      yPos = randYpos;
    }
  }

  position4() { // DiagonalRow
    const randYpos = game.rnd.integerInRange(100, gameState.gameHeight / 2);
    const rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
    let yPos = randYpos;// gameState.gameHeight-200;
    let xPos = gameState.gameWidth + 50;
    let rowCount = 0;
    let tw;

    for (let y = 0; y < this.countEnemies + 10; y += 1) {
      const enemy = this.create(xPos, yPos, rndEnemy);
      enemy.setScale(gameState.gameWidth / 1424);// scale------------------------------------
      enemy.setOrigin(0.5);
      game.physics.enable(enemy, Phaser.Physics.ARCADE);
      enemy.checkWorldBounds = true;
      enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, enemy, this), game);

      if (y == this.countEnemies - 1) {
        enemy.last = true;
      }

      xPos += 60 + gameState.gameWidth / 35;// scale -----------------------------------
      yPos += 60 + gameState.gameHeight / 26;// scale -----------------------------------
      tw = xPos;

      if (yPos > gameState.gameHeight - 200) {
        rowCount++;
        xPos = gameState.gameWidth + 50 + 120 * rowCount + gameState.gameWidth / 35;// scale -----------------------------------;
        yPos = randYpos;
      }
    }
  }

  position5() { // duckWedge
    const randYpos = game.rnd.integerInRange(100, gameState.gameHeight / 2 - 200);
    const rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
    const rndRows = game.rnd.integerInRange(1, 3);
    let yPos = randYpos;// gameState.gameHeight-200;
    let xPos = gameState.gameWidth + 600;
    const rowCount = 0;

    for (let z = 0; z < rndRows; z++) {
      for (let y = 0; y < 11; y += 1) {
        const enemy = this.create(xPos, yPos, rndEnemy);
        enemy.setScale(gameState.gameWidth / 1424);// scale------------------------------------
        enemy.setOrigin(0.5);
        game.physics.enable(enemy, Phaser.Physics.ARCADE);
        enemy.checkWorldBounds = true;
        enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, enemy, this), game);
        if (y === this.countEnemies - 1) {
          enemy.last = true;
        }

        yPos += 60 + gameState.gameHeight / 26;// scale -----------------------------------
        if (y < 5) {
          xPos -= 60 + gameState.gameWidth / 35;// scale -----------------------------------
        } else {
          xPos += 60 + gameState.gameWidth / 35;// scale -----------------------------------
        }
      }
      xPos = gameState.gameWidth + 600 + 120 + gameState.gameWidth / 35;// scale -----------------------------------;
      yPos = randYpos;
    }
  }

  // -----------------------enemies movement------------------------------------------------

  move1() { // linear
    this.x -= gameState.enemiesSpeed;
  }

  move2() { // upanddown
    this.x -= gameState.enemiesSpeed;
    if (this.a < this.b) {
      this.y -= 1;
      this.a === 49 ? this.a = 100 : this.a++;
    } else {
      this.y += 1;
      this.a == 51 ? this.a = 1 : this.a--;
    }
  }
}
