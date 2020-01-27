/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./~/phaser-ce/build/phaser.js ***!
  \*************************************/
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'D:\\code\\KungFu-Crane-game-team\\node_modules\\phaser-ce\\build\\phaser.js'");

/***/ }),
/* 1 */
/* no static exports found */
/* all exports used */
/*!**************************!*\
  !*** ./src/js/config.js ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  gameWidth: 1024,
  gameHeight: 512,
  enemiesSpeed: 7,
  mainPlayerSpeed: 350,
  mainPlayerHP: 3,
  firstBossHP: 100,
  shieldDuration: 5000,
  ammoDuration: 5000,
  onOff: false,
  weapons: [],
  currentWeapon: 0,
  reset: function reset() {
    this.enemiesSpeed = 7, this.mainPlayerSpeed = 350, this.mainPlayerHP = 3, this.firstBossHP = 100, this.shieldDuration = 5000, this.ammoDuration = 5000, this.onOff = false, this.weapons = [], this.currentWeapon = 0;
  }
};

/***/ }),
/* 2 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./src/js/currentGameState.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  score: 0,
  levelscore: 0,
  limit: 10000,
  bosstime: false,
  bosskilled: false,
  mainPlayerKilled: false,
  mainPlayerWeapon: 1,
  level: 0,
  name: 'player',
  reset: function reset() {
    this.score = 0, this.levelscore = 0, this.limit = 10000, this.bosstime = false, this.bosskilled = false, this.mainPlayerKilled = false, this.mainPlayerWeapon = 1, this.level = 0, this.name = 'player';
  }
};

/***/ }),
/* 3 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/webfontloader/webfontloader.js ***!
  \******************************************/
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'D:\\code\\KungFu-Crane-game-team\\node_modules\\webfontloader\\webfontloader.js'");

/***/ }),
/* 4 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'D:\\code\\KungFu-Crane-game-team\\node_modules\\webpack\\buildin\\global.js'");

/***/ }),
/* 5 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./src/js/sound/explosures.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shot = shot;
exports.enemyExplode = enemyExplode;
exports.bossExplode = bossExplode;
exports.getCollectable = getCollectable;

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shot() {
  var music = this.game.add.audio('fire', 0.09, false, true);
  music.allowMultiple = false;
  music.play();
}

function enemyExplode() {
  var music = this.game.add.audio('explode', 0.1, false, true);
  music.allowMultiple = false;
  music.play();
}

function bossExplode() {
  var music = this.game.add.audio('explode', 1, false, true);
  music.allowMultiple = false;
  music.play();
}

function getCollectable() {
  var music = this.game.add.audio('benefit', 1, false, true);
  music.allowMultiple = false;
  music.play();
}

/***/ }),
/* 6 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./src/js/loaders/animationsloader.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preloadAnimation = preloadAnimation;
exports.createAnimation = createAnimation;
exports.explode = explode;
exports.explodeEnemy = explodeEnemy;
exports.smoke1Player = smoke1Player;
exports.doNotSmoke1Player = doNotSmoke1Player;
exports.smoke2Player = smoke2Player;
exports.doNotSmoke2Player = doNotSmoke2Player;
exports.paintInRed = paintInRed;
exports.paintInYellow = paintInYellow;
exports.paintInGreen = paintInGreen;
exports.paintBossInRed = paintBossInRed;
exports.normalPaintBoss = normalPaintBoss;

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _currentGameState = __webpack_require__(/*! ../currentGameState */ 2);

var _currentGameState2 = _interopRequireDefault(_currentGameState);

var _backgroundFirstlevel = __webpack_require__(/*! ../objects/backgroundFirstlevel */ 23);

var _backgroundFirstlevel2 = _interopRequireDefault(_backgroundFirstlevel);

var _weapon = __webpack_require__(/*! ../objects/weapon */ 28);

var _config = __webpack_require__(/*! ../config */ 1);

var _config2 = _interopRequireDefault(_config);

var _levelsConfig = __webpack_require__(/*! ../levelsConfig */ 9);

var _levelsConfig2 = _interopRequireDefault(_levelsConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function preloadAnimation() {
  this.load.image('background', _levelsConfig2.default[_currentGameState2.default.level].bg);
  //------------------------------------bullets---------------------------
  this.load.image('bullet', './img/player/shot.png');
  this.load.image('bossbullet', './img/player/bossShot.png');
  this.load.image('missile', './img/player/shot1.png');
  this.load.spritesheet('missile2', './img/player/missile.png', 40, 18);
  //----------------------enemies-----------------------------------------
  this.load.image('enemy_1', './img/enemy/enemy_1.png');
  this.load.image('enemy_2', './img/enemy/enemy_2.png');
  this.load.image('enemy_3', './img/enemy/enemy_3.png');
  this.load.image('boss', _levelsConfig2.default[_currentGameState2.default.level].boss);
  this.load.image('bossRed', _levelsConfig2.default[_currentGameState2.default.level].bossRed);
  //-----------------------particle----------------------------------------
  this.load.spritesheet('stars', './img/states/rain.png', 17, 17);
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

function createAnimation() {
  this.background = new _backgroundFirstlevel2.default({
    game: game,
    x: 0,
    y: 0,
    width: 1024,
    height: 512,
    asset: 'background'
  });
  this.background.scale.setTo(_config2.default.gameWidth / this.background.width, _config2.default.gameHeight / this.background.height);
  this.game.add.existing(this.background);
  //---------------------------particles----------------------------------------
  this.emitter = game.add.emitter(game.world.centerX, -_config2.default.gameWidth, 600);

  this.emitter.width = game.world.width;
  this.emitter.height = game.world.height;
  this.emitter.angle = 90; // uncomment to set an angle for the stars.

  this.emitter.makeParticles('stars');

  this.emitter.minParticleScale = 0.1; // + config.gameWidth/1024 - 1;
  this.emitter.maxParticleScale = 0.5; // + config.gameWidth/1024 - 1;

  this.emitter.setYSpeed(300, 500);
  this.emitter.setXSpeed(-5, 5);

  this.emitter.minRotation = 0;
  this.emitter.maxRotation = 0;

  this.emitter.start(false, 1600, 5, 0);
  //---------------------------MainPlayer---------------------------------------
  this.mainPlayer = this.game.add.sprite(-1800, this.game.world.centerY, 'mainPlayer');
  this.mainPlayer.scale.setTo(_config2.default.gameWidth / 1300);
  this.mainPlayer.anchor.setTo(0.5);
  this.game.add.existing(this.mainPlayer);
  this.game.physics.enable(this.mainPlayer, _phaserCe2.default.Physics.ARCADE);
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
  this.weapon1 = _weapon.weaponOn.apply(this);
  this.weapon2 = _weapon.spreadWeapon.apply(this);
  this.weapon3 = _weapon.threeWayWeapon.apply(this);
  _config2.default.weapons.push(this.weapon1);
  _config2.default.weapons.push(this.weapon2);
  _config2.default.weapons.push(this.weapon3);
}

function explode() {
  this.bang = this.game.add.sprite(this.mainPlayer.x, this.mainPlayer.y, 'bang');
  this.bang.anchor.setTo(0.5);
  this.bang.animations.add('explode');
  this.bang.animations.play('explode', 30, false, true);
}
function explodeEnemy(coordX, coordY) {
  this.bang = this.game.add.sprite(coordX, coordY, 'bang');
  this.bang.anchor.setTo(0.5);
  this.bang.animations.add('explode');
  this.bang.animations.play('explode', 30, false, true);
}

function smoke1Player() {
  this.smoke1.visible = true;
  this.smoke1.anchor.setTo(0.5);
  this.smoke1.animations.play('smoking1', 30, true);
}

function doNotSmoke1Player() {
  this.smoke1.visible = false;
}

function smoke2Player() {
  this.smoke2.visible = true;
  this.smoke2.anchor.setTo(0.5);
  this.smoke2.animations.play('smoking2', 30, true);
}

function doNotSmoke2Player() {
  this.smoke2.visible = false;
}

function paintInRed() {
  this.paintTimer = this.time.now;
  this.mainPlayer.key = 'mainPlayerRed';
  this.mainPlayer.loadTexture('mainPlayerRed');
}

function paintInYellow() {
  if (this.paintTimer && this.time.now > this.paintTimer + 100) {
    this.paintTimer = null;
    this.mainPlayer.key = 'mainPlayer';
    this.mainPlayer.loadTexture('mainPlayer');
  }
}

function paintInGreen() {
  this.paintTimer = this.time.now;
  this.mainPlayer.key = 'mainPlayerGreen';
  this.mainPlayer.loadTexture('mainPlayerGreen');
}

function paintBossInRed() {
  this.paintBossTimer = this.time.now;
  this.boss.key = 'bossRed';
  this.boss.loadTexture('bossRed');
}

function normalPaintBoss() {
  if (this.paintBossTimer && this.time.now > this.paintBossTimer + 100) {
    this.paintBossTimer = null;
    this.boss.key = 'boss';
    this.boss.loadTexture('boss');
  }
}

/***/ }),
/* 7 */
/* no static exports found */
/* all exports used */
/*!*********************************!*\
  !*** ./src/js/sound/bgmusic.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadMusic = loadMusic;
exports.applyMusic = applyMusic;
// import Phaser from 'phaser-ce';

function loadMusic() {
  this.game.load.audio('main2', './sounds/mainMenu.ogg');
  this.game.load.audio('level', './sounds/levels.ogg');
  this.game.load.audio('fire', './sounds/fire.ogg');
  this.game.load.audio('explode', './sounds/explode.ogg');
  this.game.load.audio('explode2', './sounds/explode2.ogg');
  this.game.load.audio('benefit', './sounds/benefit.ogg');
}

function applyMusic() {
  if (!this.mainMenuMusic) {
    this.mainMenuMusic = this.game.add.audio('main2', 1, true, true);
  }
  if (!this.levelMusic) {
    this.levelMusic = this.game.add.audio('level', 0.3, true, true);
  }

  switch (this.game.state.current) {
    case 'mainMenu':
      if (!this.mainMenuMusic.isPlaying) {
        this.mainMenuMusic.play();
      }
      break;

    case 'level':
      if (!this.levelMusic.isPlaying) {
        this.levelMusic.play();
      }
      break;
  }
}

/***/ }),
/* 8 */,
/* 9 */
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** ./src/js/levelsConfig.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  bg: './img/states/bgLevel1.jpg',
  levelName: 'Level 1: Throw The Universe',
  boss: './img/bosses/boss_1.png',
  bossRed: './img/bosses/boss_1Red.png'
}, {
  bg: './img/states/bgLevel2.jpg',
  levelName: 'Level 2: Over The Galaxy',
  boss: './img/bosses/boss_2.png',
  bossRed: './img/bosses/boss_2Red.png'
}, {
  bg: './img/states/bgLevel3.jpg',
  levelName: 'Level 3: Nebula',
  boss: './img/bosses/boss_3.png',
  bossRed: './img/bosses/boss_3Red.png'
}, {
  bg: './img/states/bgLevel4.jpg',
  levelName: 'Level 4: The MilkyWay',
  boss: './img/bosses/boss_4.png',
  bossRed: './img/bosses/boss_4Red.png'
}, {
  bg: './img/states/bgLevel5.jpg',
  levelName: 'Level 5: Deep Space',
  boss: './img/bosses/boss_5.png',
  bossRed: './img/bosses/boss_5Red.png'
}];

