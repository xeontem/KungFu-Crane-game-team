import Phaser from 'phaser-ce';
import createInput from '../loaders/inputloader';
import currentGameState from '../currentGameState';

export default class extends Phaser.State {
  preload() {
    const { div, input } = createInput(this);
    this.div = div;
    this.input = input;
  }

  create() {
    this.enterBtn = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  }

  update() {
    const gamepad = navigator.getGamepads()[0];
    if (this.enterBtn.isDown || (gamepad && gamepad.buttons.some(b => b.pressed))) {
      currentGameState.name = this.input.value || 'player';
      document.body.removeChild(this.div);
      this.state.start('level');
    }
  }
}
