import { getGamepad, saveGame, toggleMouseControl, loadAndStartSavedGame, applyNextActiveBtnIndex } from '../controls/controls';
import { gameState } from '../currentGameState';

export function invokePauseMenu() {
  gameState.shouldEnableMouseMove = gameState.mouseMoveEnabled;
  if (gameState.mouseMoveEnabled) {
    toggleMouseControl();
  }

  if (game.paused) {
    resume.apply(this);
  } else {
    game.paused = true;
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

    const keydownHandler = e => {
      if (e.key === 'ArrowUp') {
        applyNextActiveBtnIndex.call(this, true);
      }

      if (e.key === 'ArrowDown') {
        applyNextActiveBtnIndex.call(this, false);
      }

      if (e.key === 'Enter') {
        this.buttonList[this.loopedNextActiveIndex].handler.apply(this);
      }
    };

    document.addEventListener('keydown', keydownHandler);
    const gamepadListener = setInterval(() => {
      const gamepad = getGamepad();
      if (gamepad && gamepad.buttons[12].pressed) {
        applyNextActiveBtnIndex.call(this, true);
      }
      if (gamepad && gamepad.buttons[13].pressed) {
        applyNextActiveBtnIndex.call(this, false);
      }
      if (gamepad && gamepad.buttons[2].pressed) {
        this.buttonList[this.loopedNextActiveIndex].handler.apply(this);
      }
    });

    function resume() {
      game.world.remove(this.pauseMenuGroup);
      this.pauseMenuGroup.destroy();
      game.paused = false;

      if (!gameState.shouldEnableMouseMove) {
        toggleMouseControl();
      }
      document.removeEventListener('keydown', keydownHandler);
      clearInterval(gamepadListener);
    }

    function toMainMenu() {
      game.world.remove(this.pauseMenuGroup);
      this.pauseMenuGroup.destroy();
      game.paused = false;
      this.levelMusic.pause();
      toggleMouseControl(true);
      this.state.start('mainMenu');
      document.removeEventListener('keydown', keydownHandler);
      clearInterval(gamepadListener);
    }
  }
}