/***/ }),
/* 10 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./src/js/loaders/gameOverloader.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  this.winText.text = 'Game Over';

  if (this.time.now > this.countdown + 4000) {
    var nowScore = (0, _storageloader2.default)();

    var flag = nowScore.some(function (el) {
      return _currentGameState2.default.score > el.value;
    });

    if (flag) {
      (0, _storageloader2.default)(_currentGameState2.default.score, _currentGameState2.default.name);
      this.levelMusic.pause();
      this.state.start('score');
    } else {
      this.levelMusic.pause();
      this.state.start('mainMenu');
    }
  }
};

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _currentGameState = __webpack_require__(/*! ../currentGameState */ 2);

var _currentGameState2 = _interopRequireDefault(_currentGameState);

var _storageloader = __webpack_require__(/*! ./storageloader */ 11);

var _storageloader2 = _interopRequireDefault(_storageloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 11 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./src/js/loaders/storageloader.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _currentGameState = __webpack_require__(/*! ../currentGameState */ 2);

var _currentGameState2 = _interopRequireDefault(_currentGameState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (score, name) {
  var compareScore = function compareScore(playerA, playerB) {
    return playerB.value - playerA.value;
  };

  if (!window.localStorage.getItem('score')) {
    window.localStorage.setItem('score', JSON.stringify([{ name: 'player', value: 100, color: '#fff' }]));
  }

  var scores = JSON.parse(window.localStorage.getItem('score'));
  scores.forEach(function (el) {
    return el.color = '#fff';
  });

  if (score && name) {
    scores.unshift({ name: name, value: score, color: '#ff0' });
    scores.sort(compareScore);
    if (scores.length === 6) {
      scores.pop();
    }
    window.localStorage.setItem('score', JSON.stringify(scores));
  }

  return scores;
};

/***/ }),
/* 12 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./src/js/objects/backgroundMainMenu.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$TileSprite) {
  _inherits(_class, _Phaser$TileSprite);

  function _class(_ref) {
    var game = _ref.game,
        x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height,
        asset = _ref.asset;

    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, x, y, width, height, asset));
  }

  return _class;
}(_phaserCe2.default.TileSprite);

exports.default = _class;

/***/ }),
/* 13 */
/* no static exports found */
/* all exports used */
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! pixi */ 14);

__webpack_require__(/*! p2 */ 16);

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _intro = __webpack_require__(/*! ./states/intro */ 30);

var _intro2 = _interopRequireDefault(_intro);

var _mainMenu = __webpack_require__(/*! ./states/mainMenu */ 32);

var _mainMenu2 = _interopRequireDefault(_mainMenu);

var _level = __webpack_require__(/*! ./states/level */ 31);

var _level2 = _interopRequireDefault(_level);

var _createName = __webpack_require__(/*! ./states/createName */ 29);

var _createName2 = _interopRequireDefault(_createName);

var _score = __webpack_require__(/*! ./states/score */ 34);

var _score2 = _interopRequireDefault(_score);

var _config = __webpack_require__(/*! ./config */ 1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Phaser$Game) {
    _inherits(Game, _Phaser$Game);

    function Game() {
        _classCallCheck(this, Game);

        _config2.default.gameWidth = document.documentElement.clientWidth;
        _config2.default.gameHeight = document.documentElement.clientHeight;

        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, _config2.default.gameWidth, _config2.default.gameHeight, _phaserCe2.default.CANVAS, 'content', null));

        _this.state.add('intro', _intro2.default, false);
        _this.state.add('mainMenu', _mainMenu2.default, false);
        _this.state.add('level', _level2.default, false);
        _this.state.add('score', _score2.default, false);
        _this.state.add('createName', _createName2.default, false);

        _this.state.start('intro');
        return _this;
    }

    return Game;
}(_phaserCe2.default.Game);

window.game = new Game();

/***/ }),
/* 14 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/phaser-ce/build/custom/pixi.js-exposed ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = global["PIXI"] = __webpack_require__(/*! -!./pixi.js */ 37);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 4)))

/***/ }),
/* 15 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/phaser-ce/build/custom/phaser-split.js-exposed ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = global["Phaser"] = __webpack_require__(/*! -!./phaser-split.js */ 36);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 4)))

/***/ }),
/* 16 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/phaser-ce/build/custom/p2.js-exposed ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = global["p2"] = __webpack_require__(/*! -!./p2.js */ 35);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 4)))

/***/ }),
/* 17 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./src/js/controls/controls.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setKeys = setKeys;
exports.keysOn = keysOn;
exports.mouseOn = mouseOn;

var _phaser = __webpack_require__(/*! phaser */ 15);

var _phaser2 = _interopRequireDefault(_phaser);

var _currentGameState = __webpack_require__(/*! ../currentGameState */ 2);

var _currentGameState2 = _interopRequireDefault(_currentGameState);

var _pauseMenu = __webpack_require__(/*! ../states/pauseMenu */ 33);

var _explosures = __webpack_require__(/*! ../sound/explosures */ 5);

var _config = __webpack_require__(/*! ../config */ 1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setKeys() {
  this.cursors = this.input.keyboard.createCursorKeys();
  this.fireButton = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.SPACEBAR);
  this.changeWeapon = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.SHIFT);
  this.openPauseMenu = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.ESC);
  var canvas = document.getElementsByTagName('canvas');
  canvas[0].addEventListener('click', mouseIn);
}

function keysOn() {
  if (this.cursors.left.isUp) {
    this.exhaust1.scale.setTo(0.2);
    this.exhaust2.scale.setTo(0.2);
    this.exhaust1.y = -15;
    this.exhaust2.y = 16;
  }
  if (this.cursors.right.isUp) {
    this.exhaust1.scale.setTo(0.2);
    this.exhaust2.scale.setTo(0.2);
    this.exhaust1.y = -16;
    this.exhaust2.y = 15;
  }
  if (this.cursors.up.isUp) {
    this.mainPlayer.animations.play('upBack', 30, false);
    if (_config2.default.mainPlayerHP <= 1) {
      this.mainPlayer.frame = 38;
    } else if (_config2.default.mainPlayerHP <= 2) {
      this.mainPlayer.frame = 19;
    } else {
      this.mainPlayer.frame = 0;
    }
  }
  if (this.cursors.down.isUp) {
    this.mainPlayer.animations.play('downBack', 30, false);
    if (_config2.default.mainPlayerHP <= 1) {
      this.mainPlayer.frame = 38;
    } else if (_config2.default.mainPlayerHP <= 2) {
      this.mainPlayer.frame = 19;
    } else {
      this.mainPlayer.frame = 0;
    }
  }
  if (this.cursors.left.isDown) {
    this.mainPlayer.body.velocity.x = -_config2.default.mainPlayerSpeed;
    this.exhaust1.scale.setTo(0.1);
    this.exhaust2.scale.setTo(0.1);
    this.exhaust1.y = -17;
    this.exhaust2.y = 14;
  }
  if (this.cursors.right.isDown) {
    this.mainPlayer.body.velocity.x = _config2.default.mainPlayerSpeed;
    this.exhaust1.scale.setTo(0.3);
    this.exhaust2.scale.setTo(0.3);
    this.exhaust1.y = -17;
    this.exhaust2.y = 15;
  }
  if (this.cursors.up.isDown) {
    this.mainPlayer.body.velocity.y = -_config2.default.mainPlayerSpeed;
    this.mainPlayer.animations.play('up', 30, false);
    if (_config2.default.mainPlayerHP <= 1) {
      this.mainPlayer.frame = 47;
    } else if (_config2.default.mainPlayerHP <= 2) {
      this.mainPlayer.frame = 28;
    } else {
      this.mainPlayer.frame = 9;
    }
  }
  if (this.cursors.down.isDown) {
    this.mainPlayer.body.velocity.y = _config2.default.mainPlayerSpeed;
    this.mainPlayer.animations.play('down', 30, false);
    if (_config2.default.mainPlayerHP <= 1) {
      this.mainPlayer.frame = 56;
    } else if (_config2.default.mainPlayerHP <= 2) {
      this.mainPlayer.frame = 37;
    } else {
      this.mainPlayer.frame = 18;
    }
  }
  if (this.changeWeapon.isDown) {
    if (_config2.default.weapons) {
      if (_config2.default.currentWeapon < _config2.default.weapons.length) {
        this.currentWeapon = _config2.default.weapons[_config2.default.currentWeapon++];
      } else {
        _config2.default.currentWeapon = 0;
        this.currentWeapon = _config2.default.weapons[_config2.default.currentWeapon];
      }
    }
  }
  if (this.fireButton.isDown && !_currentGameState2.default.mainPlayerKilled) {
    if (this.currentWeapon.multiple === false) {
      this.currentWeapon.weapon.fire();
    } else if (this.currentWeapon.multiple === true) {
      this.currentWeapon.weapon.forEach(function (gun) {
        gun.fire();
      });
    }
  }
  this.openPauseMenu.onDown.add(_pauseMenu.invokePauseMenu, this);
}

function mouseOn() {
  if (_config2.default.onOff) {
    this.game.canvas.addEventListener(onpointermove, move(this));
  }
}

var move = function move(that) {
  if (that.game.physics.arcade.distanceToPointer(that.mainPlayer) > 14) {
    that.game.physics.arcade.moveToPointer(that.mainPlayer, _config2.default.mainPlayerSpeed);
  } else {
    that.mainPlayer.body.velocity.setTo(0, 0);
  }
};

