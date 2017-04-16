import Phaser from 'phaser-ce';

import currentGameState from '../currentGameState';
import config from '../config';

export default class extends Phaser.Group {
    constructor({ game, parent, name, addToStage, enableBody, physicsBodyType }) {
        super(game, parent, name, addToStage, enableBody, physicsBodyType);
        //this.scale.setTo(1.2);
        this.countEnemies = game.rnd.integerInRange(5, 25);
        this.move = game.rnd.integerInRange(1, 2);
        this.a = 0;
        this.b = 50;
        this.again = 0;
        game.physics.enable(this, Phaser.Physics.ARCADE);
    }

    update() {
        this[`move${this.move}`]();// this works
    }

    boundsHandler(enemy, enemies){
        enemy.kill();
        enemies.countOutOfBoundsEnemies++;
        if(enemy.last) {
            enemies.again = 1;
            enemies = null;
        }    
    }

    onEnemyEnterBounds(enemy, enemies){
        enemy.events.onOutOfBounds.add(this.boundsHandler.bind(this, enemy, enemies), game);
    }
    //--------------------enemies position---------------------------------------------------

    position1() { // rand one row
        let randYpos = game.rnd.integerInRange(100, config.gameHeight-200)
        let randAmplitude = game.rnd.integerInRange(10, 100);
        let rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
        let yPos = randYpos;//config.gameHeight-200;
        let xPos = config.gameWidth-1;
        let tw;
        for (let y = 0; y < this.countEnemies; y += 1) {
            xPos += 100;
            let enemy = this.create(xPos, yPos, rndEnemy);
            enemy.anchor.setTo(0.5);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.checkWorldBounds = true;
            enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, enemy, this), game);
            if(y == this.countEnemies) enemy.last = true;
            //-------------------behavior----------------------------
            (y%2) ? tw = randYpos + randAmplitude : tw = randYpos - randAmplitude;// set tween within position
            game.add.tween(enemy).to(
                                    { y: tw },
                                    1000,
                                    Phaser.Easing.Linear.None,
                                    true,
                                    0,
                                    100,
                                    true);
        }
    }

    position2() { // rand Two rows
        let randYpos = game.rnd.integerInRange(100, config.gameHeight-200)
        let randAmplitude = game.rnd.integerInRange(10, 100);
        let rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
        let yPos = randYpos;//config.gameHeight-200;
        let xPos = config.gameWidth-1;
        let tw;
        for (let y = 0; y < this.countEnemies; y += 1) {
            xPos += 100;
            let enemy = this.create(xPos, yPos, rndEnemy);
            enemy.anchor.setTo(0.5);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.checkWorldBounds = true;
            enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, enemy, this), game);
            if(y == this.countEnemies) enemy.last = true;
            //-------------------behavior----------------------------
            (y%2) ? tw = randYpos + randAmplitude : tw = randYpos - randAmplitude;// set tween within position
            game.add.tween(enemy).to(
                                    { y: tw },
                                    1000,
                                    Phaser.Easing.Linear.None,
                                    true,
                                    0,
                                    100,
                                    true);
        }
        if(randYpos > config.gameHeight/2) randYpos = randYpos - config.gameHeight/2;//config.gameHeight-200;
        else randYpos = randYpos + config.gameHeight/2;
        yPos = randYpos;
        xPos = config.gameWidth-1;
        for (let y = 0; y < this.countEnemies; y += 1) {
            xPos += 100;
            let enemy = this.create(xPos, yPos, rndEnemy);
            enemy.anchor.setTo(0.5);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.checkWorldBounds = true;
            enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, enemy, this), game);
            if(y == this.countEnemies) enemy.last = true;
            //-------------------behavior----------------------------
            (y%2) ? tw = randYpos + randAmplitude : tw = randYpos - randAmplitude;// set tween within position
            game.add.tween(enemy).to(
                                    { y: tw },
                                    1000,
                                    Phaser.Easing.Linear.None,
                                    true,
                                    0,
                                    100,
                                    true);
        }
    }

    position3() { // columnAndRows
        let randYpos = game.rnd.integerInRange(100, config.gameHeight/2);
        let rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
        let rndRows = game.rnd.integerInRange(1, 5);
        let yPos = randYpos;//config.gameHeight-200;
        let xPos = config.gameWidth+50;
        for(let z = 0; z < rndRows; z++){
        for (let y = 0; y < 7; y += 1) {
            //xPos++;
            let enemy = this.create(xPos, yPos, rndEnemy);
            enemy.anchor.setTo(0.5);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.checkWorldBounds = true;
            enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, enemy, this), game);
            if(z == rndRows) enemy.last = true;
            yPos += 60;
        }
            xPos += 120;
            yPos = randYpos;
        }
    }

    position4() { // DiagonalRow
        let randYpos = game.rnd.integerInRange(100, config.gameHeight/2)
        let rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
        let yPos = randYpos;//config.gameHeight-200;
        let xPos = config.gameWidth+50;
        let rowCount = 0;
        let tw;
        for (let y = 0; y < this.countEnemies+10; y += 1) {
            let enemy = this.create(xPos, yPos, rndEnemy);
            enemy.anchor.setTo(0.5);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.checkWorldBounds = true;
            enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, enemy, this), game);
            if(y == this.countEnemies-1) enemy.last = true;
            xPos += 60;
            yPos += 60;
            tw = xPos;
            if(yPos > config.gameHeight - 200){
                rowCount++;
                xPos = config.gameWidth+50+120*rowCount;
                yPos = randYpos;
            }
        }
    }
   
    position5() { // duckWedge
        let randYpos = game.rnd.integerInRange(100, config.gameHeight/2 - 200);
        let rndEnemy = `enemy_${game.rnd.integerInRange(1, 3)}`;
        let rndRows = game.rnd.integerInRange(1, 3);
        let yPos = randYpos;//config.gameHeight-200;
        let xPos = config.gameWidth+600;
        let rowCount = 0;
        for(let z = 0; z < rndRows; z++){
            for (let y = 0; y < 11; y += 1) {
                let enemy = this.create(xPos, yPos, rndEnemy);
                enemy.anchor.setTo(0.5);
                game.physics.enable(enemy, Phaser.Physics.ARCADE);
                enemy.checkWorldBounds = true;
                enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, enemy, this), game);
                if(y == this.countEnemies-1) enemy.last = true;
                yPos += 60;
                if(y < 5)xPos -= 60;
                else xPos += 60;
            }
            xPos = config.gameWidth+600+120;
            yPos = randYpos;
        }
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

    /*move3() { // parabulous
        this.x -= config.enemiesSpeed;
        this.y -= 0.003 * this.x;
    }

    move4() { // parabulous
        this.x -= config.enemiesSpeed;
        this.y += 0.003 * this.x;
    }*/
}
