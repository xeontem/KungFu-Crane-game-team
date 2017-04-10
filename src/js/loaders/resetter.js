import currentGameState from '../currentGameState';


export default function () {
    currentGameState.bosskilled = false;
    currentGameState.bosstime = false;
    currentGameState.mainPlayerKilled = false;
    currentGameState.levelscore = 0;
    this.boss = null;
    this.bossWeapon11 = null;
    this.bossWeapon21 = null;
    this.bossWeapon22 = null;
}
