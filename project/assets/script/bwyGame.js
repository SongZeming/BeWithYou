let define = require('define');
let audio  = require('audio');
let utils  = require('utils');

cc.Class({
    extends: cc.Component,

    properties: {
    	back: cc.Node,
        characterPrefab: cc.Prefab,
    },

    onLoad: function () {
        this._curLevel = utils.gettLocalStorage('gameLevel') || 1;
    	this.createCharacter('boy');
        this.createCharacter('girl');
    },

    update: function (dt) {

    },

    start() {
        this.snow = this.back.getChildByName('snow');
        for (let lev in define.BWY_RoundSnow) {
            if (this._curLevel === parseInt(lev)) {
                this.snow.active = true;
                this.snow.getComponent(cc.ParticleSystem).emissionRate = define.BWY_RoundSnow[lev];
                break;
            }
        }
    },

    //初始化男女角色
    createCharacter(sex, pos) {
    	this[sex] = cc.instantiate(this.characterPrefab);
    	this[sex].setPosition(define.BWY_RoundPosition[this._curLevel][sex]);
    	this[sex].getComponent('characterPrefab').setAnimtion(sex, false);
    	this[sex].parent = this.back;
    },

    pass() {
        this.snow.active = false;
    },

    death() {
        this.snow.active = false;
    },

});
