import { WithControlls, KEYS } from '../core/withMenuControllsState';
import { gameState, resetGameState } from '../currentGameState';
import { userData, setCloudNickName, getLocalUsers, getLocalUser, setLocalUsers } from '../core/firebase.service';

export default class extends WithControlls {
  preload() {
    super.preload();
    const body = document.getElementById('game');
    const div = document.createElement('div');
    const title = document.createElement('p');
    const input = document.createElement('input');

    title.innerHTML = 'ENTER YOUR NAME';
    input.setAttribute('autofocus', 'true');
    input.value = userData.nickName || 'player';
    div.style.cssText = `width: ${gameState.gameWidth - 10}px; height: ${gameState.gameHeight - 10}px;`;
    div.appendChild(title);
    div.appendChild(input);
    body.appendChild(div);
    this.div = div;
    this.input = input;
  }

  create() {
    super.create();
  }

  update() {
    super.update();
    if (this[KEYS.CONFIRM.ONCE]) {
      if (userData.uid) {
        setCloudNickName(userData.uid, this.input.value);
      } else {
        userData.nickName = this.input.value;
        const localUsers = getLocalUsers();
        const sameUser = getLocalUser(userData.nickName);
        if (!sameUser) {
          localUsers.push({
            nickName: this.input.value,
            score: '0',
          });
          setLocalUsers(localUsers);
        }
      }
      document.body.removeChild(this.div);
      resetGameState();
      this.state.start('level');
    }
  }
}
