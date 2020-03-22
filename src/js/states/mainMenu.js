import { WithControlls, KEYS } from '../core/withMenuControllsState';
import BackgroundMainMenu from '../objects/backgroundMainMenu';
import { loadMusic, applyMusic } from '../sound/bgmusic';
import { loadAndStartSavedGame, applyNextActiveBtnIndex } from '../controls/controls';
import { gameState, resetGameState } from '../currentGameState';

export default class extends WithControlls {
  preload() {
    super.preload();
    this.load.spritesheet('startBtnTexture', './img/pause/start.png', 300, 80);
    this.load.spritesheet('loginBtnTexture', './img/pause/login.png', 300, 80);
    this.load.spritesheet('scoresBtnTexture', './img/pause/scores.png', 300, 80);
    this.load.spritesheet('loadBtnTexture', './img/pause/load.png', 300, 80);
    this.load.image('loaderBg', './img/states/bgMainMenu.jpg');
    this.load.image('player', './img/player/player.png');
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

    // --------------------------------------BUTTONS------------------------------------------------
    this.loopedNextActiveIndex = 0;
    this.buttonList = [
      {
        texture: 'startBtnTexture',
        handler: this.toStart,
      },
      {
        texture: 'loginBtnTexture',
        handler: this.login,
      },
      {
        texture: 'loadBtnTexture',
        handler: this.loadSavedGame,
      },
      {
        texture: 'scoresBtnTexture',
        handler: this.toScores,
      },
    ];

    this.buttonInstances = this.buttonList.map((btnData, i) => {
      const currentButton = this.game.add.button(
        this.game.world.centerX,
        gameState.gameHeight - (80 * (this.buttonList.length - i)),
        btnData.texture,
        btnData.handler,
        this,
        1,
        0,
        1,
      );
      currentButton.scale.setTo(gameState.gameHeight / 1050);
      currentButton.anchor.setTo(0.5);
      return currentButton;
    });
    this.buttonInstances[this.loopedNextActiveIndex].frame = 1;
    // ---------------------------------------------------------------------------------------------
    this.startGame = false;
    this.startScore = false;
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
      this.buttonList[this.loopedNextActiveIndex].handler.apply(this);
    }

    if (this[KEYS.UP.ONCE]) {
      applyNextActiveBtnIndex.call(this, true);
    }

    if (this[KEYS.DOWN.ONCE]) {
      applyNextActiveBtnIndex.call(this, false);
    }

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
          this.state.start('createName');
          this.startGame = false;
        } else if (this.startScore) {
          this.state.start('score');
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
