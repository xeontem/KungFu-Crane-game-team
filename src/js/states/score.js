import Phaser from 'phaser-ce';
import { anyGamepadKeyPressed } from '../controls/controls';
import BackgroundScore from '../objects/backgroundScore';
import { gameState } from '../currentGameState';

export default class extends Phaser.State {
  preload() {
    this.load.image('loaderBg', './img/states/bgScore.jpg');
    this.load.spritesheet('back', './img/pause/back.png', 300, 80);
  }

  create() {
    const score = JSON.parse(localStorage.getItem('score'));

    this.background = new BackgroundScore({
      game,
      x: 0,
      y: 0,
      width: gameState.gameWidth,
      height: gameState.gameheight,
      asset: 'loaderBg',
    });
    this.background.scale.setTo(gameState.gameWidth / this.background.width, gameState.gameHeight / this.background.height);
    this.game.add.existing(this.background);

    const textScore = this.add.text(this.world.centerX, 80, 'Score  ', { font: '32px Orbitron', fill: '#dddddd' });
    textScore.anchor.setTo(0.5, 0.5);

    score.forEach((el, i) => {
      const player = this.add.text(this.world.centerX, (50 * i) + 140, `${el.name} : ${el.value}  `, { font: '32px Orbitron', fill: `${el.color}` });
      player.anchor.setTo(0.5, 0.5);
    });

    this.backButton = this.game.add.button(this.game.world.centerX, gameState.gameHeight - 100, 'back', this.toStart, this, 1, 0, 1);
    this.backButton.scale.setTo(gameState.gameHeight / 1050);
    this.backButton.anchor.setTo(0.5);
    this.backButton.frame = 1;
    this.back = false;
    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  }

  update() {
    // ---------------------------scale block-----------------------------------
    gameState.gameWidth = document.documentElement.clientWidth;
    gameState.gameHeight = document.documentElement.clientHeight;
    this.game.width = gameState.gameWidth;
    this.game.height = gameState.gameHeight;
    //-------------------------------------------------------------------------

    if ((this.fireButton.repeats === 1 || anyGamepadKeyPressed()) && !this.back) {
      this.toStart();
    }

    if (this.back) {
      this.backButton.y += 7;
      if (this.backButton.y > gameState.gameHeight + 30) {
        this.state.start('mainMenu');
      }
    }
  }

  toStart() {
    this.back = true;
  }
}
