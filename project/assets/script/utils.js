let utils = {

    random (min, max) {
        min = parseFloat(min);
        max = parseFloat(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    
};

module.exports = utils;