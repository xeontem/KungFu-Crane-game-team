import Phaser from 'phaser-ce';
import createInput from '../loaders/inputloader';

export default class extends Phaser.State {
    preload () {
        createInput(this);
    }

    create() {
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    }

    update() {
        if (this.fireButton.isDown) {
            this.state.start('level');
        }
    }
}
