import Phaser from 'phaser-ce';
import currentGameState from '../currentGameState';
import { enemyExplode, bossExplode } from '../sound/explosures';
import { Benefit } from '../objects/benefits';
import { explode, paintInRed, paintBossInRed, smoke1Player, smoke2Player, explodeEnemy } from '../loaders/animationsloader';
import config from '../config';

function randBenefit(){
    return game.rnd.integerInRange(1, 5);
}

function invokeSound(that, target) {
    if(target == 'enemy') enemyExplode.apply(that);
    else if(target == 'boss') bossExplode.apply(that);
}

function killEnemies(bullet, enemy) {
    let enemX = enemy.body.center.x;
    let enemY = enemy.body.center.y;
    enemy.kill();
    invokeSound(this, 'enemy');
    explodeEnemy.call(this, enemX, enemY);
    if(bullet != this.mainPlayerShield) bullet.kill();
    currentGameState.score += 100;
    currentGameState.levelscore += 100;
    if(currentGameState.levelscore > currentGameState.limit) currentGameState.bosstime = true;
    //------------------------benefit health----------------------------
    if(!this.benefitHealth && !this.benefitScore && !this.benefitShield && !this.benefitBurst && !this.benefitAmmo && randBenefit() == 1){
        this.benefitHealth = new Benefit({
            game: this,
            x: enemX,
            y: enemY,
            asset: 'health',
        });
        this.game.add.existing(this.benefitHealth);
    }
    //------------------------benefit score----------------------------
    if(!this.benefitHealth && !this.benefitScore && !this.benefitShield && !this.benefitBurst && !this.benefitAmmo && randBenefit() == 2){

        this.benefitScore = new Benefit({
            game: this,
            x: enemX,
            y: enemY,
            asset: 'score',
        });
        this.game.add.existing(this.benefitScore);
    }
    //------------------------benefit shield----------------------------
    if(!this.benefitHealth && !this.benefitScore && !this.benefitShield && !this.mainPlayerShield && !this.benefitBurst && !this.benefitAmmo && randBenefit() == 3){
        this.benefitShield = new Benefit({
            game: this,
            x: enemX,
            y: enemY,
            asset: 'shield',
        });
        this.game.add.existing(this.benefitShield);
    }
    if(!this.benefitHealth && !this.benefitScore && !this.benefitShield && !this.mainPlayerShield && !this.benefitBurst && !this.ammoCountdown && randBenefit() == 4){
        this.benefitBurst = new Benefit({
            game: this,
            x: enemX,
            y: enemY,
            asset: 'burst',
        });
        this.game.add.existing(this.benefitBurst);
    }
    //------------------------benefit ammo----------------------------
    if(!this.benefitHealth && !this.benefitScore && !this.benefitShield && !this.benefitAmmo && !this.benefitBurst && !this.ammoCountdown && randBenefit() == 5){
        this.benefitAmmo = new Benefit({
            game: this,
            x: enemX,
            y: enemY,
            asset: 'ammo',
        });
        this.game.add.existing(this.benefitAmmo);
    }
}

function killBoss(boss, bullet) {
    bullet.kill();
    if(boss.HP)boss.HP--;
    paintBossInRed.apply(this);
    if(boss.HP == 0){
        boss.kill();
        boss.HPinfo.text = 'BOSS HP: 0';
        invokeSound(this, 'boss');
        this.countdown = this.time.now;
        currentGameState.bosskilled = true;
        if(this.bossWeapon11){
            this.bossWeapon11.bullets.destroy();
            this.bossWeapon11 = null;
        }
        if(this.bossWeapon21){
            this.bossWeapon21.bullets.destroy();
            this.bossWeapon21 = null;
        }
        if(this.bossWeapon22){
            this.bossWeapon22.bullets.destroy();
            this.bossWeapon22 = null;
        }
        currentGameState.score += 1000;
        currentGameState.levelscore += 1000;
    }
}

function overlapEnemies(player, enemy) {

    enemy.kill();
    if(config.mainPlayerHP)config.mainPlayerHP--;
    this.paintTimer = this.time.now;
    this.mainPlayer.key = 'mainPlayerRed';
    this.mainPlayer.loadTexture('mainPlayerRed');
    paintInRed.apply(this);
    if(config.mainPlayerHP <= 2) {
        explode.apply(this);
        smoke1Player.apply(this);
    }
    if(config.mainPlayerHP <= 1) {
        smoke2Player.apply(this);
    }
    if(!config.mainPlayerHP){
        player.kill();
        currentGameState.mainPlayerKilled = true;
        this.countdown = this.time.now;
    }
    currentGameState.score += 100;
    currentGameState.levelscore += 100;
}

function overlapBoss(player, boss) {
    if(config.mainPlayerHP)config.mainPlayerHP--;
    this.paintTimer = this.time.now;
    this.mainPlayer.key = 'mainPlayerRed';
    this.mainPlayer.loadTexture('mainPlayerRed');
    if(config.mainPlayerHP <= 2) {
        explode.apply(this);
        smoke1Player.apply(this);
    }
    if(config.mainPlayerHP <= 1) {
        smoke2Player.apply(this);
    }
    if(!config.mainPlayerHP){
        player.kill();
        currentGameState.mainPlayerKilled = true;
        this.countdown = this.time.now;
    }
}

