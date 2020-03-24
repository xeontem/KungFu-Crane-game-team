import WebFont from 'webfontloader';
import Phaser from 'phaser';

import intro from './states/intro';
import mainMenu from './states/mainMenu';
import level from './states/level';
import createName from './states/createName';
import score from './states/score';
import { gameState } from './currentGameState';

var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: gameState.gameWidth,
  height: gameState.gameHeight,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
};

class Game extends Phaser.Game {
  constructor(config) {
    super(config);
    this.scene.add('intro', intro, false);
    this.scene.add('mainMenu', mainMenu, false);
    this.scene.add('level', level, false);
    this.scene.add('score', score, false);
    this.scene.add('createName', createName, false);

    this.scene.start('level');
  }
}

WebFont.load({
  google: {
    families: ['Orbitron'],
  },
  active: false,
});

window.game = new Game(config);

// firebaseInit();
