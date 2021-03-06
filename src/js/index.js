import 'phaser-ce/build/custom/pixi';
import 'phaser-ce/build/custom/p2';
import WebFont from 'webfontloader';
import Phaser from 'phaser-ce';

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

    this.state.add('intro', intro, false);
    this.state.add('mainMenu', mainMenu, false);
    this.state.add('level', level, false);
    this.state.add('score', score, false);
    this.state.add('createName', createName, false);

    this.state.start('intro');
  }
}

window.game = new Game();