function mouseIn() {
  if (_config2.default.onOff === false) {
    _config2.default.onOff = true;
    document.getElementById('game').style.cursor = 'none';
  } else {
    _config2.default.onOff = false;
    document.getElementById('game').style.cursor = 'default';
  }
}

function invokeSound(that) {
  _explosures.fire.apply(that);
}

/***/ }),
/* 18 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./src/js/loaders/bossloader.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  if (this.boss) {
    if (_currentGameState2.default.level == 0) {
      if (!this.bossWeapon11) {
        this.bossWeapon11 = this.game.add.weapon(10, 'bossbullet');
        this.bossWeapon11.bulletSpeed = 600;
        this.bossWeapon11.fireRate = 200;
        this.bossWeapon11.fireAngle = 180;
        this.bossWeapon11.autofire = true;
        this.bossWeapon11.bulletAngleVariance = 20;
        this.bossWeapon11.trackSprite(this.boss, 80, 0, true);
        this.game.physics.enable(this.bossWeapon11, _phaserCe2.default.Physics.ARCADE);
      }
    }
    if (_currentGameState2.default.level == 1 || _currentGameState2.default.level == 2 || _currentGameState2.default.level == 3 || _currentGameState2.default.level == 4) {
      if (!this.bossWeapon21) {
        //----------------------------------first gun------------------------------
        this.bossWeapon21 = this.game.add.weapon(5, 'bossbullet');
        this.bossWeapon21.bulletSpeed = 600;
        this.bossWeapon21.fireRate = 100;
        this.bossWeapon21.fireAngle = 180;
        this.bossWeapon21.autofire = true;
        this.bossWeapon21.trackSprite(this.boss, 80, -40, true);
        this.game.physics.enable(this.bossWeapon21, _phaserCe2.default.Physics.ARCADE);
        //----------------------------------second gun-----------------------------
        this.bossWeapon22 = this.game.add.weapon(5, 'bossbullet');
        this.bossWeapon22.bulletSpeed = 600;
        this.bossWeapon22.fireRate = 100;
        this.bossWeapon22.fireAngle = 180;
        this.bossWeapon22.autofire = true;
        this.bossWeapon22.trackSprite(this.boss, 80, 40, true);
        this.game.physics.enable(this.bossWeapon22, _phaserCe2.default.Physics.ARCADE);
      }
    }
  }
  if (!this.boss && _currentGameState2.default.bosstime) {
    this.boss = new _boss2.default({
      game: game,
      x: _config2.default.gameWidth + 200,
      y: _config2.default.gameHeight - 200,
      asset: 'boss'
    });
    this.game.add.existing(this.boss);
    var tween = this.add.tween(this.boss).to({ y: 200 }, 2000, _phaserCe2.default.Easing.Linear.None, true, 0, 100, true);
  }
  if (this.boss) {
    this.boss.HPinfo.text = 'BOSS HP: ' + this.boss.HP;
    this.boss.rotation = game.physics.arcade.angleBetween(this.boss, this.mainPlayer);
  }
};

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _currentGameState = __webpack_require__(/*! ../currentGameState */ 2);

var _currentGameState2 = _interopRequireDefault(_currentGameState);

var _boss = __webpack_require__(/*! ../objects/boss */ 26);

var _boss2 = _interopRequireDefault(_boss);

var _config = __webpack_require__(/*! ../config */ 1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 19 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./src/js/loaders/collisionloader.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  //------------------------------------weaponsStandart-------------------------------------------------------------------
  this.physics.arcade.overlap(this.weapon.bullets, this.enemies, killEnemies, null, this);
  this.physics.arcade.overlap(this.weapon.bullets, this.boss, killBoss, null, this);
  //------------------------------------weaponsTriple----------------------------------------------------------
  this.physics.arcade.overlap(this.gun1.bullets, this.enemies, killEnemies, null, this);
  this.physics.arcade.overlap(this.gun1.bullets, this.boss, killBoss, null, this);
  this.physics.arcade.overlap(this.gun2.bullets, this.enemies, killEnemies, null, this);
  this.physics.arcade.overlap(this.gun2.bullets, this.boss, killBoss, null, this);
  this.physics.arcade.overlap(this.gun3.bullets, this.enemies, killEnemies, null, this);
  this.physics.arcade.overlap(this.gun3.bullets, this.boss, killBoss, null, this);
  //----------------------------------weaponsSpread------------------------------------------------------------
  this.physics.arcade.overlap(this.spreadWeapon.bullets, this.enemies, killEnemies, null, this);
  this.physics.arcade.overlap(this.spreadWeapon.bullets, this.boss, killBoss, null, this);
  //----------------------------------Main Player body collisions-------------------------------------------------
  this.physics.arcade.overlap(this.mainPlayer, this.enemies, overlapEnemies, null, this);
  if (this.boss) {
    this.physics.arcade.overlap(this.mainPlayer, this.boss, overlapBoss, null, this);
  }
  //-------------------------------------------first boss weapon-------------------------------------------------
  if (this.bossWeapon11) {
    this.physics.arcade.overlap(this.bossWeapon11.bullets, this.mainPlayer, killPlayer, null, this);
  }
  //------------------------------------------second boss weapon-------------------------------------------------
  if (this.bossWeapon21) {
    this.physics.arcade.overlap(this.bossWeapon21.bullets, this.mainPlayer, killPlayer, null, this);
  }
  if (this.bossWeapon22) {
    this.physics.arcade.overlap(this.bossWeapon22.bullets, this.mainPlayer, killPlayer, null, this);
  }
  //-------------------------------Benefits Collisions----------------------------------------------------------
  if (this.benefitHealth) {
    this.physics.arcade.overlap(this.mainPlayer, this.benefitHealth, this.benefitHealth.getHealth, null, this);
    if (this.benefitHealth && this.benefitHealth.x < 0) this.benefitHealth = null;
  }

  if (this.benefitScore) {
    this.physics.arcade.overlap(this.mainPlayer, this.benefitScore, this.benefitScore.getScore, null, this);
    if (this.benefitScore && this.benefitScore.x < 0) {
      this.benefitScore = null;
    }
  }
  if (this.benefitShield) {
    this.physics.arcade.overlap(this.mainPlayer, this.benefitShield, this.benefitShield.getShield, null, this);
    if (this.benefitShield && this.benefitShield.x < 0) {
      this.benefitShield = null;
    }
  }
  if (this.benefitBurst) {
    this.physics.arcade.overlap(this.mainPlayer, this.benefitBurst, this.benefitBurst.getBurst, null, this);
    if (this.benefitBurst && this.benefitBurst.x < 0) {
      this.benefitBurst = null;
    }
  }
  if (this.benefitAmmo) {
    this.physics.arcade.overlap(this.mainPlayer, this.benefitAmmo, this.benefitAmmo.getAmmo, null, this);
    if (this.benefitAmmo && this.benefitAmmo.x < 0) {
      this.benefitAmmo = null;
    }
  }
  if (this.ammoCountdown) {
    if (this.time.now > this.ammoCountdown + _config2.default.ammoDuration) {
      _currentGameState2.default.mainPlayerWeapon = 1;
      this.ammoCountdown = null;
    }
  }

  //---------------------------------------------shieldOn---------------------------------------------------------
  if (this.mainPlayerShield) {
    this.mainPlayerShield.x = this.mainPlayer.x;
    this.mainPlayerShield.y = this.mainPlayer.y;
    this.physics.arcade.overlap(this.mainPlayerShield, this.enemies, killEnemies, null, this);
    if (this.bossWeapon11) {
      this.physics.arcade.overlap(this.bossWeapon11.bullets, this.mainPlayerShield, killPlayer, null, this);
    }
    if (this.bossWeapon21) {
      this.physics.arcade.overlap(this.bossWeapon21.bullets, this.mainPlayerShield, killPlayer, null, this);
    }
    if (this.bossWeapon22) {
      this.physics.arcade.overlap(this.bossWeapon22.bullets, this.mainPlayerShield, killPlayer, null, this);
    }
    if (this.time.now > this.mainPlayerShield.countdown + _config2.default.shieldDuration || _currentGameState2.default.bosskilled) {
      this.mainPlayerShield.kill();
      this.mainPlayerShield = null;
    }
  }
};

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _currentGameState = __webpack_require__(/*! ../currentGameState */ 2);

var _currentGameState2 = _interopRequireDefault(_currentGameState);

var _explosures = __webpack_require__(/*! ../sound/explosures */ 5);

var _benefits = __webpack_require__(/*! ../objects/benefits */ 25);

var _animationsloader = __webpack_require__(/*! ../loaders/animationsloader */ 6);

