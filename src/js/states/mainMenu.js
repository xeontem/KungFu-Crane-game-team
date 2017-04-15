import Phaser from 'phaser-ce';

import WebFont from 'webfontloader';
import BackgroundMainMenu from '../objects/backgroundMainMenu';
import { loadMusic, applyMusic } from '../sound/bgmusic';

import currentGameState from '../currentGameState';
import config from '../config';

export default class extends Phaser.State {

  preload() {
    WebFont.load({
      google: {
        families: ['Bangers'],
      },
      active: this.fontsLoaded,
    });

    this.load.image('loaderBg', './img/states/bgMainMenu.jpg');
    loadMusic.apply(this);
  }

  create() {
    currentGameState.reset();
    config.reset();

    this.background = new BackgroundMainMenu({
      game: this,
      x: 0,
      y: 0,
      width: config.gameWidth,
      height: 512,
      asset: 'loaderBg',
    });
    this.background.scale.setTo(config.gameHeight/this.background.height);
    this.game.add.existing(this.background);

    this.text = this.add.text(this.world.centerX, this.world.height - 16, `press space to start `, { font: 'Bangers', fontSize: '16px', fill: '#dddddd' });
    this.text.anchor.setTo(0.5);
    this.text.font = 'Bangers';

    this.text2 = this.add.text(this.world.centerX, this.world.centerY-100, `Hawking Revenge `, { font: '72px Arial', fill: '#ff0' });
    this.text2.anchor.setTo(0.5);
    this.text2.font = 'Bangers';

    applyMusic.apply(this);

    this.scoreText = this.add.text(this.world.centerX, this.world.height - 125, `Press Alt to Score `, { font: '16px Bangers', fill: '#ff0' });
    this.scoreText.anchor.setTo(0.5);

    this.startGame = false;
    this.startScore = false;

    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.score = this.game.input.keyboard.addKey(Phaser.Keyboard.ALT);
  }

  update() {
  	//---------------------------scale block-----------------------------------
		config.gameWidth = document.documentElement.clientWidth;
        config.gameHeight = document.documentElement.clientHeight;
        this.game.width = config.gameWidth;
        this.game.height = config.gameHeight;
	//-------------------------------------------------------------------------
    if (this.fireButton.isDown) {
      this.countdown = this.time.now;
      this.startGame = true;
    }
    if(this.startGame || this.startScore){
      this.text.y += 7;
      if(this.text.y > config.gameHeight+30)this.scoreText.y += 7;
      if(this.scoreText.y > config.gameHeight+30)this.text2.y += 7;
      if(this.text2.y > config.gameHeight+30 && this.background.alpha > 0.02) this.background.alpha -= 0.01;
      if(this.time.now > this.countdown + 4000){
        if(this.startGame) {
                    this.mainMenuMusic.pause();
                    this.state.start('createName');
                }
        if(this.startScore) this.state.start('score');
      }
    }

    if (this.score.isDown) {
      this.countdown = this.time.now;
      this.startScore = true;
    }

  }
}
