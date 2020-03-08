import Phaser from 'phaser-ce';
import createInput from '../loaders/inputloader';
import { gameState, resetGameState } from '../currentGameState';
import { anyGamepadKeyPressed } from '../controls/controls';

export default class extends Phaser.State {
  preload() {
    const { div, input } = createInput(this, gameState.name);
    this.div = div;
    this.input = input;
  }

  create() {
    this.enterBtn = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  }

  update() {
    if (this.enterBtn.repeats === 1 || anyGamepadKeyPressed()) {
      gameState.name = this.input.value;
      document.body.removeChild(this.div);
      resetGameState();
      this.state.start('level');
    }
  }
}
