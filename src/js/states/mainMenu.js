import Phaser from 'phaser-ce';

import WebFont from 'webfontloader';
import BackgroundMainMenu from '../objects/backgroundMainMenu';
import { loadMusic, applyMusic } from '../sound/bgmusic';

import currentGameState from '../currentGameState';
import config from '../config';

export default class extends Phaser.State {

    preload() {
        WebFont.load({
            google: {
                families: ['Orbitron'],
            },
            active: this.fontsLoaded,
        });
        this.load.spritesheet('start', './img/pause/start.png', 300, 80);
        this.load.spritesheet('scores', './img/pause/scores.png', 300, 80);
        this.load.image('loaderBg', './img/states/bgMainMenu.jpg');
        this.load.image('player', './img/player/player.png');
        loadMusic.apply(this);
    }

    create() {
        currentGameState.reset();
        config.reset();
        applyMusic.apply(this);

        this.background = new BackgroundMainMenu({
            game: this,
            x: 0,
            y: 0,
            width: 1024,
            height: 512,
            asset: 'loaderBg',
        });
        this.background.scale.setTo(config.gameWidth / this.background.width, config.gameHeight / this.background.height);
        this.game.add.existing(this.background);
        this.playerBack = this.game.add.sprite(this.game.world.centerX - config.gameWidth/16, this.game.world.centerY, 'player');
        this.playerBack.anchor.setTo(0.5);
        this.playerBack.scale.setTo(config.gameHeight/1050);
        this.Hawks = this.add.text(this.world.centerX, this.world.centerY - config.gameHeight/10, `Hawking Revenge `, { font: `${config.gameHeight/15}px Orbitron`, fontWeight: 'bold', fill: '#ff0' });
        this.Hawks.anchor.setTo(0.5);

        //--------------------------------------BUTTONS------------------------------------------------------------------------
        this.startButton = this.game.add.button(this.game.world.centerX, config.gameHeight - config.gameHeight/5, 'start', this.toStart, this, 1, 0, 1);
        this.startButton.scale.setTo(config.gameHeight/1050);
        this.startButton.anchor.setTo(0.5);
        this.scoreButton = this.game.add.button(this.game.world.centerX, config.gameHeight - config.gameHeight/10, 'scores', this.toScores, this, 1, 0, 1);
        this.scoreButton.scale.setTo(config.gameHeight/1050);
        this.scoreButton.anchor.setTo(0.5);
        //---------------------------------------------------------------------------------------------------------------------
        this.startGame = false;
        this.startScore = false;

    }

    update() {
        //---------------------------scale block-----------------------------------
            config.gameWidth = document.documentElement.clientWidth;
            config.gameHeight = document.documentElement.clientHeight;
            this.game.width = config.gameWidth;
            this.game.height = config.gameHeight;
        //-------------------------------------------------------------------------
        if(this.startGame || this.startScore){
            this.scoreButton.y += 12;
            if(this.scoreButton.y > config.gameHeight+30) this.startButton.y += 12;
            if(this.startButton.y > config.gameHeight+30) this.Hawks.y += 12;
            if(this.Hawks.y > config.gameHeight+30 && this.background.alpha > 0.03) this.background.alpha -= 0.02;
            if(this.background.alpha < 0.03){
                if(this.startGame) {
                    this.mainMenuMusic.pause();
                    this.state.start('createName');
                }

                if(this.startScore) this.state.start('score');
            }
        }
    }

    toStart() {
        this.countdown = this.time.now;
        this.startGame = true;
    }

    toScores() {
        this.countdown = this.time.now;
        this.startScore = true;
    }
}
