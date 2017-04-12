import Phaser from 'phaser-ce';

import currentGameState from '../currentGameState';
import config from '../config';

export default class extends Phaser./*Tile*/Sprite {
  constructor({ game, x, y, width, height, asset }) {
    super(game, x, y, width, height, asset);
    //this.width = config.gameWidth;
    //this.height = config.gameHeight;
  }

  update() {
    if (!currentGameState.bosstime) {
        this.tilePosition.x -= 1;
    } else if(currentGameState.bosskilled === true) {
        this.tilePosition.x -= 15;
    } else this.tilePosition.x -= 5;
  }
}
