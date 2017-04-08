// import Phaser from 'phaser-ce';

export function loadMusic() {
  this.game.load.audio('main', './sounds/mainMenu.ogg');
  this.game.load.audio('level', './sounds/levels.ogg');
  this.game.load.audio('fire', './sounds/fire.ogg');
}

export function applyMusic() {
  if (this.game.state.current === 'mainMenu') {
    const music = this.game.add.audio('main', 1, true, true);
    music.play();
  } else {
    this.game.cache.removeSound('main');
    const music = this.game.add.audio('level', 0.3, true, true);
    music.play();
  }
}
