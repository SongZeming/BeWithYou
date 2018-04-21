let utils = {

    random (min, max) {
        min = parseFloat(min);
        max = parseFloat(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    setLocalStorage(name, data) {
    	cc.sys.localStorage.setItem(name, JSON.stringify(data));
    },

    getLocalStorage(name) {
    	return JSON.parse(cc.sys.localStorage.getItem(name));
    },
    
    scaleAnimtion(type, node, callback) {
        if (type === 'in') {
            node.setScale(0.5);
            let action = cc.scaleTo(0.2, 1);
            node.runAction(action);
        } else if (type === 'out') {
            let action = cc.sequence(cc.scaleTo(0.2, 0), cc.callFunc(function() {
                callback();
            }.bind(this)));
            node.runAction(action);
        }
    },

    getLength: function (obj) {
        let count = 0;
        for (let value in obj) {
            if (obj.hasOwnProperty(value)) {
                count++;
            }
        }
        return count;
    },

};

module.exports = utils;