import Phaser from 'phaser-ce';

import currentGameState from '../currentGameState';
import config from '../config';

export default class extends Phaser.Group {
    constructor({ game, parent, name, addToStage, enableBody, physicsBodyType }) {
        super(game, parent, name, addToStage, enableBody, physicsBodyType);
        this.countEnemies = game.rnd.integerInRange(5, 25);
        this.move = game.rnd.integerInRange(1, 4);
        this.a = 0;
        this.b = 50;
        game.physics.enable(this, Phaser.Physics.ARCADE);
    }

    update() {
        this[`move${this.move}`]();// this works
    }

    //--------------------enemies position---------------------------------------------------

    position1() { // bottomOneRow
        const yPos = config.gameHeight - 50;
        let xPos = config.gameWidth + 40;
        const rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
        for (let y = 0; y < this.countEnemies + 5; y += 1) {
            xPos += 100;
            const enemy = this.create(xPos, yPos, rndEnemy);
            enemy.anchor.setTo(0.5);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.body.checkCollision.right = false;
            enemy.checkWorldBounds = true;
            enemy.events.onOutOfBounds.add(this.boundsHandler, game);
        }
    }

    position2() { // bottomTwoRows
        let yPos = config.gameHeight - 50;
        const tempY = yPos;
        let xPos = config.gameWidth + 40;
        const rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
        for (let y = 0; y < this.countEnemies; y += 1) {
            xPos += 100;
            if (yPos === tempY)yPos -= 50;
            else yPos = tempY;
            const enemy = this.create(xPos, yPos, rndEnemy);
            enemy.anchor.setTo(0.5);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.body.checkCollision.right = false;
            enemy.checkWorldBounds = true;
            enemy.events.onOutOfBounds.add(this.boundsHandler, game);
        }
    }

    position3() { // columnAndRows
        let yPos = 50;
        let xPos = config.gameWidth + 40;
        const rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
        for (let y = 0; y < this.countEnemies; y += 1) {
            if (yPos > config.gameHeight - 20) {
                yPos = 50;
                xPos += 100;
            }
            const enemy = this.create(xPos, yPos, rndEnemy);
            enemy.anchor.setTo(0.5);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.body.checkCollision.right = false;
            enemy.checkWorldBounds = true;
            enemy.events.onOutOfBounds.add(this.boundsHandler, game);
            yPos += 50;
        }
    }

    position4() { // DiagonalRow
        let yPos = 0;
        let xPos = config.gameWidth + 40;
        const rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
        for (let y = 0; y < 9; y += 1) {
            yPos += 50;
            xPos += 100;
            const enemy = this.create(xPos, yPos, rndEnemy);
            enemy.anchor.setTo(0.5);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.body.checkCollision.right = false;
            enemy.checkWorldBounds = true;
            enemy.events.onOutOfBounds.add(this.boundsHandler, game);
        }
    }
    // ----------------------not working correct-----------------------
    position5() { // DiagonalRowReversed
        let yPos = 0;
        let xPos = config.gameWidth + 1000;
        const rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
        for (let y = 0; y < 9; y += 1) {
            // if(yPos > config.gameHeight-100)yPos = 50;
            yPos += 50;
            xPos -= 100;
            const enemy = this.create(xPos, yPos, rndEnemy);
            enemy.anchor.setTo(0.5);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.body.checkCollision.right = false;
            enemy.checkWorldBounds = true;
            enemy.events.onOutOfBounds.add(this.boundsHandler, game);
        }
    }

    position6() { // duckWedge
        let yPos = 0;
        let xPos = config.gameWidth + 800;
        const rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
        for (let y = 0; y < 9; y += 1) {
            yPos += 50;
            if (yPos < config.gameHeight / 2)xPos -= 100;
            else xPos += 100;
            const enemy = this.create(xPos, yPos, rndEnemy);
            enemy.anchor.setTo(0.5);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.body.checkCollision.right = false;
            enemy.checkWorldBounds = true;
            enemy.events.onOutOfBounds.add(this.boundsHandler, game);
        }
    }

    position7() { // topOneRow
        const yPos = (config.gameHeight - config.gameHeight) + 50;
        let xPos = config.gameWidth;
        const rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
        for (let y = 0; y < this.countEnemies; y += 1) {
            xPos += 100;
            const enemy = this.create(xPos, yPos, rndEnemy);
            enemy.anchor.setTo(0.5);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.body.checkCollision.right = false;
            enemy.checkWorldBounds = true;
            enemy.events.onOutOfBounds.add(this.boundsHandler, game);
        }
    }


    position8() { // topTwoRows
        let yPos = (config.gameHeight - config.gameHeight) + 50;
        const tempY = yPos;
        let xPos = config.gameWidth + 40;
        const rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
        for (let y = 0; y < this.countEnemies; y += 1) {
            xPos += 100;
            if (yPos === tempY)yPos += 50;
            else yPos = tempY;
            const enemy = this.create(xPos, yPos, rndEnemy);
            enemy.anchor.setTo(0.5);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.body.checkCollision.right = false;
            enemy.checkWorldBounds = true;
            enemy.events.onOutOfBounds.add(this.boundsHandler, game);
        }
    }

    boundsHandler(enemies){
        enemies.kill();
        if (currentGameState.levelscore > currentGameState.limit) currentGameState.bosstime = true;
    }
    // -----------------------enemies movement------------------------------------------------

    move1() { // linear
        this.x -= config.enemiesSpeed;
    }

    move2() { // upanddown
        this.x -= config.enemiesSpeed;
        if (this.a < this.b) {
            this.y -= 1;
            this.a === 49 ? this.a = 100 : this.a++;
        } else {
            this.y += 1;
            this.a == 51 ? this.a = 1 : this.a--;
        }
    }

    move3() { // parabulous
        this.x -= config.enemiesSpeed;
        this.y -= 0.003 * this.x;
    }

    move4() { // parabulous
        this.x -= config.enemiesSpeed;
        this.y += 0.003 * this.x;
    }
}
