let define = require('define');
let audio = require('audio');
let utils = require('utils');
let event = require('event');

cc.Class({
    extends: cc.Component,

    properties: {
        back: cc.Node,
        tipsManager: cc.Node,
        meetImg: cc.Node,
        accountPrefab: cc.Prefab,
        boyPrefab: cc.Prefab,
        girlPrefab: cc.Prefab,
        rootN: cc.Node,
    },

    onLoad: function () {this.missDistance = 36;
        utils.scaleAnimtion('in', this.node);
        this._curLevel = utils.getLocalStorage('chooseLevel') || 1;
        this.setBackground();
        this.initData();
        event.add('BwyGameIsJumping', 'HeroIsJumping', function(jump) {
            this._isJumped = jump;
        }.bind(this));
        event.add('BwyGameHeroDeath', 'bwyHeroDeath', this.death.bind(this));
    },

    onDestroy() {
        event.remove('BwyGameIsJumping');
        event.remove('BwyGameHeroDeath');
    },

    createHero() {
        if (this.boy) this.boy.destroy();
        if (this.girl) this.girl.destroy();
        this.boy = cc.instantiate(this.boyPrefab);
        this.boy.parent = this.rootN;
        this.girl = cc.instantiate(this.girlPrefab);
        this.girl.parent = this.rootN;
    },

    initData() {
        this._moveSpeed = 2;
        this._curRoundInit = define.BWY_RoundInit[this._curLevel];
        this._curMoveOne = 'boy';
        this._isUpdate = true;
        this.meetImg.active = false;
        this.createHero();
        this.boy.getComponent('bwyHeroControl').setUpdate(true);
        this.girl.getComponent('bwyHeroControl').setUpdate(true);
        this.boy.setPosition(this._curRoundInit.boy.pos);
        this.girl.setPosition(this._curRoundInit.girl.pos);
        this.boy.scaleX = this._curRoundInit.boy.dir;
        this.girl.scaleX = this._curRoundInit.girl.dir;
        this.back.getChildByName('round').getComponent(cc.Label).string = this._curRoundInit.round;
        if (this._curRoundInit.snow) {
            this.snow = this.back.getChildByName('snow');
            this.snow.active = true;
            this.snow.getComponent(cc.ParticleSystem).emissionRate = this._curRoundInit.snow;
        }
        for (let i = 0; i < utils.getLength(define.BWY_RoundInit); i++) {
            this.rootN.getChildByName('platforms' + (i + 1)).active = false;
        }
        this.rootN.getChildByName('platforms' + this._curLevel).active = true;
        this._isTogetherMove = this._curRoundInit.isTogetherMove;
        this.node.getChildByName('btnExchange').active = !this._isTogetherMove;
        this.node.getChildByName('btnExchange').active = !this._curRoundInit.girlNoMove;
    },

    start() {
        this.missDistance = 36;
        audio.playMusic('beWithYou', 'gameBack.mp3', true);
        this.back.getChildByName('tishi').active = this._curLevel === 1 ? true : false;

        this.onMoveTouch();
        this.node.getChildByName('btnExchange').on('click', function () {
            audio.playSound('common', 'sound_anniu.mp3');
            this._curMoveOne = this.getTheOtherOne();
        }.bind(this));
        this.node.getChildByName('btnJump').on('click', function () {
            audio.playSound('common', 'sound_anniu.mp3');
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
            this.account('close', this.checkLevel('close'));
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
        body.getComponent('bwyHeroControl').setDirection(this._speed > 0 ? 1 : (this._speed < 0 ? -1 : 0));
        if (this._isTogetherMove) {
            let body2 = this.getTheOtherOne();
            let dir2 = this._curRoundInit.isSameMoveDirection ? -1 : 1;
            this[body2].getComponent('bwyHeroControl').setDirection(this._speed > 0 ? 1 * dir2 : -1 * dir2);
        }
        this.meet(body.getPosition());
    },

    getTheOtherOne() {
        return this._curMoveOne === 'boy' ? 'girl' : 'boy';
    },

    setAnimtion(sex, flag) {
        if (!this[sex]) return;
        let anim = this[sex].getComponent(cc.Animation);
        if (flag) {
            anim.play();
        } else {
            anim.stop();
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
        } else if (loc.x - this._loc.x > 0) {
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

    checkLevel(type) {
        let saveLev = utils.getLocalStorage('gameLevel');
        let totalLev = utils.getLength(define.BWY_RoundInit);
        switch(type) {
            case 'success':
                if (totalLev > saveLev || (totalLev === saveLev && this._curLevel < saveLev)) return true;
                else return false;
                break;
            case 'failed':
                if (saveLev > this._curLevel) return true;
                else return false;
                break;
            case 'close':
                if (saveLev > this._curLevel) return true;
                else return false;
                break;
            default:
                if (saveLev <= this._curLevel && totalLev > this._curLevel) {
                    utils.setLocalStorage('gameLevel', this._curLevel + 1);
                }
                break;
        }
    },

    setSnowActive(flag) {
        if (this.snow) {
            this.snow.active = flag;
        }
    },

    pass() {
        this.setSnowActive(false);
        this._isUpdate = false;
        this.boy.getComponent('bwyHeroControl').setUpdate(false);
        this.girl.getComponent('bwyHeroControl').setUpdate(false);
        this.checkLevel();

        let body = this[this._curMoveOne]
        let pos = body.getPosition();
        let dis = body.scaleX > 0 ? -1 : 1;
        let con = body.getContentSize();
        this.meetImg.active = true;
        this.meetImg.opacity = 255;
        this.meetImg.setPosition(cc.p(pos.x + dis * con.width / 2, pos.y + con.height/1.5));
        this.meetImg.setScale(0.2);
        let action = cc.sequence(cc.scaleBy(1, 10), cc.fadeOut(1.0), cc.callFunc(function() {
            this.account('success', this.checkLevel('success'));
        }.bind(this)));
        this.meetImg.runAction(action);
    },

    death() {
        this.setSnowActive(false);
        this._isUpdate = false;
        let jump = cc.jumpBy(0.5, cc.p(0, 0), 40, 1);
        let body = this[this._curMoveOne];
        let move = cc.moveTo(0.5, cc.p(body.getPositionX(), 0));
        body.runAction(cc.sequence(jump, move, cc.callFunc(function() {
            this.account('failed', this.checkLevel('failed'));
        }.bind(this))));
    },

    account(type, flag) {
        if (this._account) {
            this._account.removeFromParent();
        }
        this._account = cc.instantiate(this.accountPrefab);
        this._account.parent = this.tipsManager;
        this._account.getComponent('bwyAccountPrefab').init(type, flag, this);
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
