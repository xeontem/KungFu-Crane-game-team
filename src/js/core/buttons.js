export const BUTTONS = {
  BACK: {
    title: 'Back',
  },
  RESUME: {
    title: 'Resume',
  },
  LOAD: {
    title: 'Load',
  },
  LOGIN: {
    title: 'Login',
  },
  MAIN_MENU: {
    title: 'Main menu',
  },
  RELOAD: {
    title: 'Reload',
  },
  SAVE: {
    title: 'Save',
  },
  SCORES: {
    title: 'Scores',
  },
  START: {
    title: 'Start',
  },
};

const commonBtnStyle = {
  fontSize: '32px',
  fontFamily: 'orbitron',
  fixedWidth: 300,
  // fixedHeight: 80,
  padding: 15,
  align: 'center',
  cursor: 'pointer',
};

export const inactiveBtnStyle = {
  backgroundColor: '#00365f',
  color: '#FFEB3B',
};

export const activeBtnStyle = {
  backgroundColor: '#01497f',
  color: '#ff0',
}

export const withHandler = (btn, handler) => ({ ...btn, handler });

export const createButton = (title, x, y, pointerdown, pointerover, scene) => {
  const clickButton = scene.add.text(x, y, title, { ...commonBtnStyle, ...inactiveBtnStyle })
    .setInteractive({ useHandCursor: true  })
    .on('pointerdown', (...args) => {
      pointerdown.apply(scene, [clickButton, ...args]);
    })
    .on('pointerover', (...args) => {
      pointerover.apply(scene, [clickButton, ...args]);
    })
    .on('pointerout', () => {

    });

  return clickButton;
};
