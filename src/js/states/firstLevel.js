import Phaser from 'phaser-ce';
import config from '../config';
import currentGameState from '../currentGameState';
import BackgroundMainGame from '../objects/backgroundFirstlevel';
import Bullets from '../objects/bullets';
import BulletBoss from '../objects/bulletBoss';
import enemiesloader from '../loaders/enemiesloader';
import bossloader from '../loaders/bossloader';
import resetter from '../loaders/resetter';
import { keysOn, setKeys, mouseOn } from '../controls/controls';
import { loadMusic, applyMusic } from '../sound/bgmusic';

export default class extends Phaser.State {

  preload() {
    this.load.image('background', './img/states/bgLevel1.jpeg');
    this.load.image('bullet', './img/player/shot.png');
    this.load.image('enemy', './img/enemy/enemy.png');
    this.sprite = this.load.spritesheet('mainPlayerSprite', './img/player/main_sprite.png', 95, 50);
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

        //---------------------------MainPlayer---------------------------------------

    this.mainPlayer = this.game.add.sprite(-1800, this.game.world.centerY, 'mainPlayerSprite');
    this.game.add.existing(this.mainPlayer);
    this.game.physics.enable(this.mainPlayer, Phaser.Physics.ARCADE);
    let fly = this.mainPlayer.animations.add('fly');
    this.mainPlayer.animations.play('fly', 10, true);

        // ----------------------MainPlayerBullets-----------------------------------------
    this.bullets = new Bullets({
      game: this,
      parent: null,
      name: 'bull',
      addToStage: true,
      enableBody: true,
      physicsBodyType: Phaser.Physics.ARCADE,
    });
    this.game.add.existing(this.bullets);



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
                            (config.gameHeight / 2) - 50,
                            'Level 1: Throw The Universe',
                            { font: '32px Arial', fill: '#dddddd' });
    this.levelName.anchor.setTo(0.5);
        // --------------------reset to defaults-----------------------------------
    resetter(this);
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

        // -------------------------boss alive-------------------------------------------------
      if (!currentGameState.bosskilled) {
        // ------------------------spawn enemies-------------------------------------
        enemiesloader(this);

        // ---------------------spawn boss------------------------------------------
        bossloader(this);
      } else {
        if (this.winText) this.winText.text = 'Well done!';
        this.mainPlayer.x += 20;
        if (this.boss.endLevel && this.time.now > this.boss.endLevel + 4000) {
          this.state.start('secondLevel');
        }
      }
        // ---------------------controls----------------------------------------
      keysOn.apply(this);
        //-------------------------------------------------------------------------
      mouseOn.apply(this);
    }
  }

}
