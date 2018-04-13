let utils = {

    random (min, max) {
        min = parseFloat(min);
        max = parseFloat(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    setLocalStorage(name, data) {
    	cc.sys.localStorage.setItem(name, JSON.stringify(data));
    },

    gettLocalStorage(name) {
    	return JSON.parse(cc.sys.localStorage.getItem(name));
    },
    
    
};

module.exports = utils;