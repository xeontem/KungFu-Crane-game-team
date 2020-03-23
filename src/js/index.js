import WebFont from 'webfontloader';
import Phaser from 'phaser';

import intro from './states/intro';
import mainMenu from './states/mainMenu';
import level from './states/level';
import createName from './states/createName';
import score from './states/score';
import { gameState } from './currentGameState';

class Game extends Phaser.Game {
  constructor() {
    WebFont.load({
      google: {
        families: ['Orbitron'],
      },
      active: false,
    });

    super(gameState.gameWidth, gameState.gameHeight, Phaser.CANVAS, 'content', null);
    this.scene.add('intro', intro, false);
    this.scene.add('mainMenu', mainMenu, false);
    this.scene.add('level', level, false);
    this.scene.add('score', score, false);
    this.scene.add('createName', createName, false);

    this.scene.start('intro');
  }
}

window.game = new Game();

// firebaseInit();
