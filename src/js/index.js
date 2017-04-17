import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import intro from './states/intro';
import mainMenu from './states/mainMenu';
import level from './states/level';
import createName from './states/createName';
import score from './states/score';
import config from './config';

class Game extends Phaser.Game {
    constructor() {
        config.gameWidth = document.documentElement.clientWidth;
        config.gameHeight = document.documentElement.clientHeight;

        super(config.gameWidth, config.gameHeight, Phaser.CANVAS, 'content', null);

        this.state.add('intro', intro, false);
        this.state.add('mainMenu', mainMenu, false);
        this.state.add('level', level, false);
        this.state.add('score', score, false);
        this.state.add('createName', createName, false);

        this.state.start('intro');
    }
}

window.game = new Game();
