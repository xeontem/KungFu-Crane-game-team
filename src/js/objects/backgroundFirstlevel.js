import Phaser from 'phaser-ce';

import currentGameState from '../currentGameState';
import config from '../config';

export default class extends Phaser.TileSprite {
    constructor({ game, x, y, width, height, asset }) {
        super(game, x, y, width, height, asset);
    }

    update() {
        if (currentGameState.bosstime) this.tilePosition.x -= 5;
        else if(currentGameState.bosskilled) this.tilePosition.x -= 15;
        else this.tilePosition.x -= 1;
    }
}
