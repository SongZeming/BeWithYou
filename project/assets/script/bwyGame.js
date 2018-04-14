let define = require('define');
let audio = require('audio');
let utils = require('utils');

cc.Class({
    extends: cc.Component,

    properties: {
        back: cc.Node,
        backImg: cc.Sprite,
        characterPrefab: cc.Prefab,
        meetImg: cc.Node,
        accountPrefab: cc.Prefab,
        jumpHight: 60,
        jumpTime: 0.5,
        missDistance: 36,
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
        this._isUpdate = true;
        this.meetImg.active = false;
        // let backImgName = 

    },

    start() {
        audio.playMusic('beWithYou', 'gameBack.mp3', true);
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

        this.onMoveTouch();
        this.node.getChildByName('btnExchange').on('click', function () {
            this._curMoveOne = this.getTheOtherOne();
        }.bind(this));
        this.node.getChildByName('btnJump').on('click', function () {
            if (!this._isJumped) {
                this._isJumped = true;
                let action = cc.sequence(cc.jumpBy(this.jumpTime, cc.p(0, 0), this.jumpHight, 1), cc.callFunc(function () {
                    this._isJumped = false;
                }.bind(this)));
                this[this._curMoveOne].runAction(action);
                if (this._isTogetherMove) {
                    let body = this.getTheOtherOne();
                    this[body].runAction(cc.jumpBy(this.jumpTime, cc.p(0, 0), this.jumpHight, 1));
                }
            }
        }.bind(this));
        this.node.getChildByName('btnClose').on('click', function () {
            this.account('close');
        }.bind(this));
    },

    update: function (dt) {
        if (this._isUpdate) {
            if (this.startMoveLfet) {
                this.heroMove('left');
            } else if (this.startMoveRight) {
                this.heroMove('right');
            } else {
                switch (this._curLevel) {
                    case 1:
                        this.first(true);
                    case 2:
                        this.second(true);
                    default:
                        break;
                }
            }
        }
    },

    heroMove(dir) {
        this._speed = dir === 'left' ? -this._moveSpeed : this._moveSpeed;
        if (!this._isAnimPlaying) {
            this._isAnimPlaying = true;
            this[this._curMoveOne].getComponent('characterPrefab').setAnimtion(true);
        }
        switch (this._curLevel) {
            case 1:
                this.first();
            case 2:
                this.second();
            default:
                break;
        }
    },

    //------------------------------------------------------------------ 关卡,
    //第一关
    first(flag) {
        let pos = this[this._curMoveOne].getPosition();
        let downFunc = function () {
            if ((pos.y > 250 && (pos.x > 1120 || pos.y < 490))
                || (pos.y < 440 && pos.y > 55 && pos.x < 430 && pos.x > 305)) {
                this[this._curMoveOne].setPositionY(pos.y - Math.abs(this._speed) * 2);
            }
        }.bind(this);
        let meetFunc = function () {
            let otherPos = this[this.getTheOtherOne()].getPosition();
            if (Math.abs(pos.x - otherPos.x) < this.missDistance && Math.abs(pos.y - otherPos.y) < 5) {
                this.pass();
            }
        }.bind(this);
        if (flag) {
            downFunc();
            meetFunc();
            return;
        }
        if ((pos.x < 1315 && this._speed > 0)
            || (pos.x > 19 && this._speed < 0)) {
            let body = this[this._curMoveOne].getChildByName(this._curMoveOne);
            body.scaleX = this._speed > 0 ? (body.scaleX > 0 ? -body.scaleX : body.scaleX) : (body.scaleX > 0 ? body.scaleX : -body.scaleX);
            downFunc();
            meetFunc();
            if (pos.y < 240 && ((pos.x < 310 && this._speed < 0) || (pos.x > 435 && this._speed > 0))) {
                return;
            }
            this[this._curMoveOne].setPositionX(pos.x + this._speed);
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

    getTheOtherOne() {
        return this._curMoveOne === 'boy' ? 'girl' : 'boy';
    },


    //------------------------------------------------------------------ 触摸,
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
        this._isUpdate = false;

        this.meetImg.active = true;
        let pos = this[this._curMoveOne].getPosition();
        this.meetImg.setPosition(cc.p(pos.x, pos.y));
        this.meetImg.setScale(0.2);
        this.boy.active = false;
        this.girl.active = false;
        let action = cc.sequence(cc.scaleBy(1, 10), cc.fadeOut(1.0), cc.callFunc(function() {
            this.account('success');
        }.bind(this)));
        this.meetImg.runAction(action);
    },

    death() {
        this.snow.active = false;
        this._isUpdate = false;

        this.account('failed');
    },

    account(type) {
        let account = cc.instantiate(this.accountPrefab);
        account.parent = this.node;
        account.getComponent('accountPrefab').init(type, this);
    },

    reStart() {
        this.initData();
        this.boy.setPosition(this._curRoundInit.boy.pos);
        this.girl.setPosition(this._curRoundInit.girl.pos);
    },

    goNext() {
        this._curLevel++;
        this.initData();
        this.boy.setPosition(this._curRoundInit.boy.pos);
        this.girl.setPosition(this._curRoundInit.girl.pos);
    },

});
