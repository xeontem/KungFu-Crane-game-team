import Phaser from 'phaser-ce';
import config from '../config';
import currentGameState from '../currentGameState';
import BackgroundMainGame from '../objects/backgroundFirstlevel';
import enemiesloader from '../loaders/enemiesloader';
import gameOverloader from '../loaders/gameOverloader';
import bossloader from '../loaders/bossloader';
import collisionloader from '../loaders/collisionloader';
import resetter from '../loaders/resetter';
import { keysOn, setKeys, mouseOn } from '../controls/controls';
import { loadMusic, applyMusic } from '../sound/bgmusic';
import { weaponOn, spreadWeapon, threeWayWeapon } from '../objects/weapon';
import conf from '../levelsConfig';

export default class extends Phaser.State {

preload() {
    this.load.image('background', conf[currentGameState.level].bg);
    this.load.image('bullet', './img/player/shot.png');
    this.load.image('missile', './img/player/shot1.png');
    this.load.spritesheet('missile2', './img/player/missile.png', 40, 18);
    this.load.image('enemy_1', './img/enemy/enemy_1.png');
    this.load.image('enemy_2', './img/enemy/enemy_2.png');
    this.load.image('enemy_3', './img/enemy/enemy_3.png');
    this.load.image('boss', conf[currentGameState.level].boss);
    //-----------------------particle----------------------------------------
    game.load.spritesheet('stars', './img/states/rain.png', 17, 17);
    //-----------------------benefits image----------------------------------
    this.load.image('health', './img/player/health.png');
    this.load.image('score', './img/player/score.png');
    this.load.image('shield', './img/player/shield.png');
    this.load.image('shieldOn', './img/player/shieldOn.png');
    this.load.image('burst', './img/player/burst.png');
    this.load.image('ammo', './img/player/ammo.png');
    //-----------------------------------------------------------------------
    this.load.spritesheet('button', './img/pause/Buttons.png', 300, 80);
    this.load.spritesheet('menuButton', './img/pause/mainMenuButton.png', 300, 80);
    this.load.spritesheet('reload', './img/pause/reloadButton.png', 300, 80);
    //-----------------------------------------------------------------------
    this.load.spritesheet('mainPlayerSprite', './img/player/spriteTrimmedMin.png', 95, 58);
    this.load.spritesheet('exhaust', './img/player/exhaust.png', 23, 84);
    loadMusic.apply(this);
}

  create() {
    resetter.apply(this);
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
    //---------------------------particles----------------------------------------
    this.emitter = game.add.emitter(game.world.centerX, -1024, 600);

	this.emitter.width = game.world.width;
	this.emitter.height = game.world.height;
	this.emitter.angle = 90; // uncomment to set an angle for the stars.

	this.emitter.makeParticles('stars');

	this.emitter.minParticleScale = 0.1;
	this.emitter.maxParticleScale = 0.5;

	this.emitter.setYSpeed(300, 500);
	this.emitter.setXSpeed(-5, 5);

	this.emitter.minRotation = 0;
	this.emitter.maxRotation = 0;

	this.emitter.start(false, 1600, 5, 0);
    //---------------------------MainPlayer---------------------------------------
    this.mainPlayer = this.game.add.sprite(-1800, this.game.world.centerY, 'mainPlayerSprite');
    this.mainPlayer.anchor.setTo(0.5);
    this.game.add.existing(this.mainPlayer);
    this.game.physics.enable(this.mainPlayer, Phaser.Physics.ARCADE);
    this.mainPlayer.frame = 0;
    this.mainPlayer.animations.add('up', [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    this.mainPlayer.animations.add('upBack', [9, 8, 7, 6, 5, 4, 3, 2, 1]);
    this.mainPlayer.animations.add('down', [10, 11, 12, 13, 14, 15, 16, 17, 18]);
    this.mainPlayer.animations.add('downBack', [18, 17, 16, 15, 14, 13, 12, 11, 10]);
    this.mainPlayer.body.collideWorldBounds = true;
    this.exhaust1 = this.mainPlayer.addChild(this.game.make.sprite(-51.5, -19, 'exhaust'));
    this.exhaust1.anchor.setTo(0.5);
    this.exhaust1.scale.setTo(0.2, 0.2);
    this.exhaust1.angle = 90;
    this.exhaust2 = this.mainPlayer.addChild(this.game.make.sprite(-51.5, 12, 'exhaust'));
    this.exhaust2.anchor.setTo(0.5);
    this.exhaust2.scale.setTo(0.2, 0.2);
    this.exhaust2.angle = 90;
    this.exhaust1.animations.add('exh');
    this.exhaust2.animations.add('exh');
    this.exhaust1.animations.play('exh', 5, true);
    this.exhaust2.animations.play('exh', 5, true);


    // ----------------------MainPlayerBullets-----------------------------------------

    this.weapon1 = weaponOn.apply(this);
    this.weapon2 = spreadWeapon.apply(this);
    this.weapon3 = threeWayWeapon.apply(this);
    config.weapons.push(this.weapon1);
    config.weapons.push(this.weapon2);
    config.weapons.push(this.weapon3);

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
