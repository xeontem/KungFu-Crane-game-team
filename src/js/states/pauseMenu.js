import Phaser from 'phaser-ce';
import config from '../config';
import gameOverloader from '../loaders/gameOverloader';

export function invokePauseMenu() {
    if(!this.game.paused === true) {
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

export function resume() {
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
