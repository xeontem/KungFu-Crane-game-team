import Phaser from 'phaser-ce';

import currentGameState from '../currentGameState';
import localStorage from './storageloader';

export default function () {
        this.winText.text = `Game Over`;

        if(this.time.now > this.countdown + 4000){
            let nowScore = localStorage();

            let flag = nowScore.some((el) => {
                    return currentGameState.score > el.value
            });

            if (flag) {
                localStorage(currentGameState.score, currentGameState.name)
                this.levelMusic.pause();
                this.state.start('score');
            } else {
                this.levelMusic.pause();
                this.state.start('mainMenu');
                    }
        }
}
