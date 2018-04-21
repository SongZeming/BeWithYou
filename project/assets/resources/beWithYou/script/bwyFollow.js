cc.Class({
    extends: cc.Component,

    properties: {
        boy: {
            default: null,
            type: cc.Node
        },

        girl: {
            default: null,
            type: cc.Node
        },
    },

    onLoad: function () {
        // 由于需要键盘操作所以只能在 PC 才可用
        // if (cc.sys.isMobile) {
        //     return;
        // }

        if (!this.boy) {
            return;
        }
        var followBoy = cc.follow(this.boy, cc.rect(0, 0, 400, 600));
        this.node.runAction(followBoy);

        if (!this.girl) {
            return;
        }
        var followGirl = cc.follow(this.girl, cc.rect(0, 0, 400, 600));
        this.node.runAction(followGirl);
    }
});
