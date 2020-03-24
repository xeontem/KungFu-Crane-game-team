import { WithControlls, KEYS } from '../core/withMenuControllsState';
import createInput from '../loaders/inputloader';
import { gameState, resetGameState } from '../currentGameState';

export default class extends WithControlls {
  preload() {
    super.preload();
    const { div, input } = createInput(this, gameState.name);
    this.div = div;
    this.inputEl = input;
  }

  create() {
    super.create();
  }

  update() {
    super.update();
    if (this[KEYS.CONFIRM.DOWN_ONCE]) {
      gameState.name = this.inputEl.value;
      document.body.removeChild(this.div);
      resetGameState();
      this.scene.start('level');
    }
  }
}
