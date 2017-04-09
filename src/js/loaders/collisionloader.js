import Phaser from 'phaser-ce';
import currentGameState from '../currentGameState';
import { enemyExplode, bossExplode } from '../sound/explosures';
import { Benefit } from '../objects/benefits';
import config from '../config';

function randBenefit(){
  return game.rnd.integerInRange(1, 3);
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
  if(bullet != this.mainPlayerShield) bullet.kill();
  currentGameState.score += 100;
  currentGameState.levelscore += 100;
  //------------------------benefit health----------------------------
  if(!this.benefitHealth && !this.benefitScore && !this.benefitShield && randBenefit() == 1){
    this.benefitHealth = new Benefit({
      game: this,
      x: enemX,
      y: enemY,
      asset: 'health',
    });
    this.game.add.existing(this.benefitHealth);
  }
  //------------------------benefit score----------------------------
  if(!this.benefitHealth && !this.benefitScore && !this.benefitShield && randBenefit() == 2){
    this.benefitScore = new Benefit({
      game: this,
      x: enemX,
      y: enemY,
      asset: 'score',
    });
    this.game.add.existing(this.benefitScore);
  }

  //------------------------benefit shield----------------------------
  if(!this.benefitHealth && !this.benefitScore && !this.benefitShield && !this.mainPlayerShield && randBenefit() == 3){
    this.benefitShield = new Benefit({
      game: this,
      x: enemX,
      y: enemY,
      asset: 'shield',
    });
    this.game.add.existing(this.benefitShield);
  }

  //------------------------benefit ammo----------------------------
}

function killBoss(boss, bullet) {
  bullet.kill();
  if(boss.HP)boss.HP--;
  if(boss.HP == 0){
    boss.kill();

    invokeSound(this, 'boss');
    this.countdown = this.time.now;
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
    currentGameState.mainPlayerKilled = true;
    this.countdown = this.time.now;
  }
  currentGameState.score += 100;
  currentGameState.levelscore += 100;
}

function killPlayer(player, bullet) {
  bullet.kill();
  //invokeSound(this, 'enemy');//----------------------------------need to fix----------------
  if(player != this.mainPlayerShield){
    if(player.HP)player.HP--;
    if(!player.HP){
      player.kill();
      currentGameState.mainPlayerKilled = true;
      this.countdown = this.time.now;
    }
  }  
}


export default function () {
  this.physics.arcade.overlap(this.weapon.bullets, this.enemies, killEnemies, null, this);
  this.physics.arcade.overlap(this.weapon.bullets, this.boss, killBoss, null, this);
  this.physics.arcade.overlap(this.mainPlayer, this.enemies, overlapEnemies, null, this);
  if(this.bossWeapon){
    this.physics.arcade.overlap(this.bossWeapon.bullets, this.mainPlayer, killPlayer, null, this);
  }  
  //-------------------------------Benefits Collisions----------------------------------------------------------  
  if(this.benefitHealth){
    this.physics.arcade.overlap(this.mainPlayer, this.benefitHealth, this.benefitHealth.getHealth, null, this);
    if(this.benefitHealth && this.benefitHealth.x < 0)this.benefitHealth = null;
  }

  if(this.benefitScore){
    this.physics.arcade.overlap(this.mainPlayer, this.benefitScore, this.benefitScore.getScore, null, this);
    if(this.benefitScore && this.benefitScore.x < 0)this.benefitScore = null;
  }
  if(this.benefitShield){
    this.physics.arcade.overlap(this.mainPlayer, this.benefitShield, this.benefitShield.getShield, null, this);
    if(this.benefitShield && this.benefitShield.x < 0)this.benefitShield = null;
  }
  //---------------------------------------------shieldOn---------------------------------------------------------
  if(this.mainPlayerShield){
    this.mainPlayerShield.x = this.mainPlayer.x;
    this.mainPlayerShield.y = this.mainPlayer.y;
    this.physics.arcade.overlap(this.mainPlayerShield, this.enemies, killEnemies, null, this);
    if(this.bossWeapon)this.physics.arcade.overlap(this.bossWeapon.bullets, this.mainPlayerShield, killPlayer, null, this);
    if(this.time.now > this.mainPlayerShield.countdown + config.shieldDuration || currentGameState.bosskilled){
      this.mainPlayerShield.kill();
      this.mainPlayerShield = null;
    } 
  }
}

