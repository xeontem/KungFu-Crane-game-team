import Phaser from 'phaser-ce';

import WebFont from 'webfontloader';
import BackgroundScore from '../objects/backgroundScore';
import createInput from '../loaders/inputloader';

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
    let score = JSON.parse(window.localStorage.getItem('score'));

    this.background = new BackgroundScore({
      game: this,
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
      asset: 'loaderBg',
    });

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
    if (this.fireButton.isDown) {
      this.state.start('mainMenu');
    }
  }
}
