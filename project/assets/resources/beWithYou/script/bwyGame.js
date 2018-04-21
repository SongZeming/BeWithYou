let define = require('define');
let audio = require('audio');
let utils = require('utils');
let event = require('event');

cc.Class({
    extends: cc.Component,

    properties: {
        back: cc.Node,
        meetImg: cc.Node,
        accountPrefab: cc.Prefab,
        boy: cc.Node,
        girl: cc.Node,
        missDistance: 36,
    },

    onLoad: function () {
        utils.scaleAnimtion('in', this.node);
        this._curLevel = utils.getLocalStorage('chooseLevel') || 1;
        this.setBackground();
        this.initData();
        event.add('BwyGameIsJumping', 'HeroIsJumping', function(jump) {
            cc.log('--- HeroIsJumping: ', jump);
            this._isJumped = jump;
        }.bind(this));
    },

    onDestroy() {
        event.remove('BwyGameIsJumping');
    },

    initData() {
        this._moveSpeed = 2;
        this._curRoundInit = define.BWY_RoundInit[this._curLevel];
        this._curMoveOne = 'boy';
        this._isUpdate = true;
        this.meetImg.active = false;
        this.boy.scaleX = this._curRoundInit.boy.dir;
        this.girl.scaleX = this._curRoundInit.boy.dir;
        this.back.getChildByName('round').getComponent(cc.Label).string = this._curRoundInit.round;
        if (this._curRoundInit.snow) {
            this.snow = this.back.getChildByName('snow');
            this.snow.active = true;
            this.snow.getComponent(cc.ParticleSystem).emissionRate = this._curRoundInit.snow;
        }
    },

    start() {
        audio.playMusic('beWithYou', 'gameBack.mp3', true);
        this.back.getChildByName('tishi').active = this._curLevel === 1 ? true : false;
        this._isTogetherMove = this._curRoundInit.isTogetherMove;
        this.node.getChildByName('btnExchange').active = !this._isTogetherMove;

        this.onMoveTouch();
        this.node.getChildByName('btnExchange').on('click', function () {
            audio.playSound('common', 'sound_anniu.mp3');
            this._curMoveOne = this.getTheOtherOne();
        }.bind(this));
        this.node.getChildByName('btnJump').on('click', function () {
            audio.playSound('common', 'sound_anniu.mp3');
            cc.log('--- this._isJumped: ', this._isJumped);
            if (!this._isJumped) {
                this._isJumped = true;
                this[this._curMoveOne].getComponent('bwyHeroControl').setIsJumping(true);
                if (this._isTogetherMove) {
                    let body = this.getTheOtherOne();
                    this[body].getComponent('bwyHeroControl').setIsJumping(true);
                }
            }
        }.bind(this));
        this.node.getChildByName('btnClose').on('click', function () {
            audio.playSound('common', 'sound_anniu.mp3');
            this.account('close');
        }.bind(this));
    },

    update: function (dt) {
        if (this._isUpdate) {
            if (this.startMoveLfet) {
                this.heroMove('left');
            } else if (this.startMoveRight) {
                this.heroMove('right');
            }
        }
    },

    heroMove(dir) {
        this._speed = dir === 'left' ? -this._moveSpeed : this._moveSpeed;
        if (!this._isAnimPlaying) {
            this._isAnimPlaying = true;
            this.setAnimtion(this._curMoveOne, true);
        }
        let body = this[this._curMoveOne];
        let pos = body.getPosition();
        body.getComponent('bwyHeroControl').setDirection(this._speed > 0 ? 1 : -1);
        this.meet(pos);
    },

    getTheOtherOne() {
        return this._curMoveOne === 'boy' ? 'girl' : 'boy';
    },

    setAnimtion(sex, flag) {
        if (flag) {
            this[sex].getComponent(cc.Animation).play();
        } else {
            this[sex].getComponent(cc.Animation).stop();
        }
    },

    meet(pos) {
        let otherPos = this[this.getTheOtherOne()].getPosition();
        if (Math.abs(pos.x - otherPos.x) < this.missDistance && Math.abs(pos.y - otherPos.y) < 5) {
            this.pass();
        }
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
        this.setAnimtion(this._curMoveOne, false);
        this[this._curMoveOne].getComponent('bwyHeroControl').setDirection(0);
    },

    pass() {
        this.snow.active = false;
        this._isUpdate = false;
        utils.setLocalStorage('gameLevel', this._curLevel + 1);

        this.meetImg.active = true;
        let pos = this[this._curMoveOne].getPosition();
        this.meetImg.setPosition(cc.p(pos.x, pos.y));
        this.meetImg.setScale(0.2);
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
        account.getComponent('bwyAccountPrefab').init(type, this);
    },

    reStart() {
        this.initData();
        this.boy.setPosition(this._curRoundInit.boy.pos);
        this.girl.setPosition(this._curRoundInit.girl.pos);
    },

    goNext() {
        this._curLevel++;
        this.setBackground();
        this.initData();
        this.boy.setPosition(this._curRoundInit.boy.pos);
        this.girl.setPosition(this._curRoundInit.girl.pos);
    },

    setBackground() {
        let backName = 'beWithYou/texture/background/gamebg' + (this._curLevel - 1);
        cc.loader.loadRes(backName, cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            this.back.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }.bind(this));
    },

});
