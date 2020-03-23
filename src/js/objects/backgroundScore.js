import Phaser from 'phaser';

export default class extends Phaser.GameObjects.TileSprite {
  constructor({ game, x, y, width, height, asset }) {
    super(game, x, y, width, height, asset);
  }
}
