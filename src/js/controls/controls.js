import { gameState, resetGameState } from '../currentGameState';
import { fire } from '../sound/explosures';

export function applyNextActiveBtnIndex(isUp) {
  const currentActiveIndex = this.buttonInstances.reduce((activeInd, btn, index) => {
    return btn.frame === 1 ? index : activeInd;
  }, 0);
  const nextActiveIndex = isUp ? currentActiveIndex - 1 : currentActiveIndex + 1;
  this.loopedNextActiveIndex = (nextActiveIndex < 0)
    ? this.buttonInstances.length - 1
    : (nextActiveIndex > this.buttonInstances.length - 1)
      ? 0
      : nextActiveIndex;
  this.buttonInstances.forEach((btn, i) => {
    btn.frame = i === this.loopedNextActiveIndex ? 1 : 0;
  });
}

let gamepadIndex = null;
export const getGamepad = () => navigator.getGamepads()[gamepadIndex];
window.addEventListener('gamepadconnected', (e) => {
  console.log('gamepad connected', e.gamepad);
  gamepadIndex = e.gamepad.index;
});

export const anyGamepadKeyPressed = () => {
  const gamepad = getGamepad();
  return gamepad && gamepad.buttons.some(b => b.pressed);
};

export const gamepadVibrate = () => {
  const gamepad = getGamepad();
  if (gamepad && gamepad.vibrationActuator) {
    gamepad.vibrationActuator.playEffect('dual-rumble', {
      startDelay: 0,
      duration: 1000,
      weakMagnitude: 1.0,
      strongMagnitude: 1.0,
    });
  }
};

export const toggleMouseControl = mouseState => {
  if (!game.paused) {
    gameState.mouseMoveEnabled = (mouseState === false || mouseState === false)
      ? mouseState : !gameState.mouseMoveEnabled;
    document.body.style.cursor = gameState.mouseMoveEnabled ? 'none' : 'default';
  }
};

export const getDebouncedCheck = () => {
  let prevPressed = null;
  return nextPressed => {
    const currentCheck = [undefined, false].includes(prevPressed) && nextPressed;
    prevPressed = nextPressed;
    return currentCheck;
  };
};

export function addMouseControll() {
  const move = () => {
    if (gameState.mouseMoveEnabled) {
      if (this.mainPlayer && this.mainPlayer.body && this.key === 'level') {
        if (game.physics.arcade.distanceToPointer(this.mainPlayer) > 14) {
          game.physics.arcade.moveToPointer(this.mainPlayer, gameState.mainPlayerSpeed);
        } else {
          this.mainPlayer.body.velocity.setTo(0, 0);
        }
      } else {
        toggleMouseControl(false);
        game.canvas.removeEventListener('click', toggleMouseControl);
        game.canvas.removeEventListener('pointermove', move);
      }
    }
  };

  game.canvas.addEventListener('click', toggleMouseControl);
  game.canvas.addEventListener('pointermove', move);
}

export const loadAndStartSavedGame = context => {
    resetGameState(JSON.parse(localStorage.getItem('GAME_STATE')));
    context.scene.start('level');
    console.log('game loaded');
};

export const saveGame = () => {
    localStorage.setItem('GAME_STATE', JSON.stringify(gameState));
    console.log('game saved');
};
