let define = {};

//------------- BeWithYou
//男女角色不同关卡的 /位置 /移动方向 /是否同时移动 /关卡 /是否下雪
define.BWY_RoundInit = {
	1: {
		boy: {
			pos: cc.p(70, 520),
			dir: -1, //-1-左 1-右
		},
		girl: {
			pos: cc.p(80, 260),
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
			pos: cc.p(70, 520),
			dir: -1,
		},
		girl: {
			pos: cc.p(180, 90),
			dir: -1,
		},
		isTogetherMove: false,
		isSameMoveDirection: false,
		girlNoMove: false,
		round: 'SECOND ROUND',
		snow: false,
	},
	3: {
		boy: {
			pos: cc.p(70, 550),
			dir: -1,
		},
		girl: {
			pos: cc.p(1250, 550),
			dir: 1,
		},
		isTogetherMove: true,
		isSameMoveDirection: true,
		girlNoMove: false,
		round: 'THIRD ROUND',
		snow: false,
	},
	4: {
		boy: {
			pos: cc.p(580, 640),
			dir: -1,
		},
		girl: {
			pos: cc.p(1185, 300),
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
			pos: cc.p(290, 630),
			dir: 1,
		},
		girl: {
			pos: cc.p(600, 175),
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
			pos: cc.p(700, 630),
			dir: -1,
		},
		girl: {
			pos: cc.p(100, 430),
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
			pos: cc.p(286, 610),
			dir: -1,
		},
		girl: {
			pos: cc.p(90, 300),
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
			pos: cc.p(90, 700),
			dir: -1,
		},
		girl: {
			pos: cc.p(1200, 700),
			dir: -1,
		},
		isTogetherMove: true,
		isSameMoveDirection: true,
		girlNoMove: false,
		round: 'EIGHT ROUND',
		snow: false,
	},
}


//------------- Else

module.exports = define;