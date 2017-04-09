// import Phaser from 'phaser-ce';

export function loadMusic() {
	this.game.load.audio('main2', './sounds/mainMenu.ogg');
	this.game.load.audio('level', './sounds/levels.ogg');
	this.game.load.audio('fire', './sounds/fire.ogg');
	this.game.load.audio('explode', './sounds/explode.ogg');
	this.game.load.audio('explode2', './sounds/explode2.ogg');
}

export function applyMusic() {
	if (this.game.state.current === 'mainMenu') {
		this.music = this.game.add.audio('main2', 1, true, true);
		this.music.play();
	} else {
		this.game.cache.removeSound('main2');
		// this.music.pause();
		this.music = this.game.add.audio('level', 0.3, true, true);
		this.music.play();
	}
}
