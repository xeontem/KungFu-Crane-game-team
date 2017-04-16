export default {
    gameWidth: 1024,
    gameHeight: 512,
    enemiesSpeed: 7,
    mainPlayerSpeed: 350,
    mainPlayerHP: 3,
    firstBossHP: 100,
    shieldDuration: 5000,
    ammoDuration: 5000,
    onOff: false,
    weapons: [],
    currentWeapon: 0,
    reset: function(){
        this.enemiesSpeed = 7,
        this.mainPlayerSpeed = 350,
        this.mainPlayerHP = 3,
        this.firstBossHP = 100,
        this.shieldDuration = 5000,
        this.ammoDuration = 5000,
        this.onOff = false,
        this.weapons = [],
        this.currentWeapon = 0
    }
};
