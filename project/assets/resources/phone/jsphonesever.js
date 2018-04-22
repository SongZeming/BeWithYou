let sever = {

	send() {
		if(cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod('ocphonesever', 'send');
        }
	},

	rePlayGame() {
		console.log('--- jsphonesever rePlayGame ---');
        require('event').dispatch('RePlayGame', {});
    },

}

module.exports = sever;