var _config = __webpack_require__(/*! ../config */ 1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function randBenefit() {
  return game.rnd.integerInRange(1, 5);
}

function invokeSound(that, target) {
  if (target == 'enemy') {
    _explosures.enemyExplode.apply(that);
  } else if (target == 'boss') {
    _explosures.bossExplode.apply(that);
  }
}

function killEnemies(bullet, enemy) {
  var enemX = enemy.body.center.x;
  var enemY = enemy.body.center.y;
  enemy.kill();
  invokeSound(this, 'enemy');
  _animationsloader.explodeEnemy.call(this, enemX, enemY);

  if (bullet != this.mainPlayerShield) {
    bullet.kill();
  }

  _currentGameState2.default.score += 100;
  _currentGameState2.default.levelscore += 100;

  if (_currentGameState2.default.levelscore > _currentGameState2.default.limit) {
    _currentGameState2.default.bosstime = true;
  }

  //------------------------benefit health----------------------------
  if (!this.benefitHealth && !this.benefitScore && !this.benefitShield && !this.benefitBurst && !this.benefitAmmo && randBenefit() == 1) {
    this.benefitHealth = new _benefits.Benefit({
      game: game,
      x: enemX,
      y: enemY,
      asset: 'health'
    });
    this.game.add.existing(this.benefitHealth);
  }
  //------------------------benefit score----------------------------
  if (!this.benefitHealth && !this.benefitScore && !this.benefitShield && !this.benefitBurst && !this.benefitAmmo && randBenefit() == 2) {
    this.benefitScore = new _benefits.Benefit({
      game: game,
      x: enemX,
      y: enemY,
      asset: 'score'
    });
    this.game.add.existing(this.benefitScore);
  }
  //------------------------benefit shield----------------------------
  if (!this.benefitHealth && !this.benefitScore && !this.benefitShield && !this.mainPlayerShield && !this.benefitBurst && !this.benefitAmmo && randBenefit() == 3) {
    this.benefitShield = new _benefits.Benefit({
      game: game,
      x: enemX,
      y: enemY,
      asset: 'shield'
    });
    this.game.add.existing(this.benefitShield);
  }
  if (!this.benefitHealth && !this.benefitScore && !this.benefitShield && !this.mainPlayerShield && !this.benefitBurst && !this.ammoCountdown && randBenefit() == 4) {
    this.benefitBurst = new _benefits.Benefit({
      game: game,
      x: enemX,
      y: enemY,
      asset: 'burst'
    });
    this.game.add.existing(this.benefitBurst);
  }
  //------------------------benefit ammo----------------------------
  if (!this.benefitHealth && !this.benefitScore && !this.benefitShield && !this.benefitAmmo && !this.benefitBurst && !this.ammoCountdown && randBenefit() == 5) {
    this.benefitAmmo = new _benefits.Benefit({
      game: game,
      x: enemX,
      y: enemY,
      asset: 'ammo'
    });
    this.game.add.existing(this.benefitAmmo);
  }
}

function killBoss(boss, bullet) {
  bullet.kill();

  if (boss.HP) {
    boss.HP--;
  }

  _animationsloader.paintBossInRed.apply(this);

  if (boss.HP == 0) {
    boss.kill();
    boss.HPinfo.text = 'BOSS HP: 0';
    invokeSound(this, 'boss');
    this.countdown = this.time.now;
    _currentGameState2.default.bosskilled = true;
    if (this.bossWeapon11) {
      this.bossWeapon11.bullets.destroy();
      this.bossWeapon11 = null;
    }
    if (this.bossWeapon21) {
      this.bossWeapon21.bullets.destroy();
      this.bossWeapon21 = null;
    }
    if (this.bossWeapon22) {
      this.bossWeapon22.bullets.destroy();
      this.bossWeapon22 = null;
    }
    _currentGameState2.default.score += 1000;
    _currentGameState2.default.levelscore += 1000;
  }
}

function overlapEnemies(player, enemy) {
  enemy.kill();

  if (_config2.default.mainPlayerHP) {
    _config2.default.mainPlayerHP--;
  }

  this.paintTimer = this.time.now;
  this.mainPlayer.key = 'mainPlayerRed';
  this.mainPlayer.loadTexture('mainPlayerRed');
  _animationsloader.paintInRed.apply(this);

  if (_config2.default.mainPlayerHP <= 2) {
    _animationsloader.explode.apply(this);
    _animationsloader.smoke1Player.apply(this);
  }

  if (_config2.default.mainPlayerHP <= 1) {
    _animationsloader.smoke2Player.apply(this);
  }

  if (!_config2.default.mainPlayerHP) {
    player.kill();
    _currentGameState2.default.mainPlayerKilled = true;
    this.countdown = this.time.now;
  }

  _currentGameState2.default.score += 100;
  _currentGameState2.default.levelscore += 100;
}

function overlapBoss(player, boss) {
  if (_config2.default.mainPlayerHP) {
    _config2.default.mainPlayerHP--;
  }

  this.paintTimer = this.time.now;
  this.mainPlayer.key = 'mainPlayerRed';
  this.mainPlayer.loadTexture('mainPlayerRed');

  if (_config2.default.mainPlayerHP <= 2) {
    _animationsloader.explode.apply(this);
    _animationsloader.smoke1Player.apply(this);
  }

  if (_config2.default.mainPlayerHP <= 1) {
    _animationsloader.smoke2Player.apply(this);
  }

  if (!_config2.default.mainPlayerHP) {
    player.kill();
    _currentGameState2.default.mainPlayerKilled = true;
    this.countdown = this.time.now;
  }
}

function killPlayer(player, bullet) {
  bullet.kill();
  invokeSound(this, 'enemy');
  if (player != this.mainPlayerShield) {
    if (_config2.default.mainPlayerHP) {
      _config2.default.mainPlayerHP--;
    }

    this.paintTimer = this.time.now;
    this.mainPlayer.key = 'mainPlayerRed';
    this.mainPlayer.loadTexture('mainPlayerRed');

    if (_config2.default.mainPlayerHP <= 2) {
      _animationsloader.explode.apply(this);
      _animationsloader.smoke1Player.apply(this);
    }
    if (_config2.default.mainPlayerHP <= 1) {
      _animationsloader.smoke2Player.apply(this);
    }
    if (!_config2.default.mainPlayerHP) {
      player.kill();
      _currentGameState2.default.mainPlayerKilled = true;
      this.countdown = this.time.now;
    }
    _animationsloader.explode.apply(this);
  }
}

/***/ }),
/* 20 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./src/js/loaders/enemiesloader.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  if (!_currentGameState2.default.bosstime) {
    if (!this.enemies || this.enemies.again || !this.enemies.total || this.time.now > this.enemAgain + 12000) {
      this.enemies = new _enemy2.default({
        game: game,
        parent: null,
        name: 'enem',
        addToStage: true,
        enableBody: true,
        physicsBodyType: _phaserCe2.default.Physics.ARCADE
      });
      this.game.add.existing(this.enemies);
      // -----------------------------apply position enemies to its behavior----------------
      this.enemies.pos = game.rnd.integerInRange(1, 5);
      this.enemies['position' + this.enemies.pos](); // this works
      //-----------------hard spawn enemies(just in cause)----------------------------
      this.enemAgain = this.time.now + 8000;

      if (this.enemies.pos === 3) {
        this.enemAgain = this.time.now;
      }
    }
  }
};

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _currentGameState = __webpack_require__(/*! ../currentGameState */ 2);

var _currentGameState2 = _interopRequireDefault(_currentGameState);

var _enemy = __webpack_require__(/*! ../objects/enemy */ 27);

var _enemy2 = _interopRequireDefault(_enemy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 21 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./src/js/loaders/inputloader.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _currentGameState = __webpack_require__(/*! ../currentGameState */ 2);

var _currentGameState2 = _interopRequireDefault(_currentGameState);

var _config = __webpack_require__(/*! ../config */ 1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var body = document.getElementById('game');
  var div = document.createElement('div');
  var title = document.createElement('p');
  var input = document.createElement('input');

  title.innerHTML = 'ENTER YOUR NAME';
  input.setAttribute('autofocus', 'true');

  var cb = function cb(e) {
    if (e.keyCode === 13) {
      _currentGameState2.default.name = input.value;
      input.value = '';
      body.removeChild(div);
    }
  };

  input.addEventListener('keydown', cb, false);
  div.style.cssText = 'width: ' + (_config2.default.gameWidth - 10) + 'px; height: ' + (_config2.default.gameHeight - 10) + 'px;';
  div.appendChild(title);
  div.appendChild(input);

  body.appendChild(div);
};

/***/ }),
/* 22 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./src/js/loaders/resetter.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  _currentGameState2.default.bosskilled = false;
  _currentGameState2.default.bosstime = false;
  _currentGameState2.default.mainPlayerKilled = false;
  _currentGameState2.default.levelscore = 0;
  this.boss = null;
  this.bossWeapon11 = null;
  this.bossWeapon21 = null;
  this.bossWeapon22 = null;
};

var _currentGameState = __webpack_require__(/*! ../currentGameState */ 2);

var _currentGameState2 = _interopRequireDefault(_currentGameState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 23 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./src/js/objects/backgroundFirstlevel.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _currentGameState = __webpack_require__(/*! ../currentGameState */ 2);

var _currentGameState2 = _interopRequireDefault(_currentGameState);

var _config = __webpack_require__(/*! ../config */ 1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$TileSprite) {
  _inherits(_class, _Phaser$TileSprite);

  function _class(_ref) {
    var game = _ref.game,
        x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height,
        asset = _ref.asset;

    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, x, y, width, height, asset));
  }

  _createClass(_class, [{
    key: 'update',
    value: function update() {
      if (_currentGameState2.default.bosstime) {
        this.tilePosition.x -= 5;
      } else if (_currentGameState2.default.bosskilled) {
        this.tilePosition.x -= 15;
      } else {
        this.tilePosition.x -= 1;
      }
    }
  }]);

  return _class;
}(_phaserCe2.default.TileSprite);

exports.default = _class;

/***/ }),
/* 24 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./src/js/objects/backgroundScore.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$TileSprite) {
  _inherits(_class, _Phaser$TileSprite);

  function _class(_ref) {
    var game = _ref.game,
        x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height,
        asset = _ref.asset;

    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, x, y, width, height, asset));
  }

  return _class;
}(_phaserCe2.default.TileSprite);

exports.default = _class;

/***/ }),
/* 25 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./src/js/objects/benefits.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Benefit = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _config = __webpack_require__(/*! ../config */ 1);

var _config2 = _interopRequireDefault(_config);

var _explosures = __webpack_require__(/*! ../sound/explosures */ 5);

var _currentGameState = __webpack_require__(/*! ../currentGameState */ 2);

var _currentGameState2 = _interopRequireDefault(_currentGameState);

