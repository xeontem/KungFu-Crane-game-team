import Phaser from 'phaser-ce';
import config from '../config';
import gameOverloader from '../loaders/gameOverloader';

export function invokePauseMenu() {
  if (game.paused) {
    resume.apply(this);
  } else {
    game.paused = true;
    this.pauseMenuGroup = game.add.group();

    this.resumeButton = game.add.button(game.world.centerX - 95, 100, 'button', resume.bind(this), this, 1, 0, 1);
    this.mainMenuButton = game.add.button(game.world.centerX - 95, 250, 'menuButton', toMainMenu.bind(this), this, 1, 0, 1);
    this.reloadButton = game.add.button(game.world.centerX - 95, 150, 'reload', reload.bind(this), this, 1, 0, 1);

    this.resumeButton.scale.setTo(0.6);
    this.mainMenuButton.scale.setTo(0.6);
    this.reloadButton.scale.setTo(0.6);

    this.pauseMenuGroup.add(this.resumeButton);
    this.pauseMenuGroup.add(this.mainMenuButton);
    this.pauseMenuGroup.add(this.reloadButton);
  }
}

export function resume() {
  game.world.remove(this.pauseMenuGroup);
  this.pauseMenuGroup.destroy();
  game.paused = false;
}

function toMainMenu() {
  game.world.remove(this.pauseMenuGroup);
  this.pauseMenuGroup.destroy();
  game.paused = false;
  this.state.start('mainMenu');
}

function reload() {
  game.world.remove(this.pauseMenuGroup);
  this.pauseMenuGroup.destroy();
  game.paused = false;
}
