let audio = require('audio');
cc.Class({
    extends: cc.Component,

    properties: {
        titleL: cc.Label,
		btnNext: cc.Node,
		btnNextLable: cc.Node,
		btnNextComp: cc.Button,
    },

    onLoad () {
    	this.node.getChildByName('btnReturn').on('click', function() {
			audio.playSound('common', 'sound_anniu.mp3');
    		cc.director.loadScene('bwyMain');
    	});
    	this.node.getChildByName('btnAgain').on('click', function() {
			audio.playSound('common', 'sound_anniu.mp3');
			this.node.destroy();
    		this._context.reStart();
    	}.bind(this));
		this.btnNext.on('click', function() {
			audio.playSound('common', 'sound_anniu.mp3');
			this.node.destroy();
    		this._context.goNext();
		}.bind(this));
		this.node.getChildByName('hitzone').on('click', function() {
			if (this._type === 'close') {
				this.node.destroy();
			}
		}.bind(this));
    },

    init(type, context) {
		this._context = context;
		this._type = type;
    	switch(type) {
    		case 'success':
				this.titleL.string = 'S U C C E S S';
				this.btnNext.opacity = 255;
				this.btnNextLable.opacity = 255;
				this.btnNextComp.interactable = true;
    			break;
    		case 'failed':
				this.titleL.string = 'F A I L E D';
				this.btnNext.opacity = 100;
				this.btnNextLable.opacity = 100;
				this.btnNextComp.interactable = false;
    			break;
			case 'close':
				this.titleL.string = 'R E T U R N';
				this.btnNext.opacity = 100;
				this.btnNextLable.opacity = 100;
				this.btnNextComp.interactable = false;
    		default:
    			break;
    	}
    },

});
