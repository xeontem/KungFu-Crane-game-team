import Phaser from 'phaser-ce';

import WebFont from 'webfontloader';
import BackgroundMainMenu from '../objects/backgroundMainMenu';
import { loadMusic, applyMusic } from '../sound/bgmusic';

export default class extends Phaser.State {

  preload() {
    WebFont.load({
      google: {
        families: ['Bangers'],
      },
      active: this.fontsLoaded,
    });

    this.load.image('loaderBg', './img/states/bgMainMenu.jpg');
    loadMusic.apply(this);
  }

  create() {
    this.background = new BackgroundMainMenu({
      game: this,
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
      asset: 'loaderBg',
    });
    this.game.add.existing(this.background);

    const text = this.add.text(this.world.centerX, this.world.height - 16, 'press space to start ', { font: 'Bangers', fontSize: '16px', fill: '#dddddd' });
    text.anchor.setTo(0.5);
    text.font = 'Bangers';

    const text2 = this.add.text(this.world.centerX, this.world.centerY-100, 'Hawking Revenge    ', { font: '72px Arial', fill: '#ff0' });
    text2.anchor.setTo(0.5);
    text2.font = 'Bangers';

    applyMusic.apply(this);

    const scoreText = this.add.text(this.world.centerX, this.world.height - 125, 'Press S to Score', { font: '16px Bangers', fill: 'red' });
    scoreText.anchor.setTo(0.5);

    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.score = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.end = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
  }

  update() {
    if (this.fireButton.isDown) {
      this.state.start('firstLevel');
    }

    if (this.score.isDown) {
      this.state.start('score');
    }

    if (this.end.isDown) {
      this.state.start('endGame');
    }
  }
}
