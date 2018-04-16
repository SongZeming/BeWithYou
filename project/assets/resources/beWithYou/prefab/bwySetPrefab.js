let audio = require('audio');
let utils = require('utils');
cc.Class({
    extends: cc.Component,

    properties: {
        btnMusic: cc.Node,
        btnMusicSp: cc.Sprite,
        btnSound: cc.Node,
        btnSoundSp: cc.Sprite,
        btnClose: cc.Node,
    },

    onLoad () {
        utils.scaleAnimtion('in', this.node);

        let musicVolume = utils.getLocalStorage('musicVolume');
        let soundVolume = utils.getLocalStorage('soundVolume');
        musicVolume = musicVolume ? musicVolume : (musicVolume === 0 ? 0 : 1);
        soundVolume = soundVolume ? soundVolume : (soundVolume === 0 ? 0 : 1);

        let spFrame = function(sprite, volume) {
            cc.loader.loadRes('beWithYou/img/main', cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                let name = volume ? 'on' : 'off';
                let frame = atlas.getSpriteFrame(name);
                sprite.spriteFrame = frame;
            }.bind(this));
        }.bind(this);

        spFrame(this.btnMusicSp, musicVolume);
        spFrame(this.btnSoundSp, soundVolume);

        this.btnMusic.on('click', function() {
            audio.playSound('common', 'sound_anniu.mp3');
            musicVolume = musicVolume ? 0 : 1;
            spFrame(this.btnMusicSp, musicVolume);
            audio.setMusicVolume(musicVolume);
        }.bind(this));
        this.btnSound.on('click', function () {
            audio.playSound('common', 'sound_anniu.mp3');
            soundVolume = soundVolume ? 0 : 1;
            spFrame(this.btnSoundSp, soundVolume);
            utils.setLocalStorage('soundVolume', soundVolume);
            audio.setSoundVolume(soundVolume);
        }.bind(this));
        this.btnClose.on('click', function() {
            audio.playSound('common', 'sound_anniu.mp3');
            utils.setLocalStorage('musicVolume', musicVolume);
            utils.setLocalStorage('soundVolume', soundVolume);
            utils.scaleAnimtion('out', this.node, function() {
                this.node.destroy();
            }.bind(this));
        }.bind(this));
    },

});
