import { WithControlls } from '../core/withMenuControllsState';
import { applyMusic } from '../sound/bgmusic';
import { loadAndStartSavedGame, btnSlideDown, bottomScreenBound } from '../controls/controls';
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
    this.load.audio('main_menu_theme', './sounds/mainMenu.ogg');
  }

  create() {

    resetGameState();

    if (!this.mainMenuTheme) {
      this.mainMenuTheme = this.sound.add('main_menu_theme', { loop: true });
      this.mainMenuTheme.play();
    }

    this.background = this.add.image(0, 0, 'loaderBg').setOrigin(0.15, 0).setScale(1.5);

    this.playerBack = this.add.sprite((this.scale.width / 2) - gameState.gameWidth / 16, this.scale.height / 2, 'player');
    this.playerBack.setOrigin(0.5);
    this.playerBack.setScale(gameState.gameHeight / 1050);

    this.gameTitle = this.add.text(
      this.scale.width / 2,
      (this.scale.height / 2) - gameState.gameHeight / 10,
      'Hawking Revenge ',
      { font: `${gameState.gameHeight / 15}px Orbitron`, fontWeight: 'bold', fill: '#ff0' },
    );
    this.gameTitle.setOrigin(0.5);

    this.startGame = false;
    this.startScore = false;
    this.startSavedGame = false;
    super.create();
  }

  update() {
    super.update();

    // ---------------------------scale block-----------------------------------
    this.game.width = gameState.gameWidth;
    this.game.height = gameState.gameHeight;

    //-------------------------------------------------------------------------
    const bottomScreenBound = gameState.gameHeight + 50;
    if (this.startGame || this.startScore || this.startSavedGame) {
      const isAllBtnsSlideDown = btnSlideDown(this.buttonInstances);
      if (this.gameTitle.y < bottomScreenBound && isAllBtnsSlideDown) {
        this.gameTitle.y += 12;
      }
      if (this.gameTitle.y > bottomScreenBound && this.background.alpha > 0) {
        this.background.alpha -= 0.02;
      }
      if (this.background.alpha <= 0) {
        if (this.startGame) {
          this.mainMenuTheme.pause();
          this.scene.start('createName');
          this.startGame = false;
        } else if (this.startScore) {
          this.scene.start('score');
          this.startScore = false;
        } else if (this.startSavedGame) {
          this.mainMenuTheme.pause();
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

  login() {

  }
}