var _animationsloader = __webpack_require__(/*! ../loaders/animationsloader */ 6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Benefit = exports.Benefit = function (_Phaser$Sprite) {
  _inherits(Benefit, _Phaser$Sprite);

  function Benefit(_ref) {
    var game = _ref.game,
        x = _ref.x,
        y = _ref.y,
        asset = _ref.asset;

    _classCallCheck(this, Benefit);

    var _this = _possibleConstructorReturn(this, (Benefit.__proto__ || Object.getPrototypeOf(Benefit)).call(this, game, x, y, asset));

    _this.anchor.setTo(0.5);
    _this.outOfBoundsKill = true;
    _this.scale.setTo(_config2.default.gameWidth / 2800); // scale
    game.physics.enable(_this, _phaserCe2.default.Physics.ARCADE);
    _this.events.onOutOfBounds.add(_this.out, game);
    return _this;
  }

  _createClass(Benefit, [{
    key: 'update',
    value: function update() {
      this.x -= _config2.default.enemiesSpeed;
    }
  }, {
    key: 'out',
    value: function out() {
      //-----------------------------out Of Bounds-----------------
      this.kill();
      _currentGameState2.default.score += 10000;
    }
  }, {
    key: 'getHealth',
    value: function getHealth(player, benefit) {
      benefit.kill();
      _explosures.getCollectable.apply(this);
      _config2.default.mainPlayerHP++;
      if (_config2.default.mainPlayerHP > 2) {
        _animationsloader.doNotSmoke1Player.apply(this);
      }
      if (_config2.default.mainPlayerHP > 2) {
        _animationsloader.doNotSmoke2Player.apply(this);
      }
      this.benefitHealth = null;
      _animationsloader.paintInGreen.apply(this);
    }
  }, {
    key: 'getScore',
    value: function getScore(player, benefit) {
      benefit.kill();
      _explosures.getCollectable.apply(this);
      _currentGameState2.default.score += 1000;
      _currentGameState2.default.levelscore += 1000;
      this.benefitScore = null;
    }
  }, {
    key: 'getShield',
    value: function getShield(player, benefit) {
      benefit.kill();
      _explosures.getCollectable.apply(this);
      this.mainPlayerShield = this.add.sprite(this.mainPlayer.x, this.mainPlayer.y, 'shieldOn');
      this.mainPlayerShield.anchor.setTo(0.5);
      this.mainPlayerShield.scale.setTo(1.3 + _config2.default.gameWidth / 1324 - 1);
      this.mainPlayerShield.countdown = this.time.now;
      this.game.add.existing(this.mainPlayerShield);
      game.physics.enable(this.mainPlayerShield, _phaserCe2.default.Physics.ARCADE);
      this.benefitShield = null;
    }
  }, {
    key: 'getBurst',
    value: function getBurst(player, benefit) {
      benefit.kill();
      _explosures.getCollectable.apply(this);
      _config2.default.mainPlayerSpeed += 120;
      this.benefitBurst = null;
    }
  }, {
    key: 'getAmmo',
    value: function getAmmo(player, benefit) {
      benefit.kill();
      _explosures.getCollectable.apply(this);
      this.ammoCountdown = this.time.now;
      _currentGameState2.default.mainPlayerWeapon = game.rnd.integerInRange(2, 3);
    }
  }]);

  return Benefit;
}(_phaserCe2.default.Sprite);

/***/ }),
/* 26 */
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** ./src/js/objects/boss.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _currentGameState = __webpack_require__(/*! ../currentGameState */ 2);

var _currentGameState2 = _interopRequireDefault(_currentGameState);

var _config = __webpack_require__(/*! ../config */ 1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Sprite) {
  _inherits(_class, _Phaser$Sprite);

  function _class(_ref) {
    var game = _ref.game,
        x = _ref.x,
        y = _ref.y,
        asset = _ref.asset;

    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, x, y, asset));

    _this.anchor.setTo(0.5);
    _this.outOfBoundsKill = true;
    _this.scale.setTo(1 + _config2.default.gameWidth / 1024 - 1); // scale
    _this.HP = _config2.default.firstBossHP;
    _this.HPinfo = game.add.text(_config2.default.gameWidth / 4.2, _config2.default.gameHeight - _config2.default.gameHeight / 21, 'BOSS HP: ' + _this.HP + ' ', { font: _config2.default.gameHeight / 32.8 + 'px Orbitron', fill: '#dddddd' });
    _this.HPinfo.anchor.setTo(0.5);
    game.physics.enable(_this, _phaserCe2.default.Physics.ARCADE);
    return _this;
  }

  _createClass(_class, [{
    key: 'update',
    value: function update() {
      if (this.x > _config2.default.gameWidth - 150) {
        this.x--;
      }
    }
  }]);

  return _class;
}(_phaserCe2.default.Sprite);

exports.default = _class;

/***/ }),
/* 27 */
/* no static exports found */
/* all exports used */
/*!*********************************!*\
  !*** ./src/js/objects/enemy.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _currentGameState = __webpack_require__(/*! ../currentGameState */ 2);

var _currentGameState2 = _interopRequireDefault(_currentGameState);

var _config = __webpack_require__(/*! ../config */ 1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$Group) {
  _inherits(_class, _Phaser$Group);

  function _class(_ref) {
    var game = _ref.game,
        parent = _ref.parent,
        name = _ref.name,
        addToStage = _ref.addToStage,
        enableBody = _ref.enableBody,
        physicsBodyType = _ref.physicsBodyType;

    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game, parent, name, addToStage, enableBody, physicsBodyType));

    _this.countEnemies = game.rnd.integerInRange(5, 25);
    _this.move = game.rnd.integerInRange(1, 2);
    _this.a = 0;
    _this.b = 50;
    _this.again = 0;
    game.physics.enable(_this, _phaserCe2.default.Physics.ARCADE);
    return _this;
  }

  _createClass(_class, [{
    key: 'update',
    value: function update() {
      this['move' + this.move]();
    }
  }, {
    key: 'boundsHandler',
    value: function boundsHandler(enemy, enemies) {
      enemy.kill();
      if (enemies.children[enemies.total] === enemy) {
        enemies.again = 1;
        enemies = null;
      }
    }
  }, {
    key: 'boundsHandlerFor3',
    value: function boundsHandlerFor3(enemy, enemies) {
      enemy.kill();
      if (enemies.children[enemies.total] === enemy) {
        enemies.again = 1;
        enemies = null;
      }
    }
  }, {
    key: 'onEnemyEnterBounds',
    value: function onEnemyEnterBounds(enemy, enemies) {
      enemy.events.onOutOfBounds.add(this.boundsHandler.bind(this, enemy, enemies), game);
    }
  }, {
    key: 'onEnemyEnterBoundsFor3',
    value: function onEnemyEnterBoundsFor3(enemy, enemies) {
      enemy.events.onOutOfBounds.add(this.boundsHandlerFor3.bind(this, enemy, enemies), game);
    }
    //--------------------enemies position---------------------------------------------------

  }, {
    key: 'position1',
    value: function position1() {
      // rand one row
      var randYpos = game.rnd.integerInRange(100, _config2.default.gameHeight - 200);
      var randAmplitude = game.rnd.integerInRange(10, 100);
      var rndEnemy = 'enemy_' + game.rnd.integerInRange(1, 3);
      var yPos = randYpos;
      var xPos = _config2.default.gameWidth - 1;
      var tw = void 0;

      for (var y = 0; y < this.countEnemies; y += 1) {
        xPos += 100 + _config2.default.gameWidth / 35; //scale -----------------------------------
        var enemy = this.create(xPos, yPos, rndEnemy);
        enemy.scale.setTo(_config2.default.gameWidth / 1424); // scale------------------------------------
        enemy.anchor.setTo(0.5);
        game.physics.enable(enemy, _phaserCe2.default.Physics.ARCADE);
        enemy.checkWorldBounds = true;
        enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, enemy, this), game);

        if (y == this.countEnemies) {
          enemy.last = true;
        }

        //-------------------behavior----------------------------
        // set tween within position
        tw = y % 2 ? randYpos + randAmplitude : randYpos - randAmplitude;
        game.add.tween(enemy).to({ y: tw }, 1000, _phaserCe2.default.Easing.Linear.None, true, 0, 100, true);
      }
    }
  }, {
    key: 'position2',
    value: function position2() {
      // rand Two rows
      var randYpos = game.rnd.integerInRange(100, _config2.default.gameHeight - 200);
      var randAmplitude = game.rnd.integerInRange(10, 100);
      var rndEnemy = 'enemy_' + game.rnd.integerInRange(1, 3);
      var yPos = randYpos;
      var xPos = _config2.default.gameWidth - 1;
      var tw = void 0;

      for (var y = 0; y < this.countEnemies; y += 1) {
        xPos += 100 + _config2.default.gameWidth / 35; //scale -----------------------------------
        var enemy = this.create(xPos, yPos, rndEnemy);
        enemy.scale.setTo(_config2.default.gameWidth / 1424); // scale------------------------------------
        enemy.anchor.setTo(0.5);
        game.physics.enable(enemy, _phaserCe2.default.Physics.ARCADE);
        enemy.checkWorldBounds = true;
        enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, enemy, this), game);

        if (y == this.countEnemies) {
          enemy.last = true;
        }

        //-------------------behavior----------------------------
        // set tween within position
        tw = y % 2 ? randYpos + randAmplitude : randYpos - randAmplitude;
        game.add.tween(enemy).to({ y: tw }, 1000, _phaserCe2.default.Easing.Linear.None, true, 0, 100, true);
      }

      if (randYpos > _config2.default.gameHeight / 2) {
        randYpos = randYpos - _config2.default.gameHeight / 2; //config.gameHeight-200;
      } else {
        randYpos = randYpos + _config2.default.gameHeight / 2;
      }

      yPos = randYpos;
      xPos = _config2.default.gameWidth - 1;

      for (var _y = 0; _y < this.countEnemies; _y += 1) {
        xPos += 100 + _config2.default.gameWidth / 35; //scale -----------------------------------
        var _enemy = this.create(xPos, yPos, rndEnemy);
        _enemy.scale.setTo(_config2.default.gameWidth / 1424); // scale------------------------------------
        _enemy.anchor.setTo(0.5);
        game.physics.enable(_enemy, _phaserCe2.default.Physics.ARCADE);
        _enemy.checkWorldBounds = true;
        _enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, _enemy, this), game);

        if (_y == this.countEnemies) {
          _enemy.last = true;
        }

        //-------------------behavior----------------------------
        // set tween within position
        tw = _y % 2 ? randYpos + randAmplitude : randYpos - randAmplitude;
        game.add.tween(_enemy).to({ y: tw }, 1000, _phaserCe2.default.Easing.Linear.None, true, 0, 100, true);
      }
    }
  }, {
    key: 'position3',
    value: function position3() {
      // columnAndRows
      var randYpos = game.rnd.integerInRange(100, _config2.default.gameHeight / 2);
      var rndEnemy = 'enemy_' + game.rnd.integerInRange(1, 3);
      var rndRows = game.rnd.integerInRange(1, 5);
      var yPos = randYpos; //config.gameHeight-200;
      var xPos = _config2.default.gameWidth + 50;

      for (var z = 0; z < rndRows; z++) {
        for (var y = 0; y < 7; y += 1) {
          //xPos++;
          var enemy = this.create(xPos, yPos, rndEnemy);
          enemy.scale.setTo(_config2.default.gameWidth / 1424); // scale------------------------------------
          enemy.anchor.setTo(0.5);
          game.physics.enable(enemy, _phaserCe2.default.Physics.ARCADE);
          enemy.checkWorldBounds = true;
          enemy.events.onEnterBounds.add(this.onEnemyEnterBoundsFor3.bind(this, enemy, this), game);

          if (z == rndRows) {
            enemy.last = true;
          }

          yPos += 60 + _config2.default.gameHeight / 26; //scale -----------------------------------
        }

        xPos += 120 + _config2.default.gameWidth / 35; //scale -----------------------------------
        yPos = randYpos;
      }
    }
  }, {
    key: 'position4',
    value: function position4() {
      // DiagonalRow
      var randYpos = game.rnd.integerInRange(100, _config2.default.gameHeight / 2);
      var rndEnemy = 'enemy_' + game.rnd.integerInRange(1, 3);
      var yPos = randYpos; //config.gameHeight-200;
      var xPos = _config2.default.gameWidth + 50;
      var rowCount = 0;
      var tw = void 0;

      for (var y = 0; y < this.countEnemies + 10; y += 1) {
        var enemy = this.create(xPos, yPos, rndEnemy);
        enemy.scale.setTo(_config2.default.gameWidth / 1424); // scale------------------------------------
        enemy.anchor.setTo(0.5);
        game.physics.enable(enemy, _phaserCe2.default.Physics.ARCADE);
        enemy.checkWorldBounds = true;
        enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, enemy, this), game);

        if (y == this.countEnemies - 1) {
          enemy.last = true;
        }

        xPos += 60 + _config2.default.gameWidth / 35; //scale -----------------------------------
        yPos += 60 + _config2.default.gameHeight / 26; //scale -----------------------------------
        tw = xPos;

        if (yPos > _config2.default.gameHeight - 200) {
          rowCount++;
          xPos = _config2.default.gameWidth + 50 + 120 * rowCount + _config2.default.gameWidth / 35; //scale -----------------------------------;
          yPos = randYpos;
        }
      }
    }
  }, {
    key: 'position5',
    value: function position5() {
      // duckWedge
      var randYpos = game.rnd.integerInRange(100, _config2.default.gameHeight / 2 - 200);
      var rndEnemy = 'enemy_' + game.rnd.integerInRange(1, 3);
      var rndRows = game.rnd.integerInRange(1, 3);
      var yPos = randYpos; //config.gameHeight-200;
      var xPos = _config2.default.gameWidth + 600;
      var rowCount = 0;

      for (var z = 0; z < rndRows; z++) {
        for (var y = 0; y < 11; y += 1) {
          var enemy = this.create(xPos, yPos, rndEnemy);
          enemy.scale.setTo(_config2.default.gameWidth / 1424); // scale------------------------------------
          enemy.anchor.setTo(0.5);
          game.physics.enable(enemy, _phaserCe2.default.Physics.ARCADE);
          enemy.checkWorldBounds = true;
          enemy.events.onEnterBounds.add(this.onEnemyEnterBounds.bind(this, enemy, this), game);
          if (y === this.countEnemies - 1) {
            enemy.last = true;
          }

          yPos += 60 + _config2.default.gameHeight / 26; //scale -----------------------------------
          if (y < 5) {
            xPos -= 60 + _config2.default.gameWidth / 35; //scale -----------------------------------
          } else {
            xPos += 60 + _config2.default.gameWidth / 35; //scale -----------------------------------
          }
        }
        xPos = _config2.default.gameWidth + 600 + 120 + _config2.default.gameWidth / 35; //scale -----------------------------------;
        yPos = randYpos;
      }
    }

    // -----------------------enemies movement------------------------------------------------

  }, {
    key: 'move1',
    value: function move1() {
      // linear
      this.x -= _config2.default.enemiesSpeed;
    }
  }, {
    key: 'move2',
    value: function move2() {
      // upanddown
      this.x -= _config2.default.enemiesSpeed;
      if (this.a < this.b) {
        this.y -= 1;
        this.a === 49 ? this.a = 100 : this.a++;
      } else {
        this.y += 1;
        this.a == 51 ? this.a = 1 : this.a--;
      }
    }
  }]);

  return _class;
}(_phaserCe2.default.Group);

