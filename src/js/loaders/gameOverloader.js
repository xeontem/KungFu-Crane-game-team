import Phaser from 'phaser';

import { gameState } from '../currentGameState';
import localStorage from './storageloader';

export default function () {
  this.winText.text = 'Game Over';

  if (this.time.now > this.countdown + 4000) {
    const nowScore = localStorage();

    const flag = nowScore.some(el => gameState.score > el.value);

    if (flag) {
      localStorage(gameState.score, gameState.name);
      this.levelMusic.pause();
      this.scene.start('score');
    } else {
      this.levelMusic.pause();
      this.scene.start('mainMenu');
    }
  }
}
