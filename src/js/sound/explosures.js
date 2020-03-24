import Phaser from 'phaser';

export function shot() {
  const music = this.add.audio('fire', 0.09, false, true);
  music.allowMultiple = false;
  music.play();
}

export function enemyExplode() {
  const music = this.add.audio('explode', 0.1, false, true);
  music.allowMultiple = false;
  music.play();
}

export function bossExplode() {
  const music = this.add.audio('explode', 1, false, true);
  music.allowMultiple = false;
  music.play();
}

export function getCollectable() {
  const music = this.add.audio('benefit', 1, false, true);
  music.allowMultiple = false;
  music.play();
}
