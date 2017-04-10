export default {
    gameWidth: 1024,
    gameHeight: 512,
    enemiesSpeed: 7,
    mainPlayerSpeed: 350,
    mainPlayerHP: 50,
    firstBossHP: 50,
    shieldDuration: 5000,
    ammoDuration: 5000,
    onOff: false,
    weapons: [],
    currentWeapon: 0,
    reset: function(){
        this.gameWidth = 1024,
        this.gameHeight = 512,
        this.enemiesSpeed = 7,
        this.mainPlayerSpeed = 350,
        this.mainPlayerHP = 3,
        this.firstBossHP = 50,
        this.shieldDuration = 5000,
        this.ammoDuration = 5000,
        this.onOff = false,
        this.weapons = [],
        this.currentWeapon = 0
    }
};
