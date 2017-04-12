import Phaser from 'phaser-ce';
import config from '../config';
import currentGameState from '../currentGameState';
import { preloadAnimation, createAnimation } from '../loaders/animationsloader';
import enemiesloader from '../loaders/enemiesloader';
import gameOverloader from '../loaders/gameOverloader';
import bossloader from '../loaders/bossloader';
import collisionloader from '../loaders/collisionloader';
import resetter from '../loaders/resetter';
import { keysOn, setKeys, mouseOn } from '../controls/controls';
import { loadMusic, applyMusic } from '../sound/bgmusic';
import conf from '../levelsConfig';

export default class extends Phaser.State {

preload() {
    preloadAnimation.apply(this);
    loadMusic.apply(this);
}

  create() {
  	//this.particleStorm = this.plugins.add(Phaser.ParticleStorm);
    resetter.apply(this);
    // -----------------music-----------------------------------------
    applyMusic.apply(this);
    //---------------------------------------------------------------
    createAnimation.apply(this);
    // -------------------------statusBar---------------------------------
    this.scoreText = this.add.text(
        config.gameWidth - 200,
        config.gameHeight - 50,
        `score: ${currentGameState.score}`,
        { font: '32px Arial', fill: '#dddddd' });
    this.scoreText.anchor.setTo(0.5);

    this.mainPlayerHP = this.add.text(
                            200,
                            config.gameHeight - 50,
                            `HP: ${config.mainPlayerHP}`,
                            { font: '32px Arial', fill: '#dddddd' });
    this.mainPlayerHP.anchor.setTo(0.5);

        // -----------------------------input----------------------------------
    setKeys.apply(this);

        // -----------------------------countdown---------------------------------
    this.countdown = this.time.now;
    this.levelName = this.add.text(
                            config.gameWidth / 2,
                            (config.gameHeight / 2) - 50,
                            conf[currentGameState.level].levelName,
                            { font: '32px Arial', fill: '#dddddd' });
    this.levelName.anchor.setTo(0.5);
    //-----------------------------winCase-----------------------------------------
    this.winText = this.add.text(
                            config.gameWidth / 2,
                            (config.gameHeight / 2) - 50,
                            '',
                            { font: '32px Arial', fill: '#dddddd' });
  }

  update() {
    this.currentWeapon = this[`weapon${currentGameState.mainPlayerWeapon}`];
    // --------------------------countDown-------------------------------------

    if (this.time.now < this.countdown + 500) {
        this.mainPlayer.x += 8;
    } else {
      this.levelName.text = '';

      collisionloader.apply(this);
        // --------------------------update statusBar------------------------------
      this.mainPlayerHP.text = `HP: ${config.mainPlayerHP}`;
      this.scoreText.text = `score: ${currentGameState.score}`;

        // --------------------------if press nothing stop the ship------------
      this.mainPlayer.body.velocity.x = 0;
      this.mainPlayer.body.velocity.y = 0;

        //------------------------changing states of main player----------------

      if (config.mainPlayerHP == 1) {
          this.mainPlayer.animations.add('up', [39, 40, 41, 42, 43, 44, 45, 46, 47]);
          this.mainPlayer.animations.add('upBack', [47, 46, 45, 44, 43, 42, 41, 40, 39]);
          this.mainPlayer.animations.add('down', [48, 49, 50, 51, 52, 53, 54, 55, 56]);
          this.mainPlayer.animations.add('downBack', [56, 55, 54, 53, 52, 51, 50, 49, 48]);
          this.mainPlayer.frame = 38;
      }
      else if (config.mainPlayerHP == 2) {
          this.mainPlayer.animations.add('up', [20, 21, 22, 23, 24, 25, 26, 27, 28]);
          this.mainPlayer.animations.add('upBack', [28, 27, 26, 25, 24, 23, 22, 21, 20]);
          this.mainPlayer.animations.add('down', [29, 30, 31, 32, 33, 34, 35, 36, 37]);
          this.mainPlayer.animations.add('downBack', [37, 36, 35, 34, 33, 32, 31, 30, 29]);
          this.mainPlayer.frame = 19;
      }
      else if (config.mainPlayerHP > 2) {
          this.mainPlayer.animations.add('up', [1, 2, 3, 4, 5, 6, 7, 8, 9]);
          this.mainPlayer.animations.add('upBack', [9, 8, 7, 6, 5, 4, 3, 2, 1]);
          this.mainPlayer.animations.add('down', [10, 11, 12, 13, 14, 15, 16, 17, 18]);
          this.mainPlayer.animations.add('downBack', [18, 17, 16, 15, 14, 13, 12, 11, 10]);
          this.mainPlayer.frame = 0;
      }

        // -------------------------boss alive-------------------------------------------------
      if (!currentGameState.bosskilled) {
        // ------------------------spawn enemies-------------------------------------
        enemiesloader.apply(this);

        // ---------------------spawn boss------------------------------------------
        bossloader.apply(this);
      } else {
        this.winText.text = 'Well done!';
        ///this.mainPlayer.x += 20; TODO!!!!
        if (this.time.now > this.countdown + 4000) {
          currentGameState.level += 1;
          if (currentGameState.level > conf.length - 1) {
            gameOverloader.apply(this);
          } else {
            this.state.start('level');
          }
        }
      }
      //--------------------if mainPlayer dies-----------------------------------
      if (currentGameState.mainPlayerKilled) {
          gameOverloader.apply(this);
      }
      // ---------------------controls----------------------------------------
      keysOn.apply(this);
      //-------------------------------------------------------------------------
      mouseOn.apply(this);
    }
  }
}
