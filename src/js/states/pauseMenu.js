import { WithControlls, KEYS } from '../core/withMenuControllsState';
import { saveGame, toggleMouseControl, loadAndStartSavedGame, applyNextActiveBtnIndex } from '../controls/controls';
import { gameState } from '../currentGameState';

export function invokePauseMenu() {
  game.paused = true;
  gameState.shouldEnableMouseMove = gameState.mouseMoveEnabled;
  if (gameState.mouseMoveEnabled) {
    toggleMouseControl();
  }

  this.pauseMenuGroup = game.add.group();

  // --------------------------------------BUTTONS------------------------------------------------
  this.loopedNextActiveIndex = 0;
  this.buttonList = [
    {
      texture: 'resumeBtnTexture',
      handler: resume,
    },
    {
      texture: 'loadBtnTexture',
      handler: () => {
        loadAndStartSavedGame(this);
        resume.apply(this);
      },
    },
    {
      texture: 'saveGameBtnTexture',
      handler: saveGame,
    },
    {
      texture: 'menuBtnTexture',
      handler: toMainMenu,
    },
  ];

  this.buttonInstances = this.buttonList.map((btnData, i) => {
    const currentButton = this.game.add.button(
      game.world.centerX - 95,
      100 + (50 * i),
      btnData.texture,
      btnData.handler,
      this,
      1,
      0,
      1,
    );
    currentButton.scale.setTo(0.6);
    currentButton.anchor.setTo(0.5);
    this.pauseMenuGroup.add(currentButton);
    return currentButton;
  });
  this.buttonInstances[this.loopedNextActiveIndex].frame = 1;

  const withMenuControllsState = new WithControlls();
  withMenuControllsState.create();

  const gamepadListener = setInterval(() => {
    withMenuControllsState.update();

    if (withMenuControllsState[KEYS.CONFIRM.ONCE]) {
      this.buttonList[this.loopedNextActiveIndex].handler.apply(this);
    }
    if (withMenuControllsState[KEYS.UP.ONCE]) {
      applyNextActiveBtnIndex.call(this, true);
    }
    if (withMenuControllsState[KEYS.DOWN.ONCE]) {
      applyNextActiveBtnIndex.call(this, false);
    }
    if (withMenuControllsState[KEYS.MENU.ONCE]) {
      resume.call(this);
    }
  });

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
    this.state.start('mainMenu');
    withMenuControllsState.removeHandlers();
    clearInterval(gamepadListener);
  }
}
