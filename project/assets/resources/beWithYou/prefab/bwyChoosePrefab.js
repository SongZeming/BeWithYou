let audio = require('audio');
let utils = require('utils');
cc.Class({
    extends: cc.Component,

    properties: {
        btns: cc.Node,
    },

    onLoad () {
        utils.scaleAnimtion('in', this.node.getChildByName('back'));
        let level = utils.getLocalStorage('gameLevel') || 1;
        for (let i = level; i < this.btns.children.length; ++i) {
            this.btns.children[i].opacity = 160;
        }
        for (let i = 0; i < level; ++i) {
            this.btns.children[i].on('click', function() {
                audio.playSound('common', 'sound_anniu.mp3');
                utils.setLocalStorage('chooseLevel', i + 1);
                cc.director.loadScene('beWithYou');
            }.bind(this));
        }
        this.node.getChildByName('hitzone').on('click', function() {
            utils.scaleAnimtion('out', this.node.getChildByName('back'), function () {
                this.node.destroy();
            }.bind(this));
        }.bind(this));
    },

});
