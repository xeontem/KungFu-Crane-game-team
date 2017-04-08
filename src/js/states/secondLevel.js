import Phaser from 'phaser-ce';

import config from '../config';
import currentGameState from '../currentGameState';
import BackgroundMainGame from '../objects/backgroundFirstlevel';
import MainPlayer from '../objects/mainPlayer';
import Bullets from '../objects/bullets';
import BulletBoss from '../objects/bulletBoss';
import enemiesloader from '../loaders/enemiesloader';
import bossloader from '../loaders/bossloader';
import { keysOn, setKeys, mouseOn } from '../controls/controls';
import { weaponOn } from '../objects/weapon';

export default class extends Phaser.State {

  preload() {
    this.load.image('background', './img/states/bgLevel2.jpg');
    this.load.image('mainPlayer', './img/player/player.png');
    this.load.image('bullet', './img/player/shot.png');
    this.load.image('enemy', './img/enemy/enemy.png');
  }

  create() {
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

        // ------------------------bossBullets-----------------------------------------
    this.bulletBoss = new BulletBoss({
      game: this,
      parent: null,
      name: 'bull2',
      addToStage: true,
      enableBody: true,
      physicsBodyType: Phaser.Physics.ARCADE,
    });
    this.game.add.existing(this.bulletBoss);

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
                            config.gameHeight / 2 - 50,
                            'Level 2: Over The Galaxy',
                            { font: '32px Arial', fill: '#dddddd' });
    this.levelName.anchor.setTo(0.5);
        // --------------------reset to defaults-----------------------------------
    currentGameState.bosskilled = false;
    currentGameState.bosstime = false;
  }

  update() {
        // --------------------------countDown-------------------------------------

    if (this.time.now < this.countdown + 4000) {
      this.mainPlayer.x += 8;
    } else {
      this.levelName.text = '';


        // --------------------------update statusBar------------------------------
      this.mainPlayerHP.text = `HP: ${this.mainPlayer.HP}`;
      this.scoreText.text = `score: ${currentGameState.score}`;

        // --------------------------if press nothing stop the ship------------
      this.mainPlayer.body.velocity.x = 0;
      this.mainPlayer.body.velocity.y = 0;

        // ----------------------------boss alive-------------------------------------------------
      if (!currentGameState.bosskilled) {
        // ------------------------spawn enemies-------------------------------------
        enemiesloader(this);

        // ---------------------spawn boss------------------------------------------
        bossloader(this);
      } else {
        if (this.winText) this.winText.text = 'Well done!';
        this.mainPlayer.x += 20;
        if (this.boss.endLevel && this.time.now > this.boss.endLevel + 4000) {
          this.state.start('thirdLevel');
        }
      }
        // -------------------------controls----------------------------------------
      keysOn.apply(this);
        //-------------------------------------------------------------------------
      mouseOn.apply(this);
    }
  }

}
