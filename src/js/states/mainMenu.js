import { WithControlls } from '../core/withMenuControllsState';
import BackgroundMainMenu from '../objects/backgroundMainMenu';
import { loadMusic, applyMusic } from '../sound/bgmusic';
import { loadAndStartSavedGame } from '../controls/controls';
import { gameState, resetGameState } from '../currentGameState';
import { BUTTONS, withHandler } from '../core/buttons';

export default class extends WithControlls {
  preload() {
    super.preload([
      withHandler(BUTTONS.START, this.toStart),
      withHandler(BUTTONS.LOGIN, this.login),
      withHandler(BUTTONS.LOAD, this.loadSavedGame),
      withHandler(BUTTONS.SCORES, this.toScores),
    ]);

    this.load.image('loaderBg', './img/states/bgMainMenu.jpg');
    this.load.image('player', './img/player/player.png');

    // load music
    loadMusic.apply(this);
  }

  create() {
    super.create();
    resetGameState();
    applyMusic.apply(this);

    this.background = new BackgroundMainMenu({
      game,
      x: 0,
      y: 0,
      width: 1024,
      height: 512,
      asset: 'loaderBg',
    });
    this.background.scale.setTo(gameState.gameWidth / this.background.width, gameState.gameHeight / this.background.height);
    this.game.add.existing(this.background);

    this.playerBack = this.game.add.sprite(this.game.world.centerX - gameState.gameWidth / 16, this.game.world.centerY, 'player');
    this.playerBack.anchor.setTo(0.5);
    this.playerBack.scale.setTo(gameState.gameHeight / 1050);

    this.gameTitle = this.add.text(
      this.world.centerX,
      this.world.centerY - gameState.gameHeight / 10,
      'Hawking Revenge ',
      { font: `${gameState.gameHeight / 15}px Orbitron`, fontWeight: 'bold', fill: '#ff0' },
    );
    this.gameTitle.anchor.setTo(0.5);

    // ---------------------------------------------------------------------------------------------
    this.startGame = false;
    this.startScore = false;
    this.startSavedGame = false;
  }

  update() {
    super.update();

    // ---------------------------scale block-----------------------------------
    gameState.gameWidth = document.documentElement.clientWidth;
    gameState.gameHeight = document.documentElement.clientHeight;
    this.game.width = gameState.gameWidth;
    this.game.height = gameState.gameHeight;

    //-------------------------------------------------------------------------
    const bottomScreenBound = gameState.gameHeight + 50;
    if (this.startGame || this.startScore || this.startSavedGame) {
      this.buttonInstances.forEach((btn, i) => {
        if (btn.y < bottomScreenBound) {
          if (i === 0 || this.buttonInstances[i - 1].y < bottomScreenBound) {
            btn.y += 12;
          }
        }
      });
      if (
        this.gameTitle.y < bottomScreenBound &&
        this.buttonInstances[this.buttonInstances.length - 1].y >= bottomScreenBound
      ) {
        this.gameTitle.y += 12;
      }
      if (this.gameTitle.y > bottomScreenBound && this.background.alpha > 0) {
        this.background.alpha -= 0.02;
      }
      if (this.background.alpha <= 0) {
        if (this.startGame) {
          this.mainMenuMusic.pause();
          this.scene.start('createName');
          this.startGame = false;
        } else if (this.startScore) {
          this.scene.start('score');
          this.startScore = false;
        } else if (this.startSavedGame) {
          this.mainMenuMusic.pause();
          loadAndStartSavedGame(this);
          this.startSavedGame = false;
        }
      }
    }
  }

  toStart() {
    this.startGame = true;
  }

  toScores() {
    this.startScore = true;
  }

  loadSavedGame() {
    this.startSavedGame = true;
  }
}
