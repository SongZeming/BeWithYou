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
		round: 'FIRST ROUND',
		snow: 40,
	},
	2: {
		boy: {
			pos: cc.p(80, 580),
			dir: -1,
		},
		girl: {
			pos: cc.p(192, 80),
			dir: -1,
		},
		isTogetherMove: false,
		round: 'SECOND ROUND',
		snow: false,
	},
}


//------------- Else

module.exports = define;