import Phaser from 'phaser-ce';

import currentGameState from '../currentGameState';
import Boss from '../objects/boss';
import config from '../config';

export default function () {
    if (this.boss) {
        if(currentGameState.level == 0){
            if(!this.bossWeapon11){
                this.bossWeapon11 = this.game.add.weapon(10, 'bossbullet');
                this.bossWeapon11.bulletSpeed = 600;
                this.bossWeapon11.fireRate = 200;
                this.bossWeapon11.fireAngle = 180;
                this.bossWeapon11.autofire = true;
                this.bossWeapon11.bulletAngleVariance = 20;
                this.bossWeapon11.trackSprite(this.boss, 80, 0, true);
                this.game.physics.enable(this.bossWeapon11, Phaser.Physics.ARCADE);
            }
        }
        if(currentGameState.level == 1 || currentGameState.level == 2 || currentGameState.level == 3 || currentGameState.level == 4){
            if(!this.bossWeapon21){
                //----------------------------------first gun------------------------------
                this.bossWeapon21 = this.game.add.weapon(5, 'bossbullet');
                this.bossWeapon21.bulletSpeed = 600;
                this.bossWeapon21.fireRate = 100;
                this.bossWeapon21.fireAngle = 180;
                this.bossWeapon21.autofire = true;
                this.bossWeapon21.trackSprite(this.boss, 80, -40, true);
                this.game.physics.enable(this.bossWeapon21, Phaser.Physics.ARCADE);
                //----------------------------------second gun-----------------------------
                this.bossWeapon22 = this.game.add.weapon(5, 'bossbullet');
                this.bossWeapon22.bulletSpeed = 600;
                this.bossWeapon22.fireRate = 100;
                this.bossWeapon22.fireAngle = 180;
                this.bossWeapon22.autofire = true;
                this.bossWeapon22.trackSprite(this.boss, 80, 40, true);
                this.game.physics.enable(this.bossWeapon22, Phaser.Physics.ARCADE);
            }
        }
    }
    if (!this.boss && currentGameState.bosstime) {
        this.boss = new Boss({
            game: this,
            x: config.gameWidth + 200,
            y: config.gameHeight - 200,
            asset: 'boss',
        });
        this.game.add.existing(this.boss);
        const tween = this.add.tween(this.boss).to(
                                    { y: 200 },
                                    2000,
                                    Phaser.Easing.Linear.None,
                                    true,
                                    0,
                                    100,
                                    true);
    }
    if(this.boss){
        this.boss.HPinfo.text = `BOSS HP: ${this.boss.HP}`;
        this.boss.rotation = game.physics.arcade.angleBetween(this.boss, this.mainPlayer);
    }
}
