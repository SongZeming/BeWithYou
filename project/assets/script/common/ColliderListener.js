cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        this.touchingNumber = 0;
    },
    
    onCollisionEnter: function (other) {
        this.node.color = cc.Color.RED;
        this.touchingNumber ++;
    },
    
    onCollisionStay: function (other) {

    },
    
    onCollisionExit: function () {
        this.touchingNumber --;
        if (this.touchingNumber === 0) {
            this.node.color = cc.Color.WHITE;
        }
    }

});