exports.default = _class;

/***/ }),
/* 28 */
/* no static exports found */
/* all exports used */
/*!**********************************!*\
  !*** ./src/js/objects/weapon.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.weaponOn = weaponOn;
exports.threeWayWeapon = threeWayWeapon;
exports.spreadWeapon = spreadWeapon;

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _explosures = __webpack_require__(/*! ../sound/explosures */ 5);

var _config = __webpack_require__(/*! ../config */ 1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function weaponOn() {
  this.weapon = this.game.add.weapon(30, 'bullet');
  this.weapon.bulletSpeed = 600;
  this.weapon.fireRate = 150;
  this.weapon.fireAngle = 0;
  this.weapon.trackSprite(this.mainPlayer, 65, 0, false);
  this.weapon.onFire.add(invokeSoundOnFire, this);
  this.game.physics.enable(this.weapon, _phaserCe2.default.Physics.ARCADE);
  return { weapon: this.weapon, multiple: false };
}

function threeWayWeapon() {
  this.gun1 = this.game.add.weapon(30, 'missile');
  this.gun1.bulletSpeed = 600;
  this.gun1.fireRate = 200;
  this.gun1.fireAngle = 0;
  this.gun1.trackSprite(this.mainPlayer, 65, 0, false);
  this.gun1.onFire.add(invokeSoundOnFire, this);
  this.game.physics.enable(this.gun1, _phaserCe2.default.Physics.ARCADE);
  //---------------------------------------------------------
  this.gun2 = this.game.add.weapon(30, 'missile');
  this.gun2.bulletSpeed = 600;
  this.gun2.fireRate = 200;
  this.gun2.fireAngle = 27;
  this.gun2.trackSprite(this.mainPlayer, 45, 30, false);
  this.gun2.onFire.add(invokeSoundOnFire, this);
  this.game.physics.enable(this.gun2, _phaserCe2.default.Physics.ARCADE);
  //---------------------------------------------------------
  this.gun3 = this.game.add.weapon(30, 'missile');
  this.gun3.bulletSpeed = 600;
  this.gun3.fireRate = 200;
  this.gun3.fireAngle = 333;
  this.gun3.trackSprite(this.mainPlayer, 45, -30, false);
  this.gun3.onFire.add(invokeSoundOnFire, this);
  this.game.physics.enable(this.gun3, _phaserCe2.default.Physics.ARCADE);

  return { weapon: [this.gun1, this.gun2, this.gun3], multiple: true };
}

function spreadWeapon() {
  this.spreadWeapon = this.game.add.weapon(30, 'missile2');
  this.spreadWeapon.setBulletFrames(0, 1, true, true);
  this.spreadWeapon.addBulletAnimation('missile2', [0, 1], true, true);
  this.spreadWeapon.bulletSpeed = 600;
  this.spreadWeapon.fireRate = 100;
  this.spreadWeapon.fireAngle = 0;
  this.spreadWeapon.bulletAngleVariance = 10;
  this.spreadWeapon.trackSprite(this.mainPlayer, 65, 0, false);
  this.spreadWeapon.onFire.add(invokeSoundOnFire, this);
  this.game.physics.enable(this.spreadWeapon, _phaserCe2.default.Physics.ARCADE);

  return { weapon: this.spreadWeapon, multiple: false };
}

function invokeSoundOnFire() {
  _explosures.shot.apply(this);
}

/***/ }),
/* 29 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./src/js/states/createName.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _inputloader = __webpack_require__(/*! ../loaders/inputloader */ 21);

var _inputloader2 = _interopRequireDefault(_inputloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'preload',
    value: function preload() {
      (0, _inputloader2.default)(this);
    }
  }, {
    key: 'create',
    value: function create() {
      this.fireButton = this.game.input.keyboard.addKey(_phaserCe2.default.Keyboard.ENTER);
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.fireButton.isDown) {
        this.state.start('level');
      }
    }
  }]);

  return _class;
}(_phaserCe2.default.State);

exports.default = _class;

/***/ }),
/* 30 */
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** ./src/js/states/intro.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _webfontloader = __webpack_require__(/*! webfontloader */ 3);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

var _backgroundMainMenu = __webpack_require__(/*! ../objects/backgroundMainMenu */ 12);

var _backgroundMainMenu2 = _interopRequireDefault(_backgroundMainMenu);

var _bgmusic = __webpack_require__(/*! ../sound/bgmusic */ 7);

var _storageloader = __webpack_require__(/*! ../loaders/storageloader */ 11);

