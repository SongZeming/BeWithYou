cc.Class({
    extends: cc.Component,

    properties: {
        anim: cc.Animation,
    },

    init(sex, flag) {
        this.name = sex + 'Anim';
        this.node.getChildByName(sex).active = true;
    },
    
    setAnimtion(flag) {
        if (flag) {
            if (!this._done) {
                this._done = true;
                this.anim.play(this.name);
            } else {
                this.anim.resume(this.name);
            }
        } else {
            this.anim.pause(this.name);
        }
    },

});
