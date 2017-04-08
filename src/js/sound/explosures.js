// import Phaser from 'phaser-ce';

export default function fire() {
  const music = this.game.add.audio('fire', 1, false, true);
  music.allowMultiple = false;
  music.play();
}
