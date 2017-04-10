import Phaser from 'phaser-ce';

export function shot() {
    const music = this.game.add.audio('fire', 0.09, false, true);
    music.allowMultiple = false;
    music.play();
}

export function enemyExplode() {
    const music = this.game.add.audio('explode', 0.1, false, true);
    music.allowMultiple = false;
    music.play();
}

export function bossExplode() {
    const music = this.game.add.audio('explode', 1, false, true);
    music.allowMultiple = false;
    music.play();
}

export function getCollectable() {
    const music = this.game.add.audio('benefit', 1, false, true);
    music.allowMultiple = false;
    music.play();
}
