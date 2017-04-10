import Phaser from 'phaser-ce';

export default class extends Phaser.TileSprite {
  constructor({ game, x, y, width, height, asset }) {
    super(game, x, y, width, height, asset);
  }
}