var _storageloader2 = _interopRequireDefault(_storageloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'preload',
    value: function preload() {
      _webfontloader2.default.load({
        google: {
          families: ['Orbitron']
        },
        active: this.fontsLoaded
      });

      this.game.load.audio('intro', './sounds/intro.ogg');
      this.load.image('loaderBg', './img/states/bgMainMenu.jpg');
    }
  }, {
    key: 'create',
    value: function create() {
      (0, _storageloader2.default)();
      this.music = this.game.add.audio('intro', 1, false, true);
      this.music.play();

      this.text = this.add.text(this.world.centerX, this.world.centerY - 100, 'KungFu-Crane-Game-Team      ', { font: '32px Arial', fill: '#dddddd' });
      this.text.anchor.setTo(0.5);
      this.text.alpha = 0;
      this.text.font = 'Orbitron';

      this.countdown = this.time.now;
      //---------------------------------------skip--------------------------
      this.fireButton = this.game.input.keyboard.addKey(_phaserCe2.default.Keyboard.SPACEBAR);
    }
  }, {
    key: 'update',
    value: function update() {
      //-------------------------------FIRST TEXT-----------------------------
      if (this.time.now > this.countdown + 2300 && this.time.now < this.countdown + 2500) {
        if (this.text.alpha < 0.95) {
          this.text.alpha += 0.1;
        }
        if (this.text.alpha > 1) {
          this.text.alpha = 1;
        }
      }
      // if (this.time.now > this.countdown + 2300) {
      // }
      if (this.time.now > this.countdown + 6300 && this.time.now < this.countdown + 10000) {
        this.text.y += 1;
        if (this.text.alpha > 0.03) this.text.alpha -= 0.01;
        if (this.text.alpha < 0) this.text.alpha = 0;
        if (this.text.alpha < 0.1) this.text.text = '';
      }
      //-------------------------------SEC TEXT-----------------------------
      if (this.time.now > this.countdown + 10000 && this.time.now < this.countdown + 10100) {
        this.text.y = this.world.centerY - 100;
      }
      if (this.time.now > this.countdown + 10500 && this.time.now < this.countdown + 10700) {
        if (this.text.alpha < 0.95) {
          this.text.alpha += 0.1;
        }
        if (this.text.alpha > 1) {
          this.text.alpha = 1;
        }
      }
      if (this.time.now > this.countdown + 10500) {
        this.text.text = 'PRESENT     ';
      }
      if (this.time.now > this.countdown + 14500 && this.time.now < this.countdown + 18000) {
        this.text.y += 1;
        if (this.text.alpha > 0.03) this.text.alpha -= 0.01;
        if (this.text.alpha < 0) this.text.alpha = 0;
        if (this.text.alpha < 0.1) this.text.text = '';
      }
      //-------------------------------third TEXT-----------------------------
      if (this.time.now > this.countdown + 18000 && this.time.now < this.countdown + 18100) {
        this.text.y = this.world.centerY - 100;
      }
      if (this.time.now > this.countdown + 18600 && this.time.now < this.countdown + 18800) {
        if (this.text.alpha < 0.95) {
          this.text.alpha += 0.1;
        }
        if (this.text.alpha > 1) {
          this.text.alpha = 1;
        }
      }
      if (this.time.now > this.countdown + 18600) {
        this.text.text = 'A GAME     ';
      }
      if (this.time.now > this.countdown + 22500 && this.time.now < this.countdown + 26000) {
        this.text.y += 1;
        if (this.text.alpha > 0.03) {
          this.text.alpha -= 0.01;
        }
        if (this.text.alpha < 0) {
          this.text.alpha = 0;
        }
        if (this.text.alpha < 0.1) {
          this.text.text = '';
        }
      }
      //-------------------------------fourth TEXT-----------------------------
      if (this.time.now > this.countdown + 26100 && this.time.now < this.countdown + 26300) {
        this.text.y = this.world.centerY - 100;
      }
      if (this.time.now > this.countdown + 26600 && this.time.now < this.countdown + 26800) {
        if (this.text.alpha < 0.95) {
          this.text.alpha += 0.1;
        }
        if (this.text.alpha > 1) {
          this.text.alpha = 1;
        }
      }
      if (this.time.now > this.countdown + 26600) {
        this.text.text = 'BASED ON CANVAS + PHASER-CE TECHNOLOGIES     ';
      }
      if (this.time.now > this.countdown + 30600 && this.time.now < this.countdown + 34000) {
        this.text.y += 1;
        if (this.text.alpha > 0.03) {
          this.text.alpha -= 0.01;
        }
        if (this.text.alpha < 0) {
          this.text.alpha = 0;
        }
        if (this.text.alpha < 0.1) {
          this.text.text = '';
        }
      }
      if (this.time.now > this.countdown + 34011) {
        this.music.pause();
        this.state.start('mainMenu');
      }
      //----------------------------skip------------------------------
      if (this.fireButton.isDown) {
        this.music.pause();
        this.state.start('mainMenu');
      }
    }
  }]);

  return _class;
}(_phaserCe2.default.State);

exports.default = _class;

/***/ }),
/* 31 */
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** ./src/js/states/level.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _config = __webpack_require__(/*! ../config */ 1);

var _config2 = _interopRequireDefault(_config);

var _currentGameState = __webpack_require__(/*! ../currentGameState */ 2);

var _currentGameState2 = _interopRequireDefault(_currentGameState);

var _animationsloader = __webpack_require__(/*! ../loaders/animationsloader */ 6);

var _enemiesloader = __webpack_require__(/*! ../loaders/enemiesloader */ 20);

var _enemiesloader2 = _interopRequireDefault(_enemiesloader);

var _gameOverloader = __webpack_require__(/*! ../loaders/gameOverloader */ 10);

var _gameOverloader2 = _interopRequireDefault(_gameOverloader);

var _bossloader = __webpack_require__(/*! ../loaders/bossloader */ 18);

var _bossloader2 = _interopRequireDefault(_bossloader);

var _collisionloader = __webpack_require__(/*! ../loaders/collisionloader */ 19);

var _collisionloader2 = _interopRequireDefault(_collisionloader);

var _resetter = __webpack_require__(/*! ../loaders/resetter */ 22);

var _resetter2 = _interopRequireDefault(_resetter);

var _controls = __webpack_require__(/*! ../controls/controls */ 17);

var _bgmusic = __webpack_require__(/*! ../sound/bgmusic */ 7);

var _levelsConfig = __webpack_require__(/*! ../levelsConfig */ 9);

var _levelsConfig2 = _interopRequireDefault(_levelsConfig);

var _webfontloader = __webpack_require__(/*! webfontloader */ 3);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'preload',
    value: function preload() {
      _webfontloader2.default.load({
        google: {
          families: ['Orbitron']
        },
        active: this.fontsLoaded
      });
      _animationsloader.preloadAnimation.apply(this);
      _bgmusic.loadMusic.apply(this);
    }
  }, {
    key: 'create',
    value: function create() {
      _resetter2.default.apply(this);
      // -----------------music-----------------------------------------
      _bgmusic.applyMusic.apply(this);
      //---------------------------------------------------------------
      _animationsloader.createAnimation.apply(this);
      _controls.setKeys.apply(this);
      // -------------------------statusBar---------------------------------
      this.scoreText = this.add.text(_config2.default.gameWidth - _config2.default.gameWidth / 8.4, _config2.default.gameHeight - _config2.default.gameHeight / 21, 'score: ' + _currentGameState2.default.score, { font: _config2.default.gameHeight / 32.8 + 'px Orbitron', fill: '#dddddd' });
      this.scoreText.anchor.setTo(0.5);

      this.mainPlayerHP = this.add.text(_config2.default.gameWidth / 8.4, _config2.default.gameHeight - _config2.default.gameHeight / 21, 'HP: ' + _config2.default.mainPlayerHP, { font: _config2.default.gameHeight / 32.8 + 'px Orbitron', fill: '#dddddd' });
      this.mainPlayerHP.anchor.setTo(0.5);

      // -----------------------------countdown---------------------------------
      this.countdown = this.time.now;
      this.levelName = this.add.text(_config2.default.gameWidth / 2, _config2.default.gameHeight / 2 - 50, _levelsConfig2.default[_currentGameState2.default.level].levelName, { font: _config2.default.gameHeight / 32.8 + 'px Orbitron', fill: '#dddddd' });
      this.levelName.anchor.setTo(0.5);

      //-----------------------------winCase-----------------------------------------
      this.winText = this.add.text(_config2.default.gameWidth / 2, _config2.default.gameHeight / 2, '', { font: _config2.default.gameHeight / 32.8 + 'px Orbitron', fill: '#dddddd' });
      this.winText.anchor.setTo(0.5);
    }
  }, {
    key: 'update',
    value: function update() {
      //---------------------------scale block-----------------------------------
      _config2.default.gameWidth = document.documentElement.clientWidth;
      _config2.default.gameHeight = document.documentElement.clientHeight;
      this.game.width = _config2.default.gameWidth;
      this.game.height = _config2.default.gameHeight;
      //-------------------------------------------------------------------------
      this.currentWeapon = this['weapon' + _currentGameState2.default.mainPlayerWeapon];
      // --------------------------countDown-------------------------------------

      if (this.time.now < this.countdown + 2000) {
        if (this.mainPlayer.x < 200) {
          this.mainPlayer.x += 8;
        }
      } else {
        this.levelName.text = '';

        _collisionloader2.default.apply(this);
        // --------------------------update statusBar------------------------------
        this.mainPlayerHP.text = 'HP: ' + _config2.default.mainPlayerHP + ' ';
        this.scoreText.text = 'score: ' + _currentGameState2.default.score + ' ';

        // --------------------------if press nothing stop the ship------------
        this.mainPlayer.body.velocity.x = 0;
        this.mainPlayer.body.velocity.y = 0;

        //------------------------changing states of main player----------------

        if (_config2.default.mainPlayerHP == 1) {
          this.mainPlayer.animations.add('up', [39, 40, 41, 42, 43, 44, 45, 46, 47]);
          this.mainPlayer.animations.add('upBack', [47, 46, 45, 44, 43, 42, 41, 40, 39]);
          this.mainPlayer.animations.add('down', [48, 49, 50, 51, 52, 53, 54, 55, 56]);
          this.mainPlayer.animations.add('downBack', [56, 55, 54, 53, 52, 51, 50, 49, 48]);
          this.mainPlayer.frame = 38;
        } else if (_config2.default.mainPlayerHP == 2) {
          this.mainPlayer.animations.add('up', [20, 21, 22, 23, 24, 25, 26, 27, 28]);
          this.mainPlayer.animations.add('upBack', [28, 27, 26, 25, 24, 23, 22, 21, 20]);
          this.mainPlayer.animations.add('down', [29, 30, 31, 32, 33, 34, 35, 36, 37]);
          this.mainPlayer.animations.add('downBack', [37, 36, 35, 34, 33, 32, 31, 30, 29]);
          this.mainPlayer.frame = 19;
        } else if (_config2.default.mainPlayerHP > 2) {
          this.mainPlayer.animations.add('up', [1, 2, 3, 4, 5, 6, 7, 8, 9]);
          this.mainPlayer.animations.add('upBack', [9, 8, 7, 6, 5, 4, 3, 2, 1]);
          this.mainPlayer.animations.add('down', [10, 11, 12, 13, 14, 15, 16, 17, 18]);
          this.mainPlayer.animations.add('downBack', [18, 17, 16, 15, 14, 13, 12, 11, 10]);
          this.mainPlayer.frame = 0;
        }

        // -------------------------boss alive-------------------------------------------------
        if (!_currentGameState2.default.bosskilled) {
          // ------------------------spawn enemies-------------------------------------
          _enemiesloader2.default.apply(this);
          // ---------------------spawn boss------------------------------------------
          _bossloader2.default.apply(this);
        } else {
          this.winText.text = 'Well done!';
          ///this.mainPlayer.x += 20; TODO!!!!
          if (this.time.now > this.countdown + 4000) {
            _currentGameState2.default.level += 1;
            if (_currentGameState2.default.level > _levelsConfig2.default.length - 1) {
              _gameOverloader2.default.apply(this);
            } else {
              this.state.start('level');
            }
          }
        }
        //--------------------if mainPlayer dies-----------------------------------
        if (_currentGameState2.default.mainPlayerKilled) {
          _gameOverloader2.default.apply(this);
        }
        // ---------------------controls----------------------------------------
        _controls.keysOn.apply(this);
        //-------------------------------------------------------------------------
        _controls.mouseOn.apply(this);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      _animationsloader.paintInYellow.apply(this);
      _animationsloader.normalPaintBoss.apply(this);
    }
  }]);

  return _class;
}(_phaserCe2.default.State);

