// import Phaser from 'phaser-ce';

export function loadMusic() {
    this.game.load.audio('main2', './sounds/mainMenu.ogg');
    this.game.load.audio('level', './sounds/levels.ogg');
    this.game.load.audio('fire', './sounds/fire.ogg');
    this.game.load.audio('explode', './sounds/explode.ogg');
    this.game.load.audio('explode2', './sounds/explode2.ogg');
    this.game.load.audio('benefit', './sounds/benefit.ogg');
}

export function applyMusic() {
    if(!this.mainMenuMusic) this.mainMenuMusic = this.game.add.audio('main2', 1, true, true);
    if(!this.levelMusic) this.levelMusic = this.game.add.audio('level', 0.3, true, true);

    switch(this.game.state.current) {
        case 'mainMenu':
            if(!this.mainMenuMusic.isPlaying) {
                this.mainMenuMusic.play();
            }
        break;
        case 'level':
            if(!this.levelMusic.isPlaying) {
                this.levelMusic.play();
            }
        break;
    }

}
