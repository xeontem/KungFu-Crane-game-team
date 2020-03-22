import { WithControlls, KEYS } from '../core/withMenuControllsState';
import { gameState, resetLevelState } from '../currentGameState';
import { preloadAnimation, createAnimation, paintInYellow, normalPaintBoss } from '../loaders/animationsloader';
import enemiesloader from '../loaders/enemiesloader';
import gameOverloader from '../loaders/gameOverloader';
import bossloader from '../loaders/bossloader';
import collisionloader from '../loaders/collisionloader';
import { invokePauseMenu } from './pauseMenu';
import { loadAndStartSavedGame, saveGame, addMouseControll } from '../controls/controls';
import { loadMusic, applyMusic } from '../sound/bgmusic';
import levelsConfig from '../levelsConfig';

export default class extends WithControlls {
  preload() {
    super.preload();
    preloadAnimation.apply(this);
    loadMusic.apply(this);
  }

  create() {
    super.create();
    resetLevelState();
    this.boss = null;
    this.bossWeapon11 = null;
    this.bossWeapon21 = null;
    this.bossWeapon22 = null;

    applyMusic.apply(this);
    createAnimation.apply(this);
    addMouseControll.apply(this);

    // -------------------------statusBar---------------------------------
    this.scoreText = this.add.text(
        gameState.gameWidth - gameState.gameWidth / 8.4,
        gameState.gameHeight - gameState.gameHeight / 21,
        `score: ${gameState.score}`,
        { font: `${gameState.gameHeight / 32.8}px Orbitron`, fill: '#dddddd' });
    this.scoreText.anchor.setTo(0.5);

    this.mainPlayerHP = this.add.text(
        gameState.gameWidth / 8.4,
        gameState.gameHeight - gameState.gameHeight / 21,
        `HP: ${gameState.mainPlayerHP}`,
        { font: `${gameState.gameHeight / 32.8}px Orbitron`, fill: '#dddddd' });
    this.mainPlayerHP.anchor.setTo(0.5);

    // -----------------------------countdown---------------------------------
    this.countdown = this.time.now;
    this.levelName = this.add.text(
      gameState.gameWidth / 2,
      (gameState.gameHeight / 2) - 50,
      levelsConfig[gameState.level].levelName,
      { font: `${gameState.gameHeight/32.8}px Orbitron`, fill: '#dddddd' }
    );
    this.levelName.anchor.setTo(0.5);

    // -----------------------------winCase-----------------------------------------
    this.winText = this.add.text(
      gameState.gameWidth / 2,
      (gameState.gameHeight / 2),
      '',
      { font: `${gameState.gameHeight/32.8}px Orbitron`, fill: '#dddddd' }
    );
    this.winText.anchor.setTo(0.5);
  }

