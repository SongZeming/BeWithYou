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
        }
    },

    onLoad: function () {
    	switch(this.gameType) {
            case GameType.beWithYou:
                this.onBeWithYouFunc();
                break;
            default:
                break;
        }
    },

    onBeWithYouFunc() {
    	this.node.getChildByName('btnStart').on('click', function() {
    		cc.director.loadScene('beWithYou');
    	}.bind(this));
        this.node.getChildByName('btnSet').on('click', function() {

        }.bind(this));
        this.node.getChildByName('btnAbout').on('click', function() {

        }.bind(this));
        this.node.getChildByName('btnQuit').on('click', function() {
            cc.game.end();
        }.bind(this));
    },

});