import Phaser from 'phaser-ce';

import currentGameState from '../currentGameState';
import enemy from '../objects/enemy';

export default function () {
    if(!currentGameState.bosstime){
        if (!this.enemies || this.enemies.again || !this.enemies.total || this.time.now > this.enemAgain + 12000) {
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
            this.enemies.pos = game.rnd.integerInRange(1, 5);
            this.enemies[`position${this.enemies.pos}`]();// this works
            //-----------------hard spawn enemies(just in cause)----------------------------
            this.enemAgain = this.time.now+8000;
            if(this.enemies.pos == 3)this.enemAgain = this.time.now;
        }
    }
}
