import Phaser from 'phaser-ce';

import currentGameState from '../currentGameState';

export default function () {
	if(currentGameState.mainPlayerKilled){
		this.winText.text = `Game Over`;
		if(this.time.now > this.countdown+4000){
			this.levelMusic.pause();
			this.state.start('mainMenu');
		}
	}
}
