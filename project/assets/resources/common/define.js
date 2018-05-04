let define = {};

//------------- BeWithYou
//男女角色不同关卡的 /位置 /移动方向 /是否同时移动 /关卡 /是否下雪
define.BWY_RoundInit = {
	1: {
		boy: {
			pos: cc.p(100, 960),
			dir: -1, //-1-左 1-右
		},
		girl: {
			pos: cc.p(120, 500),
			dir: -1,
		},
		isTogetherMove: false,
		isSameMoveDirection: false,
		girlNoMove: false,
		round: 'FIRST ROUND',
		snow: 40,
	},
	2: {
		boy: {
			pos: cc.p(140, 960),
			dir: -1,
		},
		girl: {
			pos: cc.p(600, 160),
			dir: 1,
		},
		isTogetherMove: false,
		isSameMoveDirection: false,
		girlNoMove: false,
		round: 'SECOND ROUND',
		snow: false,
	},
	3: {
		boy: {
			pos: cc.p(90, 960),
			dir: -1,
		},
		girl: {
			pos: cc.p(1880, 960),
			dir: 1,
		},
		isTogetherMove: false,
		isSameMoveDirection: false,
		girlNoMove: false,
		round: 'THIRD ROUND',
		snow: false,
	},
	4: {
		boy: {
			pos: cc.p(860, 1150),
			dir: -1,
		},
		girl: {
			pos: cc.p(1880, 540),
			dir: 1,
		},
		isTogetherMove: false,
		isSameMoveDirection: false,
		girlNoMove: false,
		round: 'FOUR ROUND',
		snow: false,
	},
	5: {
		boy: {
			pos: cc.p(450, 1140),
			dir: 1,
		},
		girl: {
			pos: cc.p(420, 350),
			dir: 1,
		},
		isTogetherMove: false,
		isSameMoveDirection: false,
		girlNoMove: false,
		round: 'FIVE ROUND',
		snow: false,
	},
	6: {
		boy: {
			pos: cc.p(1000, 1120),
			dir: -1,
		},
		girl: {
			pos: cc.p(100, 750),
			dir: -1,
		},
		isTogetherMove: false,
		isSameMoveDirection: false,
		girlNoMove: true,
		round: 'SIX ROUND',
		snow: false,
	},
	7: {
		boy: {
			pos: cc.p(80, 1070),
			dir: -1,
		},
		girl: {
			pos: cc.p(150, 500),
			dir: -1,
		},
		isTogetherMove: false,
		isSameMoveDirection: false,
		girlNoMove: false,
		round: 'SEVEN ROUND',
		snow: 100,
	},
	8: {
		boy: {
			pos: cc.p(90, 1240),
			dir: -1,
		},
		girl: {
			pos: cc.p(1900, 1240),
			dir: -1,
		},
		isTogetherMove: false,
		isSameMoveDirection: false,
		girlNoMove: false,
		round: 'EIGHT ROUND',
		snow: false,
	},
}


//------------- Else

module.exports = define;