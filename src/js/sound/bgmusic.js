export function loadMusic() {
  this.load.audio('level', './sounds/levels.ogg');
  this.load.audio('fire', './sounds/fire.ogg');
  this.load.audio('explode', './sounds/explode.ogg');
  this.load.audio('explode2', './sounds/explode2.ogg');
  this.load.audio('benefit', './sounds/benefit.ogg');
}

export function applyMusic() {
  this.levelMusic = this.sound.add('level');
  this.levelMusic.play();
}
