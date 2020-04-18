import Phaser from 'phaser-ce';

import { gameState } from '../currentGameState';
import { userData, setLocalUsers, setCloudScore, getLocalUsers, getLocalUser } from '../core/firebase.service';

export default function () {
  this.winText.text = 'Game Over';

  if (this.time.now > this.countdown + 4000) {
    if (userData.uid) {
      if (gameState.score > userData.score) {
        setCloudScore(userData.uid, gameState.score);
      }
    } else {
      const localUsers = getLocalUsers();
      const localUser = getLocalUser(userData.nickName);
      if (localUser) {
        if (gameState.score > localUser.score) {
          localUsers.forEach(user => {
            if (user.nickName === userData.nickName) {
              user.score = gameState.score;
            }
          });
        }
      } else {
        localUsers.push({
          nickName: userData.nickName,
          score: gameState.score,
        });
      }
      setLocalUsers(localUsers);
    }
    this.levelMusic.pause();
    this.state.start('score');
  }
}
