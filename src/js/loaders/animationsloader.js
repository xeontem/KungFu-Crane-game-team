import Phaser from 'phaser-ce';
import currentGameState from '../currentGameState';
import BackgroundMainGame from '../objects/backgroundFirstlevel';
import { weaponOn, spreadWeapon, threeWayWeapon } from '../objects/weapon';
import config from '../config';
import conf from '../levelsConfig';

export function preloadAnimation() {
    this.load.image('background', conf[currentGameState.level].bg);
    //------------------------------------bullets---------------------------
    this.load.image('bullet', './img/player/shot.png');
    this.load.image('bossbullet', './img/player/bossShot.png');
    this.load.image('missile', './img/player/shot1.png');
    this.load.spritesheet('missile2', './img/player/missile.png', 40, 18);
    //----------------------enemies-----------------------------------------
    this.load.image('enemy_1', './img/enemy/enemy_1.png');
    this.load.image('enemy_2', './img/enemy/enemy_2.png');
    this.load.image('enemy_3', './img/enemy/enemy_3.png');
    this.load.image('boss', conf[currentGameState.level].boss);
    this.load.image('bossRed', conf[currentGameState.level].bossRed);
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
    //-------------------------------mainPlayer--------------------------------
    this.load.spritesheet('mainPlayer', './img/player/mainPlayer.png', 95, 58);
    this.load.spritesheet('mainPlayerGreen', './img/player/mainPlayerGreen.png', 95, 58);
    this.load.spritesheet('mainPlayerRed', './img/player/mainPlayerRed.png', 95, 58);
    this.load.spritesheet('exhaust', './img/player/exhaust.png', 23, 84);
    this.load.spritesheet('smoke', './img/player/smoke.png', 64, 64);
    this.load.spritesheet('bang', './img/player/explode.png', 128, 128);
}

export function createAnimation() {
    this.background = new BackgroundMainGame({
      game: this,
      x: 0,
      y: 0,
      width: 1024,
      height: 512,
      asset: 'background',
    });
    this.background.scale.setTo(config.gameWidth / this.background.width, config.gameHeight / this.background.height);
    this.game.add.existing(this.background);
    //---------------------------particles----------------------------------------
    this.emitter = game.add.emitter(game.world.centerX, -config.gameWidth, 600);

    this.emitter.width = game.world.width;
    this.emitter.height = game.world.height;
    this.emitter.angle = 90; // uncomment to set an angle for the stars.

    this.emitter.makeParticles('stars');

    this.emitter.minParticleScale = 0.1// + config.gameWidth/1024 - 1;
    this.emitter.maxParticleScale = 0.5// + config.gameWidth/1024 - 1;

    this.emitter.setYSpeed(300, 500);
    this.emitter.setXSpeed(-5, 5);

    this.emitter.minRotation = 0;
    this.emitter.maxRotation = 0;

    this.emitter.start(false, 1600, 5, 0);
    //---------------------------MainPlayer---------------------------------------
    this.mainPlayer = this.game.add.sprite(-1800, this.game.world.centerY, 'mainPlayer');
    this.mainPlayer.scale.setTo(config.gameWidth/1300);
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
    this.exhaust1.scale.setTo(0.2);
    this.exhaust1.angle = 90;
    this.exhaust2 = this.mainPlayer.addChild(this.game.make.sprite(-51.5, 12, 'exhaust'));
    this.exhaust2.anchor.setTo(0.5);
    this.exhaust2.scale.setTo(0.2);
    this.exhaust2.angle = 90;
    this.exhaust1.animations.add('exh');
    this.exhaust2.animations.add('exh');
    this.exhaust1.animations.play('exh', 25, true);
    this.exhaust2.animations.play('exh', 25, true);
    this.smoke1 = this.game.make.sprite(-25, -20, 'smoke');
    this.smoke2 = this.game.make.sprite(-25, 20, 'smoke');
    this.smoke1.anchor.setTo(0.5);
    this.smoke2.anchor.setTo(0.5);
    this.smoke1.scale.setTo(0.5);
    this.smoke2.scale.setTo(0.5);
    this.smoke1.visible = false;
    this.smoke2.visible = false;
    this.smoke1.animations.add('smoking1');
    this.smoke2.animations.add('smoking2');
    this.mainPlayer.addChild(this.smoke1);
    this.mainPlayer.addChild(this.smoke2);

    // ----------------------MainPlayerBullets-----------------------------------------
    this.weapon1 = weaponOn.apply(this);
    this.weapon2 = spreadWeapon.apply(this);
    this.weapon3 = threeWayWeapon.apply(this);
    config.weapons.push(this.weapon1);
    config.weapons.push(this.weapon2);
    config.weapons.push(this.weapon3);
}

export function explode() {
    this.bang = this.game.add.sprite(this.mainPlayer.x, this.mainPlayer.y, 'bang');
    this.bang.anchor.setTo(0.5);
    this.bang.animations.add('explode');
    this.bang.animations.play('explode', 30, false, true);
}
export function explodeEnemy(coordX, coordY) {
    this.bang = this.game.add.sprite(coordX, coordY, 'bang');
    this.bang.anchor.setTo(0.5);
    this.bang.animations.add('explode');
    this.bang.animations.play('explode', 30, false, true);
}

export function smoke1Player() {
    this.smoke1.visible = true;
    this.smoke1.anchor.setTo(0.5);
    this.smoke1.animations.play('smoking1', 30, true);
}

export function doNotSmoke1Player() {
    this.smoke1.visible = false;
}

export function smoke2Player() {
    this.smoke2.visible = true;
    this.smoke2.anchor.setTo(0.5);
    this.smoke2.animations.play('smoking2', 30, true);
}

export function doNotSmoke2Player() {
    this.smoke2.visible = false;
}

export function paintInRed() {
    this.paintTimer = this.time.now;
    this.mainPlayer.key = 'mainPlayerRed';
    this.mainPlayer.loadTexture('mainPlayerRed');
}

export function paintInYellow() {
    if (this.paintTimer && this.time.now > this.paintTimer + 100) {
        this.paintTimer = null;
        this.mainPlayer.key = 'mainPlayer';
        this.mainPlayer.loadTexture('mainPlayer');
    }
}

export function paintInGreen() {
    this.paintTimer = this.time.now;
    this.mainPlayer.key = 'mainPlayerGreen';
    this.mainPlayer.loadTexture('mainPlayerGreen');
}

export function paintBossInRed() {
  this.paintBossTimer = this.time.now;
  this.boss.key = 'bossRed';
  this.boss.loadTexture('bossRed');
}

export function normalPaintBoss() {
    if (this.paintBossTimer && this.time.now > this.paintBossTimer + 100) {
        this.paintBossTimer = null;
        this.boss.key = 'boss';
        this.boss.loadTexture('boss');
    }
}
