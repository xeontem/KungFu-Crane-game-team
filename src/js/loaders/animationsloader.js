import Phaser from 'phaser';
import { gameState } from '../currentGameState';
import BackgroundMainGame from '../objects/backgroundFirstlevel';
import { weaponOn, spreadWeapon, threeWayWeapon } from '../objects/weapon';
import levelsConfig from '../levelsConfig';

export function preloadAnimation() {
  this.load.image('level_background', levelsConfig[gameState.level].bg);

  // ------------------------------------bullets---------------------------
  this.load.image('bullet', './img/player/shot.png');
  this.load.image('bossbullet', './img/player/bossShot.png');
  this.load.image('missile', './img/player/shot1.png');
  this.load.spritesheet('missile2', './img/player/missile.png', { frameWidth: 40, frameHeight: 18 });

  // ----------------------enemies-----------------------------------------
  this.load.image('enemy_1', './img/enemy/enemy_1.png');
  this.load.image('enemy_2', './img/enemy/enemy_2.png');
  this.load.image('enemy_3', './img/enemy/enemy_3.png');
  this.load.image('boss', levelsConfig[gameState.level].boss);
  this.load.image('bossRed', levelsConfig[gameState.level].bossRed);

  // -----------------------particle----------------------------------------
  this.load.spritesheet('stars', './img/states/rain.png', { frameWidth: 17, frameHeight: 17 });

  // -----------------------benefits image----------------------------------
  this.load.image('health', './img/player/health.png');
  this.load.image('score', './img/player/score.png');
  this.load.image('shield', './img/player/shield.png');
  this.load.image('shieldOn', './img/player/shieldOn.png');
  this.load.image('burst', './img/player/burst.png');
  this.load.image('ammo', './img/player/ammo.png');

  // -------------------------------mainPlayer--------------------------------
  this.load.spritesheet('mainPlayer', './img/player/mainPlayer.png', { frameWidth: 95, frameHeight: 58 });
  this.load.spritesheet('mainPlayerGreen', './img/player/mainPlayerGreen.png', { frameWidth: 95, frameHeight: 58 });
  this.load.spritesheet('mainPlayerRed', './img/player/mainPlayerRed.png', { frameWidth: 95, frameHeight: 58 });
  this.load.spritesheet('exhaust', './img/player/exhaust.png', { frameWidth: 23, frameHeight: 84 });
  this.load.spritesheet('smoke', './img/player/smoke.png', { frameWidth: 64, frameHeight: 64 });
  this.load.spritesheet('bang', './img/player/explode.png', { frameWidth: 128, frameHeight: 128 });
}

export function createAnimation() {
  this.background = this.add.image(0, 0, 'level_background').setOrigin(0.15, 0).setScale(1.5);

  // ---------------------------particles----------------------------------------
  // var particles = this.add.particles('stars');

  // particles.createEmitter({
  //     frame: 'blue',
  //     x: 64,
  //     y: { min: 100, max: 500 },
  //     lifespan: 2000,
  //     speedX: { min: 200, max: 400 },
  //     scale: { start: 0.4, end: 0 },
  //     quantity: 4,
  //     blendMode: 'ADD'
  // });
  // this.emitter = this.add.emitter(this.scale.width / 2, -gameState.gameWidth, 600);

  // this.emitter.width = gameState.gameWidth;
  // this.emitter.height = gameState.gameHeight;
  // this.emitter.angle = 90;

  // this.emitter.makeParticles('stars');

  // this.emitter.minParticleScale = 0.1;// + gameState.gameWidth/1024 - 1;
  // this.emitter.maxParticleScale = 0.5;// + gameState.gameWidth/1024 - 1;

  // this.emitter.setYSpeed(300, 500);
  // this.emitter.setXSpeed(-5, 5);

  // this.emitter.minRotation = 0;
  // this.emitter.maxRotation = 0;

  // this.emitter.start(false, 1600, 5, 0);

  // ---------------------------MainPlayer---------------------------------------
  this.mainPlayerContainer = this.add.container(100, this.scale.height / 2);
  this.mainPlayer = this.physics.add.sprite(0, 0, 'mainPlayer');
  this.mainPlayer.setCollideWorldBounds(true);

  [
    {
      key: 'move_up_start',
      frames: { start: 1, end: 9 }
    },
    {
      key: 'move_up_end',
      frames: { start: 9, end: 1 }
    },
    {
      key: 'move_down_start',
      frames: { start: 10, end: 18 }
    },
    {
      key: 'move_down_end',
      frames: { start: 18, end: 10 }
    },
  ].forEach(animData => {
    this.anims.create({
      key: animData.key,
      frames: this.anims.generateFrameNumbers('mainPlayer', animData.frames),
      frameRate: 10,
      repeat: 0,
    });
  });

  // this.exhaust1 = this.add.sprite(150, -15, 'exhaust');
  // this.exhaust1.setScale(0.3);
  // this.exhaust1.setAngle(90);

  // this.exhaust2 = this.add.sprite(150, 15, 'exhaust');
  // this.exhaust2.setScale(0.3);
  // this.exhaust2.setAngle(90);

  // this.mainPlayerContainer.add(this.exhaust1);
  // this.mainPlayerContainer.add(this.exhaust2);
  // console.log(this.exhaust1);
  // this.exhaust1.setOrigin(0.5);
  // this.exhaust2 = this.mainPlayer.addChild(this.game.make.sprite(-51.5, 12, 'exhaust'));
  // this.exhaust2.setOrigin(0.5);
  // this.exhaust2.setScale(0.2);
  // this.exhaust2.angle = 90;
  // this.exhaust1.animations.add('exh');
  // this.exhaust2.animations.add('exh');
  // this.exhaust1.animations.play('exh', 25, true);
  // this.exhaust2.animations.play('exh', 25, true);
  // this.smoke1 = this.game.make.sprite(-25, -20, 'smoke');
  // this.smoke2 = this.game.make.sprite(-25, 20, 'smoke');
  // this.smoke1.setOrigin(0.5);
  // this.smoke2.setOrigin(0.5);
  // this.smoke1.setScale(0.5);
  // this.smoke2.setScale(0.5);
  // this.smoke1.visible = false;
  // this.smoke2.visible = false;
  // this.smoke1.animations.add('smoking1');
  // this.smoke2.animations.add('smoking2');
  // this.mainPlayer.addChild(this.smoke1);
  // this.mainPlayer.addChild(this.smoke2);

  // ----------------------MainPlayerBullets-----------------------------------------
  // this.weapon1 = weaponOn.apply(this);
  // this.weapon2 = spreadWeapon.apply(this);
  // this.weapon3 = threeWayWeapon.apply(this);
}

export function explode() {
  this.bang = this.add.sprite(this.mainPlayer.x, this.mainPlayer.y, 'bang');
  this.bang.setOrigin(0.5);
  this.bang.animations.add('explode');
  this.bang.animations.play('explode', 30, false, true);
}
export function explodeEnemy(coordX, coordY) {
  this.bang = this.add.sprite(coordX, coordY, 'bang');
  this.bang.setOrigin(0.5);
  this.bang.animations.add('explode');
  this.bang.animations.play('explode', 30, false, true);
}

export function smoke1Player() {
  this.smoke1.visible = true;
  this.smoke1.setOrigin(0.5);
  this.smoke1.animations.play('smoking1', 30, true);
}

export function doNotSmoke1Player() {
  this.smoke1.visible = false;
}

export function smoke2Player() {
  this.smoke2.visible = true;
  this.smoke2.setOrigin(0.5);
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