function killPlayer(player, bullet) {
    bullet.kill();
    invokeSound(this, 'enemy');
    if(player != this.mainPlayerShield){
        if(config.mainPlayerHP)config.mainPlayerHP--;
        this.paintTimer = this.time.now;
        this.mainPlayer.key = 'mainPlayerRed';
        this.mainPlayer.loadTexture('mainPlayerRed');
        if(config.mainPlayerHP <= 2) {
            explode.apply(this);
            smoke1Player.apply(this);
        }
        if(config.mainPlayerHP <= 1) {
            smoke2Player.apply(this);
        }
        if(!config.mainPlayerHP){
            player.kill();
            currentGameState.mainPlayerKilled = true;
            this.countdown = this.time.now;
        }
        explode.apply(this);
    }
}


export default function () {
//------------------------------------weaponsStandart-------------------------------------------------------------------
    this.physics.arcade.overlap(this.weapon.bullets, this.enemies, killEnemies, null, this);
    this.physics.arcade.overlap(this.weapon.bullets, this.boss, killBoss, null, this);
    //------------------------------------weaponsTriple----------------------------------------------------------
    this.physics.arcade.overlap(this.gun1.bullets, this.enemies, killEnemies, null, this);
    this.physics.arcade.overlap(this.gun1.bullets, this.boss, killBoss, null, this);
    this.physics.arcade.overlap(this.gun2.bullets, this.enemies, killEnemies, null, this);
    this.physics.arcade.overlap(this.gun2.bullets, this.boss, killBoss, null, this);
    this.physics.arcade.overlap(this.gun3.bullets, this.enemies, killEnemies, null, this);
    this.physics.arcade.overlap(this.gun3.bullets, this.boss, killBoss, null, this);
    //----------------------------------weaponsSpread------------------------------------------------------------
    this.physics.arcade.overlap(this.spreadWeapon.bullets, this.enemies, killEnemies, null, this);
    this.physics.arcade.overlap(this.spreadWeapon.bullets, this.boss, killBoss, null, this);
    //----------------------------------Main Player body collisions-------------------------------------------------
    this.physics.arcade.overlap(this.mainPlayer, this.enemies, overlapEnemies, null, this);
    if(this.boss)this.physics.arcade.overlap(this.mainPlayer, this.boss, overlapBoss, null, this);
    //-------------------------------------------first boss weapon-------------------------------------------------
    if(this.bossWeapon11){
        this.physics.arcade.overlap(this.bossWeapon11.bullets, this.mainPlayer, killPlayer, null, this);
    }
    //------------------------------------------second boss weapon-------------------------------------------------
    if(this.bossWeapon21){
        this.physics.arcade.overlap(this.bossWeapon21.bullets, this.mainPlayer, killPlayer, null, this);
    }
    if(this.bossWeapon22){
        this.physics.arcade.overlap(this.bossWeapon22.bullets, this.mainPlayer, killPlayer, null, this);
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
    if(this.benefitBurst){
        this.physics.arcade.overlap(this.mainPlayer, this.benefitBurst, this.benefitBurst.getBurst, null, this);
        if(this.benefitBurst && this.benefitBurst.x < 0)this.benefitBurst = null;
    }
    if(this.benefitAmmo){
        this.physics.arcade.overlap(this.mainPlayer, this.benefitAmmo, this.benefitAmmo.getAmmo, null, this);
        if(this.benefitAmmo && this.benefitAmmo.x < 0) this.benefitAmmo = null;
    }
    if(this.ammoCountdown){
        if(this.time.now > this.ammoCountdown + config.ammoDuration){
            currentGameState.mainPlayerWeapon = 1;
            this.ammoCountdown = null;
        }
    }

    //---------------------------------------------shieldOn---------------------------------------------------------
    if(this.mainPlayerShield){
        this.mainPlayerShield.x = this.mainPlayer.x;
        this.mainPlayerShield.y = this.mainPlayer.y;
        this.physics.arcade.overlap(this.mainPlayerShield, this.enemies, killEnemies, null, this);
        if(this.bossWeapon11)this.physics.arcade.overlap(this.bossWeapon11.bullets, this.mainPlayerShield, killPlayer, null, this);
        if(this.bossWeapon21)this.physics.arcade.overlap(this.bossWeapon21.bullets, this.mainPlayerShield, killPlayer, null, this);
        if(this.bossWeapon22)this.physics.arcade.overlap(this.bossWeapon22.bullets, this.mainPlayerShield, killPlayer, null, this);
        if(this.time.now > this.mainPlayerShield.countdown + config.shieldDuration || currentGameState.bosskilled){
            this.mainPlayerShield.kill();
            this.mainPlayerShield = null;
        }
    }
}
