export default {
  score: 0,
  levelscore: 0,
  limit: 10000,
  bosstime: false,
  bosskilled: false,
  mainPlayerKilled: false,
  level: 0,
  name: 'player',
  reset: function(){
    this.score = 0,
    this.levelscore = 0,
    this.limit = 10000,
    this.bosstime = false,
    this.bosskilled = false,
    this.mainPlayerKilled = false,
    this.level = 0,
    this.name = 'player'
  }
};
