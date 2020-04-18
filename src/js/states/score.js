import { WithControlls, KEYS } from '../core/withMenuControllsState';
import BackgroundScore from '../objects/backgroundScore';
import { gameState } from '../currentGameState';
import { onScoresChange, getLocalUsers, userData } from '../core/firebase.service';

export default class extends WithControlls {
  preload() {
    super.preload();
    this.load.image('loaderBg', './img/states/bgScore.jpg');
    this.load.spritesheet('back', './img/pause/back.png', 300, 80);
  }

  create() {
    super.create();
    this.scoreTexts = [];
    this.renderScores(getLocalUsers());
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

    const textScore = this.add.text(this.world.centerX, 80, 'Best scores: ', { font: '32px Orbitron', fill: '#dddddd' });
    textScore.anchor.setTo(0.5, 0.5);
    onScoresChange(scores => {
      if (this.state.current === 'score') {
        this.renderScores([...scores, ...getLocalUsers()]);
      }
    });

    this.backButton = this.game.add.button(this.game.world.centerX, gameState.gameHeight - 100, 'back', this.toStart, this, 1, 0, 1);
    this.backButton.scale.setTo(gameState.gameHeight / 1050);
    this.backButton.anchor.setTo(0.5);
    this.backButton.frame = 1;
    this.back = false;
  }

  renderScores(scores) {
    if (scores.length > 10) {
      scores.length = 10;
    }

    this.scoreTexts.forEach(text => text.destroy());
    this.scoreTexts = null;
    this.scoreTexts = scores.filter(score => score.nickName).sort((a, b) => +a.score > +b.score).map((score, i) => {
      const isCurrentUser = userData.uid ? score.uid === userData.uid : score.uid === userData.nickName;
      const scoreText = this.add.text(this.world.centerX, (50 * i) + 140, `${score.nickName} : ${score.score}  `, { font: '32px Orbitron', fill: isCurrentUser ? '#ff0' : '#dddddd' });
      scoreText.anchor.setTo(0.5, 0.5);
      return scoreText;
    });
  }

  update() {
    super.update();
    // ---------------------------scale block-----------------------------------
    gameState.gameWidth = document.documentElement.clientWidth;
    gameState.gameHeight = document.documentElement.clientHeight;
    this.game.width = gameState.gameWidth;
    this.game.height = gameState.gameHeight;
    //-------------------------------------------------------------------------

    if (this[KEYS.CONFIRM.ONCE]) {
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
