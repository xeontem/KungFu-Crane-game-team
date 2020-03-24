const getInitialState = () => ({
  score: 0,
  levelscore: 0,
  scoreBossLimit: 10000,
  bosstime: false,
  bosskilled: false,
  mainPlayerKilled: false,
  mainPlayerWeapon: 1,
  level: 0,
  name: 'player',
  gameWidth: document.documentElement.clientWidth,
  gameHeight: document.documentElement.clientHeight,
  enemiesSpeed: 7,
  mainPlayerSpeed: 10,
  mainPlayerHP: 10,
  firstBossHP: 100,
  shieldDuration: 5000,
  ammoDuration: 5000,
  mouseMoveEnabled: false,
  shouldEnableMouseMove: false,
});

export const gameState = getInitialState();

export const resetGameState = newState => {
  const initialState = newState || getInitialState();
  Object.keys(gameState)
    .filter(key => ![
      'gameWidth',
      'gameHeight',
      'mouseMoveEnabled',
      'shouldEnableMouseMove',
    ].includes(key))
    .forEach(key => {
      gameState[key] = initialState[key];
    });
};

export const resetLevelState = () => {
  gameState.bosskilled = false;
  gameState.bosstime = false;
  gameState.mainPlayerKilled = false;
  gameState.levelscore = 0;
};
