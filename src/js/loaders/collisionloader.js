import Phaser from 'phaser-ce';
import currentGameState from '../currentGameState';
import { enemyExplode, bossExplode } from '../sound/explosures';

function invokeSound(that, target) {
  if(target == 'enemy') {
      enemyExplode.apply(that);
  } else if(target == 'boss') {
      bossExplode.apply(that);
  }
}

function killEnemies(bullet, enemy) {
  enemy.kill();
  invokeSound(this, 'enemy');
  bullet.kill();
  currentGameState.score += 100;
  currentGameState.levelscore += 100;
}

function killBoss(boss, bullet) {
  bullet.kill();
  if(boss.HP)boss.HP--;
  if(boss.HP == 0){
    boss.kill();
    invokeSound(this, 'boss');
    boss.endLevel = this.time.now;
    currentGameState.bosskilled = true;
    this.bossWeapon.bullets.destroy();
    currentGameState.score += 1000;
    currentGameState.levelscore += 1000;
  }
}

function overlapEnemies(player, enemy) {
  enemy.kill();
  if(player.HP)player.HP--;
  
  if(!player.HP){
    player.kill();
  }
  currentGameState.score += 100;
  currentGameState.levelscore += 100;
}

function killPlayer(player, bullet) {
  bullet.kill();
  invokeSound(this, 'enemy');
  player.HP--;
  if(!player.HP){
    player.kill();
  }
}


export default function () {
  this.physics.arcade.overlap(this.weapon.bullets, this.enemies, killEnemies, null, this);
  this.physics.arcade.overlap(this.weapon.bullets, this.boss, killBoss, null, this);
  this.physics.arcade.overlap(this.mainPlayer, this.enemies, overlapEnemies, null, this);
  if(this.bossWeapon){
    this.physics.arcade.collide(this.bossWeapon.bullets, this.mainPlayer, killPlayer);
  }  
}

