import Phaser from 'phaser-ce';
import currentGameState from '../currentGameState';
import { enemyExplode, bossExplode } from '../sound/explosures';
import { Benefit } from '../objects/benefits';

function randBenefit(){
  return game.rnd.integerInRange(1, 2);
}

function invokeSound(that, target) {
  if(target == 'enemy') {
      enemyExplode.apply(that);
  } else if(target == 'boss') {
      bossExplode.apply(that);
  }
}

function killEnemies(bullet, enemy) {
  let enemX = enemy.body.center.x;
  let enemY = enemy.body.center.y;
  enemy.kill();
  invokeSound(this, 'enemy');
  bullet.kill();
  currentGameState.score += 100;
  currentGameState.levelscore += 100;
  //------------------------benefit health----------------------------
  if(!this.benefitHealth && randBenefit() == 1 && !this.benefitScore){
    this.benefitHealth = new Benefit({
      game: this,
      x: enemX,
      y: enemY,
      asset: 'health',
    });
    this.game.add.existing(this.benefitHealth);
  }
  //------------------------benefit ammo----------------------------

  //------------------------benefit shield----------------------------

  //------------------------benefit score----------------------------
  if(!this.benefitScore && randBenefit() == 2 && !this.benefitHealth){
    this.benefitScore = new Benefit({
      game: this,
      x: enemX,
      y: enemY,
      asset: 'score',
    });
    this.game.add.existing(this.benefitScore);
  }
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
 // invokeSound(this, 'enemy');
  player.HP--;
  if(!player.HP){
    player.kill();
  }
}


export default function () {
  this.physics.arcade.overlap(this.weapon.bullets, this.enemies, killEnemies, null, this);
  this.physics.arcade.overlap(this.weapon.bullets, this.boss, killBoss, null, this);
//--------------------------------------------------------------------------------------------------------------
  this.physics.arcade.overlap(this.gun1.bullets, this.enemies, killEnemies, null, this);
  this.physics.arcade.overlap(this.gun1.bullets, this.boss, killBoss, null, this);
  this.physics.arcade.overlap(this.gun2.bullets, this.enemies, killEnemies, null, this);
  this.physics.arcade.overlap(this.gun2.bullets, this.boss, killBoss, null, this);
  this.physics.arcade.overlap(this.gun3.bullets, this.enemies, killEnemies, null, this);
  this.physics.arcade.overlap(this.gun3.bullets, this.boss, killBoss, null, this);
//--------------------------------------------------------------------------------------------------------------
  this.physics.arcade.overlap(this.spreadWeapon.bullets, this.enemies, killEnemies, null, this);
  this.physics.arcade.overlap(this.spreadWeapon.bullets, this.boss, killBoss, null, this);
//--------------------------------------------------------------------------------------------------------------

  this.physics.arcade.overlap(this.mainPlayer, this.enemies, overlapEnemies, null, this);
  if(this.bossWeapon){
    this.physics.arcade.collide(this.bossWeapon.bullets, this.mainPlayer, killPlayer);
  }  
  //-------------------------------Benefits Collisions----------------------------------------------------------  
  if(this.benefitHealth){
    this.physics.arcade.collide(this.mainPlayer, this.benefitHealth, this.benefitHealth.getHealth, null, this);
    if(this.benefitHealth && this.benefitHealth.x < 0)this.benefitHealth = null;
  }

  if(this.benefitScore){
    this.physics.arcade.collide(this.mainPlayer, this.benefitScore, this.benefitScore.getScore, null, this);
    if(this.benefitScore && this.benefitScore.x < 0)this.benefitScore = null;
  }
}

