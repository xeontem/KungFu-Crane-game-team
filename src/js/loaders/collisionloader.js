import Phaser from 'phaser-ce';
import currentGameState from '../currentGameState';

function killEnemies(bullet, enemy) {
  this.enemies.remove(enemy, true);
  bullet.kill();
  currentGameState.score += 100;
  currentGameState.levelscore += 100;
}

function killBoss(boss, bullet) {
  bullet.kill();
  if(boss.HP)boss.HP--;
  if(boss.HP == 0){
    boss.kill();
    boss.endLevel = this.time.now;
    currentGameState.bosskilled = true;
    this.bossWeapon.autofire = false;
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