exports.default = _class;

/***/ }),
/* 32 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./src/js/states/mainMenu.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _webfontloader = __webpack_require__(/*! webfontloader */ 3);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

var _backgroundMainMenu = __webpack_require__(/*! ../objects/backgroundMainMenu */ 12);

var _backgroundMainMenu2 = _interopRequireDefault(_backgroundMainMenu);

var _bgmusic = __webpack_require__(/*! ../sound/bgmusic */ 7);

var _currentGameState = __webpack_require__(/*! ../currentGameState */ 2);

var _currentGameState2 = _interopRequireDefault(_currentGameState);

var _config = __webpack_require__(/*! ../config */ 1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'preload',
    value: function preload() {
      _webfontloader2.default.load({
        google: {
          families: ['Orbitron']
        },
        active: this.fontsLoaded
      });
      this.load.spritesheet('start', './img/pause/start.png', 300, 80);
      this.load.spritesheet('scores', './img/pause/scores.png', 300, 80);
      this.load.image('loaderBg', './img/states/bgMainMenu.jpg');
      this.load.image('player', './img/player/player.png');
      _bgmusic.loadMusic.apply(this);
    }
  }, {
    key: 'create',
    value: function create() {
      _currentGameState2.default.reset();
      _config2.default.reset();
      _bgmusic.applyMusic.apply(this);

      this.background = new _backgroundMainMenu2.default({
        game: game,
        x: 0,
        y: 0,
        width: 1024,
        height: 512,
        asset: 'loaderBg'
      });
      this.background.scale.setTo(_config2.default.gameWidth / this.background.width, _config2.default.gameHeight / this.background.height);
      this.game.add.existing(this.background);
      this.playerBack = this.game.add.sprite(this.game.world.centerX - _config2.default.gameWidth / 16, this.game.world.centerY, 'player');
      this.playerBack.anchor.setTo(0.5);
      this.playerBack.scale.setTo(_config2.default.gameHeight / 1050);
      this.Hawks = this.add.text(this.world.centerX, this.world.centerY - _config2.default.gameHeight / 10, 'Hawking Revenge ', { font: _config2.default.gameHeight / 15 + 'px Orbitron', fontWeight: 'bold', fill: '#ff0' });
      this.Hawks.anchor.setTo(0.5);

      //--------------------------------------BUTTONS------------------------------------------------------------------------
      this.startButton = this.game.add.button(this.game.world.centerX, _config2.default.gameHeight - _config2.default.gameHeight / 5, 'start', this.toStart, this, 1, 0, 1);
      this.startButton.scale.setTo(_config2.default.gameHeight / 1050);
      this.startButton.anchor.setTo(0.5);
      this.scoreButton = this.game.add.button(this.game.world.centerX, _config2.default.gameHeight - _config2.default.gameHeight / 10, 'scores', this.toScores, this, 1, 0, 1);
      this.scoreButton.scale.setTo(_config2.default.gameHeight / 1050);
      this.scoreButton.anchor.setTo(0.5);
      //---------------------------------------------------------------------------------------------------------------------
      this.startGame = false;
      this.startScore = false;
    }
  }, {
    key: 'update',
    value: function update() {
      //---------------------------scale block-----------------------------------
      _config2.default.gameWidth = document.documentElement.clientWidth;
      _config2.default.gameHeight = document.documentElement.clientHeight;
      this.game.width = _config2.default.gameWidth;
      this.game.height = _config2.default.gameHeight;
      //-------------------------------------------------------------------------
      if (this.startGame || this.startScore) {
        this.scoreButton.y += 12;
        if (this.scoreButton.y > _config2.default.gameHeight + 30) {
          this.startButton.y += 12;
        }
        if (this.startButton.y > _config2.default.gameHeight + 30) {
          this.Hawks.y += 12;
        }
        if (this.Hawks.y > _config2.default.gameHeight + 30 && this.background.alpha > 0.03) {
          this.background.alpha -= 0.02;
        }
        if (this.background.alpha < 0.03) {
          if (this.startGame) {
            this.mainMenuMusic.pause();
            this.state.start('createName');
          }
          if (this.startScore) {
            this.state.start('score');
          }
        }
      }
    }
  }, {
    key: 'toStart',
    value: function toStart() {
      this.countdown = this.time.now;
      this.startGame = true;
    }
  }, {
    key: 'toScores',
    value: function toScores() {
      this.countdown = this.time.now;
      this.startScore = true;
    }
  }]);

  return _class;
}(_phaserCe2.default.State);

exports.default = _class;

/***/ }),
/* 33 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./src/js/states/pauseMenu.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invokePauseMenu = invokePauseMenu;
exports.resume = resume;

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _config = __webpack_require__(/*! ../config */ 1);

var _config2 = _interopRequireDefault(_config);

var _gameOverloader = __webpack_require__(/*! ../loaders/gameOverloader */ 10);

var _gameOverloader2 = _interopRequireDefault(_gameOverloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function invokePauseMenu() {
  if (!this.game.paused === true) {
    this.game.paused = true;
    this.pauseMenuGroup = this.game.add.group();

    this.resumeButton = this.game.add.button(this.game.world.centerX - 95, 100, 'button', resume, this, 1, 0, 1);
    this.mainMenuButton = this.game.add.button(this.game.world.centerX - 95, 250, 'menuButton', toMainMenu, this, 1, 0, 1);
    this.reloadButton = this.game.add.button(this.game.world.centerX - 95, 150, 'reload', reload, this, 1, 0, 1);

    this.resumeButton.scale.setTo(0.6);
    this.mainMenuButton.scale.setTo(0.6);
    this.reloadButton.scale.setTo(0.6);

    this.pauseMenuGroup.add(this.resumeButton);
    this.pauseMenuGroup.add(this.mainMenuButton);
    this.pauseMenuGroup.add(this.reloadButton);
  } else {
    resume();
  }
}

function resume() {
  this.game.world.remove(this.pauseMenuGroup);
  this.pauseMenuGroup.destroy();
  this.game.paused = false;
}

function toMainMenu() {
  this.game.world.remove(this.pauseMenuGroup);
  this.pauseMenuGroup.destroy();
  this.game.paused = false;
  this.state.start('mainMenu');
}

function reload() {
  this.game.world.remove(this.pauseMenuGroup);
  this.pauseMenuGroup.destroy();
  this.game.paused = false;
}

/***/ }),
/* 34 */
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** ./src/js/states/score.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaserCe = __webpack_require__(/*! phaser-ce */ 0);

var _phaserCe2 = _interopRequireDefault(_phaserCe);

var _webfontloader = __webpack_require__(/*! webfontloader */ 3);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

var _backgroundScore = __webpack_require__(/*! ../objects/backgroundScore */ 24);

var _backgroundScore2 = _interopRequireDefault(_backgroundScore);

var _config = __webpack_require__(/*! ../config */ 1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'preload',
    value: function preload() {
      _webfontloader2.default.load({
        google: {
          families: ['Orbitron']
        },
        active: this.fontsLoaded
      });

      this.load.image('loaderBg', './img/states/bgScore.jpg');
      this.load.spritesheet('back', './img/pause/back.png', 300, 80);
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      var score = JSON.parse(window.localStorage.getItem('score'));

      this.background = new _backgroundScore2.default({
        game: game,
        x: 0,
        y: 0,
        width: 1024,
        height: 512,
        asset: 'loaderBg'
      });
      this.background.scale.setTo(_config2.default.gameWidth / this.background.width, _config2.default.gameHeight / this.background.height);
      this.game.add.existing(this.background);

      var textScore = this.add.text(this.world.centerX, 80, 'Score  ', { font: '32px Orbitron', fill: '#dddddd' });
      textScore.anchor.setTo(0.5, 0.5);

      score.forEach(function (el, i) {
        var player = _this2.add.text(_this2.world.centerX, 50 * i + 140, el.name + ' : ' + el.value + '  ', { font: '32px Orbitron', fill: '' + el.color });
        player.anchor.setTo(0.5, 0.5);
      });

      this.backButton = this.game.add.button(this.game.world.centerX, _config2.default.gameHeight - 100, 'back', this.toStart, this, 1, 0, 1);
      this.backButton.scale.setTo(_config2.default.gameHeight / 1050);
      this.backButton.anchor.setTo(0.5);
      this.back = false;
      //this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
  }, {
    key: 'update',
    value: function update() {
      //---------------------------scale block-----------------------------------
      _config2.default.gameWidth = document.documentElement.clientWidth;
      _config2.default.gameHeight = document.documentElement.clientHeight;
      this.game.width = _config2.default.gameWidth;
      this.game.height = _config2.default.gameHeight;
      //-------------------------------------------------------------------------

      if (this.back) {
        this.backButton.y += 7;
        if (this.backButton.y > _config2.default.gameHeight + 30) {
          this.state.start('mainMenu');
        }
      }
    }
  }, {
    key: 'toStart',
    value: function toStart() {
      this.back = true;
    }
  }]);

  return _class;
}(_phaserCe2.default.State);

exports.default = _class;

/***/ }),
/* 35 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/phaser-ce/build/custom/p2.js ***!
  \****************************************/
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'D:\\code\\KungFu-Crane-game-team\\node_modules\\phaser-ce\\build\\custom\\p2.js'");

/***/ }),
/* 36 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/phaser-ce/build/custom/phaser-split.js ***!
  \**************************************************/
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'D:\\code\\KungFu-Crane-game-team\\node_modules\\phaser-ce\\build\\custom\\phaser-split.js'");

/***/ }),
/* 37 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/phaser-ce/build/custom/pixi.js ***!
  \******************************************/
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'D:\\code\\KungFu-Crane-game-team\\node_modules\\phaser-ce\\build\\custom\\pixi.js'");

/***/ }),
/* 38 */
/* no static exports found */
/* all exports used */
/*!*******************************!*\
  !*** multi ./src/js/index.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\code\KungFu-Crane-game-team\src\js\index.js */13);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map