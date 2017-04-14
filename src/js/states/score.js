import Phaser from 'phaser-ce';

import WebFont from 'webfontloader';
import BackgroundScore from '../objects/backgroundScore';
import config from '../config';

export default class extends Phaser.State {
  preload() {
    WebFont.load({
      google: {
        families: ['Bangers'],
      },
      active: this.fontsLoaded,
    });

    this.load.image('loaderBg', './img/states/bgScore.jpg');
  }

  create() {
    const score = JSON.parse(window.localStorage.getItem('score'));

    this.background = new BackgroundScore({
      game: this,
      x: 0,
      y: 0,
      width: config.gameWidth,
      height: 512,
      asset: 'loaderBg',
    });
    this.background.scale.setTo(config.gameHeight/this.background.height);
    this.game.add.existing(this.background);

    const textScore = this.add.text(this.world.centerX, 80, `Score  `, { font: '32px Bangers', fill: '#dddddd' });
    textScore.anchor.setTo(0.5, 0.5);

    score.forEach((el, i) => {
      const player = this.add.text(this.world.centerX, (50 * i) + 140, `${el.name} : ${el.value}  `, { font: '32px Bangers', fill: '#dddddd' });
      player.anchor.setTo(0.5, 0.5);
    });

    const text2 = this.add.text(this.world.centerX, this.world.height - 16, `press space to mainmenu  `, { font: '16px Bangers', fill: '#dddddd' });
    text2.anchor.setTo(0.5);

    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update() {
    //---------------------------scale block-----------------------------------
    config.gameWidth = document.documentElement.clientWidth;
    config.gameHeight = document.documentElement.clientHeight;
    this.game.width = config.gameWidth;
    this.game.height = config.gameHeight;
    //-------------------------------------------------------------------------

    if (this.fireButton.isDown) {
      this.state.start('mainMenu');
    }
  }
}
