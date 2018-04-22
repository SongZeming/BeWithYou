let audio = require('audio');
let event = require('event');
const GameType = cc.Enum({
	beWithYou: 0,
});

cc.Class({
    extends: cc.Component,

    properties: {
       gameType: {
            type: GameType,
            default: GameType.beWithYou,
            displayName: '游戏类型',
        },
        choosePrefab: cc.Prefab,
        setPrefab: cc.Prefab,
    },

    onLoad: function () {
        audio.setMusicVolume(0);
        if (cc.sys.isNative) {
            this.node.getChildByName('lauch').active = true;
        }
        event.add('mainRePlayGame', 'RePlayGame', function() {
            audio.setMusicVolume(1);
            this.node.getChildByName('lauch').active = false;
        }.bind(this));
        require('jsphonesever').send();

    	switch(this.gameType) {
            case GameType.beWithYou:
                this.onBeWithYouFunc();
                break;
            default:
                break;
        }
    },

    onDestroy() {
        event.remove('mainRePlayGame');
    },

    onBeWithYouFunc() {
        audio.playMusic('beWithYou', 'mainBack.mp3', true);
    	this.node.getChildByName('btnStart').on('click', function() {
            audio.playSound('common', 'sound_anniu.mp3');
            cc.instantiate(this.choosePrefab).parent = this.node;
    	}.bind(this));
        this.node.getChildByName('btnSet').on('click', function() {
            audio.playSound('common', 'sound_anniu.mp3');
            cc.instantiate(this.setPrefab).parent = this.node;
        }.bind(this));
        this.node.getChildByName('btnQuit').on('click', function() {
            cc.game.end();
        }.bind(this));
    },


});