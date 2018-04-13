let define = {};

//------------- BeWithYou
//男女角色不同关卡的 /位置 /移动方向 /是否同时移动
define.BWY_RoundInit = {
	1: {
		boy: {
			pos: cc.p(980, 495),
			dir: 1, //0-左 1-右
		},
		girl: {
			pos: cc.p(110, 245),
			dir: 0,
		},
		isTogetherMove: false,
	},
	2: {
		boy: {
			pos: cc.p(80, 495),
			dir: 1,
		},
		girl: {
			pos: cc.p(110, 245),
			dir: 0,
		},
		isTogetherMove: false,
	},
}

//有雪花的关卡 以及 雪量
define.BWY_RoundSnow = {
	1: 30,
	2: 50,
	3: 70,
};



//------------- Else

module.exports = define;