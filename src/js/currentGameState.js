export default {
    score: 0,
    levelscore: 0,
    limit: 10000,
    bosstime: false,
    bosskilled: false,
    mainPlayerKilled: false,
    mainPlayerWeapon: 1,
    level: 0,
    name: 'player',
    reset: function() {
        this.score = 0,
        this.levelscore = 0,
        this.limit = 10000,
        this.bosstime = false,
        this.bosskilled = false,
        this.mainPlayerKilled = false,
        this.mainPlayerWeapon = 1,
        this.level = 0,
        this.name = 'player'
    }
};