  update() {
    super.update();
    // ---------------------------scale block-----------------------------------
    gameState.gameWidth = document.documentElement.clientWidth;
    gameState.gameHeight = document.documentElement.clientHeight;
    this.game.width = gameState.gameWidth;
    this.game.height = gameState.gameHeight;

    //-------------------------- weapon ------------------------------------
    this.currentWeapon = this[`weapon${gameState.mainPlayerWeapon}`];
    // --------------------------countDown-------------------------------------

    if (this.time.now < this.countdown + 2000) {
      if (this.mainPlayer.x < 200) {
        this.mainPlayer.x += 8;
      }
    } else {
      this.levelName.text = '';

      collisionloader.apply(this);
      // --------------------------update statusBar------------------------------
      this.mainPlayerHP.text = `HP: ${gameState.mainPlayerHP} `;
      this.scoreText.text = `score: ${gameState.score} `;

      // --------------------------if press nothing stop the ship------------
      this.mainPlayer.body.velocity.x = 0;
      this.mainPlayer.body.velocity.y = 0;

      // ------------------------changing states of main player----------------

      if (gameState.mainPlayerHP == 1) {
        this.mainPlayer.animations.add('up', [39, 40, 41, 42, 43, 44, 45, 46, 47]);
        this.mainPlayer.animations.add('upBack', [47, 46, 45, 44, 43, 42, 41, 40, 39]);
        this.mainPlayer.animations.add('down', [48, 49, 50, 51, 52, 53, 54, 55, 56]);
        this.mainPlayer.animations.add('downBack', [56, 55, 54, 53, 52, 51, 50, 49, 48]);
        this.mainPlayer.frame = 38;
      }
      else if (gameState.mainPlayerHP == 2) {
        this.mainPlayer.animations.add('up', [20, 21, 22, 23, 24, 25, 26, 27, 28]);
        this.mainPlayer.animations.add('upBack', [28, 27, 26, 25, 24, 23, 22, 21, 20]);
        this.mainPlayer.animations.add('down', [29, 30, 31, 32, 33, 34, 35, 36, 37]);
        this.mainPlayer.animations.add('downBack', [37, 36, 35, 34, 33, 32, 31, 30, 29]);
        this.mainPlayer.frame = 19;
      }
      else if (gameState.mainPlayerHP > 2) {
        this.mainPlayer.animations.add('up', [1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.mainPlayer.animations.add('upBack', [9, 8, 7, 6, 5, 4, 3, 2, 1]);
        this.mainPlayer.animations.add('down', [10, 11, 12, 13, 14, 15, 16, 17, 18]);
        this.mainPlayer.animations.add('downBack', [18, 17, 16, 15, 14, 13, 12, 11, 10]);
        this.mainPlayer.frame = 0;
      }

      // -------------------------boss alive-------------------------------------------------
      if (!gameState.bosskilled) {
        // ------------------------spawn enemies-------------------------------------
        enemiesloader.apply(this);
        // ---------------------spawn boss------------------------------------------
        bossloader.apply(this);
      } else {
        this.winText.text = 'Well done!';
        // /this.mainPlayer.x += 20; TODO!!!!
        if (this.time.now > this.countdown + 4000) {
          gameState.level += 1;
          if (gameState.level > levelsConfig.length - 1) {
            gameOverloader.apply(this);
          } else {
            this.state.start('level');
          }
        }
      }
      // --------------------if mainPlayer dies-----------------------------------
      if (gameState.mainPlayerKilled) {
        gameOverloader.apply(this);
      }

      // ---------------------controls----------------------------------------
      if (this[KEYS.LEFT.UP]) {
        this.exhaust1.scale.setTo(0.2);
        this.exhaust2.scale.setTo(0.2);
        this.exhaust1.y = -15;
        this.exhaust2.y = 16;
      }

      if (this[KEYS.RIGHT.UP]) {
        this.exhaust1.scale.setTo(0.2);
        this.exhaust2.scale.setTo(0.2);
        this.exhaust1.y = -16;
        this.exhaust2.y = 15;
      }

      if (this[KEYS.UP.UP]) {
        this.mainPlayer.animations.play('upBack', 30, false);
        if (gameState.mainPlayerHP <= 1) {
          this.mainPlayer.frame = 38;
        } else if (gameState.mainPlayerHP <= 2) {
          this.mainPlayer.frame = 19;
        } else {
          this.mainPlayer.frame = 0;
        }
      }

      if (this[KEYS.DOWN.UP]) {
        this.mainPlayer.animations.play('downBack', 30, false);
        if (gameState.mainPlayerHP <= 1) {
          this.mainPlayer.frame = 38;
        } else if (gameState.mainPlayerHP <= 2) {
          this.mainPlayer.frame = 19;
        } else {
          this.mainPlayer.frame = 0;
        }
      }

      if (this[KEYS.LEFT.DOWN]) {
        this.mainPlayer.body.velocity.x = -gameState.mainPlayerSpeed;
        this.exhaust1.scale.setTo(0.1);
        this.exhaust2.scale.setTo(0.1);
        this.exhaust1.y = -17;
        this.exhaust2.y = 14;
      }

      if (this[KEYS.RIGHT.DOWN]) {
        this.mainPlayer.body.velocity.x = gameState.mainPlayerSpeed;
        this.exhaust1.scale.setTo(0.3);
        this.exhaust2.scale.setTo(0.3);
        this.exhaust1.y = -17;
        this.exhaust2.y = 15;
      }

      if (this[KEYS.UP.DOWN]) {
        this.mainPlayer.body.velocity.y = -gameState.mainPlayerSpeed;
        this.mainPlayer.animations.play('up', 30, false);
        if (gameState.mainPlayerHP <= 1) {
          this.mainPlayer.frame = 47;
        } else if (gameState.mainPlayerHP <= 2) {
          this.mainPlayer.frame = 28;
        } else {
          this.mainPlayer.frame = 9;
        }
      }

      if (this[KEYS.DOWN.DOWN]) {
        this.mainPlayer.body.velocity.y = gameState.mainPlayerSpeed;
        this.mainPlayer.animations.play('down', 30, false);
        if (gameState.mainPlayerHP <= 1) {
          this.mainPlayer.frame = 56;
        } else if (gameState.mainPlayerHP <= 2) {
          this.mainPlayer.frame = 37;
        } else {
          this.mainPlayer.frame = 18;
        }
      }

      if (this[KEYS.CHANGE_WEAPON.ONCE]) {
        if (gameState.mainPlayerWeapon < 3) {
          gameState.mainPlayerWeapon += 1;
        } else {
          gameState.mainPlayerWeapon = 1;
        }
      }

      if (this[KEYS.FIRE.DOWN] && !gameState.mainPlayerKilled) {
        if (this.currentWeapon.multiple) {
          this.currentWeapon.weapon.forEach((gun) => {
            gun.fire();
          });
        } else {
          this.currentWeapon.weapon.fire();
        }
      }

      // once handlers
      if (this[KEYS.MENU.ONCE]) {
        invokePauseMenu.apply(this);
      }

      if (this[KEYS.SAVE.ONCE]) {
        saveGame();
      }

      if (this[KEYS.LOAD.ONCE]) {
        loadAndStartSavedGame(this);
      }
    }
  }

  render() {
    paintInYellow.apply(this);
    normalPaintBoss.apply(this);
  }
}
