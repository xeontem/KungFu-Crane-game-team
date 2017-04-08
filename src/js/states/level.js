import Phaser from 'phaser-ce';
import config from '../config';
import currentGameState from '../currentGameState';
import BackgroundMainGame from '../objects/backgroundFirstlevel';
import MainPlayer from '../objects/mainPlayer';
import enemiesloader from '../loaders/enemiesloader';
import bossloader from '../loaders/bossloader';
import collisionloader from '../loaders/collisionloader';
import resetter from '../loaders/resetter';
import { keysOn, setKeys, mouseOn } from '../controls/controls';
import { loadMusic, applyMusic } from '../sound/bgmusic';
import { weaponOn } from '../objects/weapon';
import conf from '../levelsConfig';

export default class extends Phaser.State {

  preload() {
    this.load.image('background', conf[currentGameState.level].bg);
    this.load.image('mainPlayer', './img/player/player.png');
    this.load.image('bullet', './img/player/shot.png');
    this.load.image('enemy', './img/enemy/enemy.png');
    loadMusic.apply(this);
  }

  create() {
        // -----------------music-----------------------------------------
    applyMusic.apply(this);
        //---------------------------------------------------------------
    this.background = new BackgroundMainGame({
      game: this,
      x: 0,
      y: 0,
      width: 1024,
      height: 768,
      asset: 'background',
    });
    this.game.add.existing(this.background);

        //---------------------------------------------------------------
    this.mainPlayer = new MainPlayer({
      game: this,
      x: -1800,
      y: this.game.world.centerY,
      asset: 'mainPlayer',
    });
    this.game.add.existing(this.mainPlayer);

    // ----------------------MainPlayerBullets-----------------------------------------
    weaponOn.apply(this);

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
                            `HP: ${this.mainPlayer.HP}`,
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
        // --------------------reset to defaults-----------------------------------
    // resetter.apply(this);
  }

  update() {
        // --------------------------countDown-------------------------------------

    if (this.time.now < this.countdown + 4000) {
      this.mainPlayer.x += 8;
    } else {
      this.levelName.text = '';

      collisionloader.apply(this);
        // --------------------------update statusBar------------------------------
      this.mainPlayerHP.text = `HP: ${this.mainPlayer.HP}`;
      this.scoreText.text = `score: ${currentGameState.score}`;

        // --------------------------if press nothing stop the ship------------
      this.mainPlayer.body.velocity.x = 0;
      this.mainPlayer.body.velocity.y = 0;

        // -------------------------boss alive-------------------------------------------------
      if (!currentGameState.bosskilled) {
        // ------------------------spawn enemies-------------------------------------
        enemiesloader.apply(this);

        // ---------------------spawn boss------------------------------------------
        bossloader.apply(this);
      } else {
        this.winText.text = 'Well done!';
        this.mainPlayer.x += 20;
        if (this.boss.endLevel && this.time.now > this.boss.endLevel + 4000) {
          currentGameState.level += 1;
          currentGameState.bosskilled = false;
          currentGameState.bosstime = false;
          currentGameState.levelscore = 0;
          this.boss = null;
          this.state.start('level');
        }

      }
        // ---------------------controls----------------------------------------
      keysOn.apply(this);
        //-------------------------------------------------------------------------
      mouseOn.apply(this);
    }
  }
}
