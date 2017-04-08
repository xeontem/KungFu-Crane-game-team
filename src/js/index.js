import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import intro from './states/intro';
import mainMenu from './states/mainMenu';
import firstLevel from './states/firstLevel';
import secondLevel from './states/secondLevel';
import thirdLevel from './states/thirdLevel';
import score from './states/score';
import config from './config';

class Game extends Phaser.Game {
  constructor() {
    const docElement = document.documentElement;
    config.gameWidth = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
    config.gameHeight = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

    super(config.gameWidth, config.gameHeight, Phaser.CANVAS, 'content', null);

    this.state.add('intro', intro, false);
    this.state.add('mainMenu', mainMenu, false);
    this.state.add('firstLevel', firstLevel, false);
    //this.state.add('secondLevel', secondLevel, false);
    //this.state.add('thirdLevel', thirdLevel, false);
    //this.state.add('score', score, false);

    this.state.start('firstLevel');
  }
}

window.game = new Game();
