cc.Class({
    extends: cc.Component,

    properties: {
        anim: cc.Animation,
    },
    
    setAnimtion(sex, flag) {
        let name = sex + 'Anim';
        this.node.getChildByName(sex).active = true;
        if (flag) {
            this.anim.play(name);
        } else {
            this.anim.stop(name);
        }
    },

});
