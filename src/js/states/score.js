import { WithControlls, KEYS } from '../core/withMenuControllsState';
import BackgroundScore from '../objects/backgroundScore';
import { gameState } from '../currentGameState';
import { btnSlideDown } from '../controls/controls';
import { BUTTONS, withHandler } from '../core/buttons';

export default class extends WithControlls {
  preload() {
    super.preload([
      withHandler(BUTTONS.BACK, this.toStart),
    ], gameState.gameHeight - 300);
    this.load.image('scores_bg', './img/states/bgScore.jpg');
  }

  create() {

    const score = JSON.parse(localStorage.getItem('score'));

    this.background = this.add.image(0, 0, 'scores_bg').setOrigin(0.15, 0).setScale(1.5);

    const textScore = this.add.text(this.scale.width / 2, 80, 'Score', { font: '32px Orbitron', fill: '#dddddd' });
    textScore.setOrigin(0.5, 0.5);

    score.forEach((el, i) => {
      const player = this.add.text(this.scale.width / 2, (50 * i) + 140, `${el.name} : ${el.value}  `, { font: '32px Orbitron', fill: `${el.color}` });
      player.setOrigin(0.5, 0.5);
    });

    this.back = false;
    super.create();
  }

  update() {
    super.update();
    // ---------------------------scale block-----------------------------------
    gameState.gameWidth = document.documentElement.clientWidth;
    gameState.gameHeight = document.documentElement.clientHeight;
    this.game.width = gameState.gameWidth;
    this.game.height = gameState.gameHeight;
    //-------------------------------------------------------------------------

    if (this.back) {
      const isAllBtnsSlideDown = btnSlideDown(this.buttonInstances);
      if (isAllBtnsSlideDown) {
        this.scene.start('mainMenu');
      }
    }
  }

  toStart() {
    this.back = true;
  }
}
