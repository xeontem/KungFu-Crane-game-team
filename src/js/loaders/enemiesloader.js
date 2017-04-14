import Phaser from 'phaser-ce';

import currentGameState from '../currentGameState';
import enemy from '../objects/enemy';

export default function () {
    if(!currentGameState.bosstime){
        if (!this.enemies || !this.enemies.total) {
            this.enemies = new enemy({
                game: this,
                parent: null,
                name: 'enem',
                addToStage: true,
                enableBody: true,
                physicsBodyType: Phaser.Physics.ARCADE,
            });
            this.game.add.existing(this.enemies);
            // -----------------------------apply position enemies to its behavior----------------
            if (this.enemies.move === 3) this.enemies.pos = this.game.rnd.integerInRange(3, 8);// go down
            else if (this.enemies.move === 4) this.enemies.pos = this.game.rnd.integerInRange(1, 6);// go up
            else this.enemies.pos = 1//game.rnd.integerInRange(1, 8);
            this.enemies[`position${this.enemies.pos}`]();// this works
        }
    }
}
