import Phaser from 'phaser-ce';

import WebFont from 'webfontloader';
import BackgroundMainMenu from '../objects/backgroundMainMenu';
import { loadMusic, applyMusic } from '../sound/bgmusic';
import localStorage from '../loaders/storageloader';

export default class extends Phaser.State {

  preload() {
    WebFont.load({
      google: {
        families: ['Orbitron'],
      },
      active: this.fontsLoaded,
    });

    this.game.load.audio('intro', './sounds/intro.ogg');
    this.load.image('loaderBg', './img/states/bgMainMenu.jpg');
  }

  create() {
    localStorage();
    this.music = this.game.add.audio('intro', 1, false, true);
    this.music.play();

    this.text = this.add.text(this.world.centerX, this.world.centerY - 100, 'KungFu-Crane-Game-Team      ', { font: '32px Arial', fill: '#dddddd' });
    this.text.anchor.setTo(0.5);
    this.text.alpha = 0;
    this.text.font = 'Orbitron';

    this.countdown = this.time.now;
    //---------------------------------------skip--------------------------
    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update() {
    //-------------------------------FIRST TEXT-----------------------------
    if (this.time.now > this.countdown + 2300 && this.time.now < this.countdown + 2500) {
      if(this.text.alpha < 0.95)this.text.alpha += 0.1;
      if(this.text.alpha > 1)this.text.alpha = 1;
    }
    if (this.time.now > this.countdown + 2300) {
    }
    if (this.time.now > this.countdown + 6300 && this.time.now < this.countdown + 10000) {
      this.text.y += 1;
      if(this.text.alpha > 0.03)this.text.alpha -= 0.01;
      if(this.text.alpha < 0)this.text.alpha = 0;
      if(this.text.alpha < 0.1) this.text.text = '';
    }
    //-------------------------------SEC TEXT-----------------------------
    if (this.time.now > this.countdown + 10000 && this.time.now < this.countdown + 10100){
      this.text.y = this.world.centerY - 100;
    }
    if (this.time.now > this.countdown + 10500 && this.time.now < this.countdown + 10700) {
      if(this.text.alpha < 0.95)this.text.alpha += 0.1;
      if(this.text.alpha > 1)this.text.alpha = 1;
    }
    if (this.time.now > this.countdown + 10500) {
      this.text.text = `PRESENT     `;
    }
    if (this.time.now > this.countdown + 14500 && this.time.now < this.countdown + 18000) {
      this.text.y += 1;
      if(this.text.alpha > 0.03) this.text.alpha -= 0.01;
      if(this.text.alpha < 0)this.text.alpha = 0;
      if(this.text.alpha < 0.1) this.text.text = '';
    }
    //-------------------------------third TEXT-----------------------------
    if (this.time.now > this.countdown + 18000 && this.time.now < this.countdown + 18100){
      this.text.y = this.world.centerY - 100;
    }
    if (this.time.now > this.countdown + 18600 && this.time.now < this.countdown + 18800) {
      if (this.text.alpha < 0.95)this.text.alpha += 0.1;
      if (this.text.alpha > 1)this.text.alpha = 1;
    }
    if (this.time.now > this.countdown + 18600) {
      this.text.text = `A GAME     `;
    }
    if (this.time.now > this.countdown + 22500 && this.time.now < this.countdown + 26000) {
      this.text.y += 1;
      if (this.text.alpha > 0.03) this.text.alpha -= 0.01;
      if (this.text.alpha < 0)this.text.alpha = 0;
      if (this.text.alpha < 0.1) this.text.text = '';
    }
    //-------------------------------fourth TEXT-----------------------------
    if (this.time.now > this.countdown + 26100 && this.time.now < this.countdown + 26300){
      this.text.y = this.world.centerY - 100;
    }
    if (this.time.now > this.countdown + 26600 && this.time.now < this.countdown + 26800) {
      if (this.text.alpha < 0.95)this.text.alpha += 0.1;
      if (this.text.alpha > 1)this.text.alpha = 1;
    }
    if (this.time.now > this.countdown + 26600) {
      this.text.text = `BASED ON CANVAS + PHASER-CE TECHNOLOGIES     `;
    }
    if (this.time.now > this.countdown + 30600 && this.time.now < this.countdown + 34000) {
      this.text.y += 1;
      if (this.text.alpha > 0.03) this.text.alpha -= 0.01;
      if (this.text.alpha < 0)this.text.alpha = 0;
      if (this.text.alpha < 0.1) this.text.text = '';
    }
    if (this.time.now > this.countdown + 34011) {
      this.music.pause();
      this.state.start('mainMenu');
    }
    //----------------------------skip------------------------------
    if (this.fireButton.isDown){
      this.music.pause();
      this.state.start('mainMenu');
    }
  }
}
