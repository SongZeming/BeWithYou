let define = require('define');
let audio = require('audio');
let utils = require('utils');

cc.Class({
    extends: cc.Component,

    properties: {
        back: cc.Node,
        characterPrefab: cc.Prefab,
    },

    onLoad: function () {
        this._curLevel = utils.gettLocalStorage('gameLevel') || 1;
        this.initData();
        this.createCharacter('boy');
        this.createCharacter('girl');
    },

    initData() {
        this._moveSpeed = 2;
        this._curRoundInit = define.BWY_RoundInit[this._curLevel];
        this._curMoveOne = 'boy';
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
        this.back.getChildByName('tishi').active = this._curLevel === 1 ? true : false;
        this._isTogetherMove = this._curRoundInit.isTogetherMove;
        this.node.getChildByName('btnExchange').active = !this._isTogetherMove;

        let bDir = this._curRoundInit.boy.dir;
        let gDir = this._curRoundInit.girl.dir;
        if (bDir === gDir) this._isSameDir = true;

        this.onMoveTouch();
        this.node.getChildByName('btnExchange').on('click', function () {
            this._curMoveOne = this._curMoveOne === 'boy' ? 'girl' : 'boy';
        }.bind(this));
        this.node.getChildByName('btnJump').on('click', function () {
            // if () { 着地才能跳第二次

            // }
        }.bind(this));
    },

    update: function (dt) {
        if (this.startMoveLfet) {
            this.heroMove('left');
        }
        if (this.startMoveRight) {
            this.heroMove('right');
        }
    },

    heroMove(dir) {
        this._speed = dir === 'left' ? -this._moveSpeed : this._moveSpeed;
        switch (this._curLevel) {
            case 1:
                this.first();
            case 2:
                this.second();
            default:
                break;
        }
    },

    //第一关
    first() {
        if (!this._isAnimPlaying) {
            this._isAnimPlaying = true;
            this[this._curMoveOne].getComponent('characterPrefab').setAnimtion( true);
        }
        if ((this[this._curMoveOne].getPositionX() < 1315 && this._speed > 0)
            || (this[this._curMoveOne].getPositionX() > 19 && this._speed < 0)) {
            let body = this[this._curMoveOne].getChildByName(this._curMoveOne);
            let fh = this._speed > 0 ? (body.scaleX > 0 ? -1 : 1) : (body.scaleX > 0 ? 1 :-1);
            body.scaleX = fh * body.scaleX;
            this[this._curMoveOne].setPositionX(this[this._curMoveOne].getPositionX() + this._speed);
        }
    },
    //第二关
    second() {

    },

    //初始化男女角色
    createCharacter(sex, pos) {
        this[sex] = cc.instantiate(this.characterPrefab);
        this[sex].setPosition(this._curRoundInit[sex].pos);
        this[sex].getComponent('characterPrefab').init(sex, false);
        this[sex].parent = this.back;
    },

    onMoveTouch() {
        this.back.on('touchstart', this.startTouch, this);
        this.back.on('touchmove', this.moveTouch, this);
        this.back.on('touchend', this.endTouch, this);
        this.back.on('touchcancel', this.endTouch, this);
    },
    startTouch(event) {
        if (event.getLocation().x < cc.director.getWinSize().width / 2) {
            this.startMoveLfet = true;
            this.startMoveRight = false;
        } else {
            this.startMoveRight = true;
            this.startMoveLfet = false;
        }

    },
    moveTouch(event) {
        let loc = event.getLocation();
        this._loc = this._loc ? this._loc : loc;
        if (loc.x - this._loc.x < 0) {
            this.startMoveLfet = true;
            this.startMoveRight = false;
        } else {
            this.startMoveRight = true;
            this.startMoveLfet = false;
        }
        this._loc = event.getLocation();
    },
    endTouch(event) {
        this.startMoveLfet = false;
        this.startMoveRight = false;
        this._isAnimPlaying = false;
        this[this._curMoveOne].getComponent('characterPrefab').setAnimtion(false);
    },


    pass() {
        this.snow.active = false;
    },

    death() {
        this.snow.active = false;
    },

});
