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
    this.load.image('enemy', './img/enemy/enemy.png');
    this.load.image('boss_1', './img/bosses/boss_1.png');
    //-----------------------benefits image----------------------------------
    this.load.image('health', './img/player/health.png');
    this.load.image('score', './img/player/score.png');
    this.load.image('shield', './img/player/shield.png');
    this.load.image('shieldOn', './img/player/shieldOn.png');
    //-----------------------------------------------------------------------
    this.load.spritesheet('mainPlayerSprite', './img/player/main_sprite.png', 95, 50);
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

        //---------------------------MainPlayer---------------------------------------

    this.mainPlayer = this.game.add.sprite(-1800, this.game.world.centerY, 'mainPlayerSprite');
    this.mainPlayer.anchor.setTo(0.5);
    this.mainPlayer.HP = config.mainPlayerHP;
    this.game.add.existing(this.mainPlayer);
    this.game.physics.enable(this.mainPlayer, Phaser.Physics.ARCADE);
    let fly = this.mainPlayer.animations.add('fly');
    this.mainPlayer.animations.play('fly', 10, true);

    this.exhaust1 = this.mainPlayer.addChild(this.game.make.sprite(4, 6, 'exhaust'));
    this.exhaust1.anchor.setTo(0.5);
    this.exhaust1.scale.setTo(0.2, 0.2);
    this.exhaust1.angle = 90;
    this.exhaust2 = this.mainPlayer.addChild(this.game.make.sprite(4, 37, 'exhaust'));
    this.exhaust2.anchor.setTo(0.5);
    this.exhaust2.scale.setTo(0.2, 0.2);
    this.exhaust2.angle = 90;
    this.exhaust1.animations.add('exh');
    this.exhaust2.animations.add('exh');
    this.exhaust1.animations.play('exh', 5, true);
    this.exhaust2.animations.play('exh', 5, true);


    // ----------------------MainPlayerBullets-----------------------------------------
    this.weapon1 = weaponOn.apply(this);
    this.weapon2 = threeWayWeapon.apply(this);
    this.weapon3 = spreadWeapon.apply(this);
    config.weapons.push(this.weapon1);
    config.weapons.push(this.weapon2);
    config.weapons.push(this.weapon3);
    this.currentWeapon = this.weapon1;
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
      if(currentGameState.mainPlayerKilled){
        gameOverloader.apply(this);
      }
      // ---------------------controls----------------------------------------
      keysOn.apply(this);
      //-------------------------------------------------------------------------
      mouseOn.apply(this);
    }
  }
}
