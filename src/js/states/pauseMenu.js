import { WithControlls } from '../core/withMenuControllsState';
import { saveGame, toggleMouseControl, loadAndStartSavedGame } from '../controls/controls';
import { gameState } from '../currentGameState';
import { BUTTONS } from '../core/buttons';

export function invokePauseMenu() {
  game.paused = true;
  gameState.shouldEnableMouseMove = gameState.mouseMoveEnabled;
  if (gameState.mouseMoveEnabled) {
    toggleMouseControl();
  }

  this.pauseMenuGroup = game.add.group();

      // game.world.centerX - 95,
      // 100 + (50 * i),

  const withMenuControllsState = new WithControlls();
  withMenuControllsState.preload([
    BUTTONS.RESUME(resume),
    BUTTONS.LOAD(load),
    BUTTONS.SAVE(saveGame),
    BUTTONS.MAIN_MENU(toMainMenu),
  ]);
  withMenuControllsState.create();

  const gamepadListener = setInterval(() => {
    withMenuControllsState.update();


  });

  function load() {
    loadAndStartSavedGame(this);
    resume.apply(this);
  }

  function resume() {
    game.world.remove(this.pauseMenuGroup);
    this.pauseMenuGroup.destroy();
    game.paused = false;

    if (!gameState.shouldEnableMouseMove) {
      toggleMouseControl();
    }
    withMenuControllsState.removeHandlers();
    clearInterval(gamepadListener);
  }

  function toMainMenu() {
    game.world.remove(this.pauseMenuGroup);
    this.pauseMenuGroup.destroy();
    game.paused = false;
    this.levelMusic.pause();
    toggleMouseControl(true);
    this.scene.start('mainMenu');
    withMenuControllsState.removeHandlers();
    clearInterval(gamepadListener);
  }
}
