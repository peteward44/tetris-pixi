
const COLOUR = {
	BLUE: 0,
	GREEN: 1,
	GREY: 2,
	PURPLE: 3,
	RED: 4,
	TORQ: 5,
	YELLOW: 6
};

const COLOUR_COUNT = Object.keys( COLOUR ).length;

const TYPE = {
	STRAIGHT: 0,
	L1: 1,
	L2: 2,
	T: 3,
	Z1: 4,
	Z2: 5
};

const TYPE_COUNT = Object.keys( TYPE ).length;

const KEYS = {
	UP: "up",
	DOWN: "down",
	LEFT: "left",
	RIGHT: "right"
};

const PLAY_AREA_WIDTH = 30;
const PLAY_AREA_HEIGHT = 20;

const BLOCK_WIDTH = 20;
const BLOCK_HEIGHT = 20;

export default {
	KEYS,
	COLOUR,
	COLOUR_COUNT,
	TYPE,
	TYPE_COUNT,
	PLAY_AREA_WIDTH,
	PLAY_AREA_HEIGHT,
	BLOCK_WIDTH,
	BLOCK_HEIGHT,
	ROTATIONS: {
		[TYPE.STRAIGHT]: [
			[
				{ x: 0, y: 0 }, // X
				{ x: 0, y: 1 }, // X
				{ x: 0, y: 2 }, // X
				{ x: 0, y: 3 } // X
			],
			[
				{ x: 0, y: 0 }, // XXXX
				{ x: 1, y: 0 },
				{ x: 2, y: 0 },
				{ x: 3, y: 0 }
			],
			[
				{ x: 0, y: 0 }, // X
				{ x: 0, y: 1 }, // X
				{ x: 0, y: 2 }, // X
				{ x: 0, y: 3 } // X
			],
			[
				{ x: 0, y: 0 }, // XXXX
				{ x: 1, y: 0 },
				{ x: 2, y: 0 },
				{ x: 3, y: 0 }
			]
		],
		[TYPE.L1]: [
			[
				{ x: 0, y: 0 }, // X
				{ x: 0, y: 1 }, // X
				{ x: 0, y: 2 }, // XX
				{ x: 1, y: 2 }
			],
			[
				{ x: 0, y: 0 }, // XXX
				{ x: 1, y: 0 }, // X
				{ x: 2, y: 0 },
				{ x: 0, y: 1 }
			],
			[
				{ x: 0, y: 0 }, // XX
				{ x: 1, y: 0 }, //  X
				{ x: 1, y: 1 }, //  X
				{ x: 1, y: 2 }
			],
			[
				{ x: 2, y: 0 }, //   X
				{ x: 2, y: 1 }, // XXX
				{ x: 1, y: 1 },
				{ x: 0, y: 1 }
			]
		],
		[TYPE.L2]: [
			[
				{ x: 1, y: 0 }, //  X
				{ x: 1, y: 1 }, //  X
				{ x: 1, y: 2 }, // XX
				{ x: 0, y: 2 }
			],
			[
				{ x: 0, y: 0 }, // X
				{ x: 0, y: 1 }, // XXX
				{ x: 1, y: 1 },
				{ x: 2, y: 1 }
			],
			[
				{ x: 1, y: 0 }, // XX
				{ x: 0, y: 0 }, // X
				{ x: 0, y: 1 }, // X
				{ x: 0, y: 2 }
			],
			[
				{ x: 2, y: 1 }, // XXX
				{ x: 2, y: 0 }, //   X
				{ x: 1, y: 0 },
				{ x: 0, y: 0 }
			]
		],
		[TYPE.T]: [
			[
				{ x: 0, y: 0 }, // XXX
				{ x: 1, y: 0 }, //  X
				{ x: 2, y: 0 },
				{ x: 1, y: 1 }
			],
			[
				{ x: 1, y: 0 }, //  X
				{ x: 1, y: 1 }, // XX
				{ x: 0, y: 1 }, //  X
				{ x: 1, y: 2 }
			],
			[
				{ x: 0, y: 1 }, //  X
				{ x: 1, y: 1 }, // XXX
				{ x: 1, y: 0 },
				{ x: 2, y: 1 }
			],
			[
				{ x: 0, y: 0 }, // X
				{ x: 0, y: 1 }, // XX
				{ x: 1, y: 1 }, // X
				{ x: 0, y: 2 }
			]
		],
		[TYPE.Z1]: [
			[
				{ x: 0, y: 0 }, // XX
				{ x: 1, y: 0 }, //  XX
				{ x: 1, y: 1 },
				{ x: 2, y: 1 }
			],
			[
				{ x: 1, y: 0 }, //  X
				{ x: 1, y: 1 }, // XX
				{ x: 0, y: 1 }, // X
				{ x: 0, y: 2 }
			],
			[
				{ x: 0, y: 0 }, // XX
				{ x: 1, y: 0 }, //  XX
				{ x: 1, y: 1 },
				{ x: 2, y: 1 }
			],
			[
				{ x: 1, y: 0 }, //  X
				{ x: 1, y: 1 }, // XX
				{ x: 0, y: 1 }, // X
				{ x: 0, y: 2 }
			]
		],
		[TYPE.Z2]: [
			[
				{ x: 0, y: 1 }, //  XX
				{ x: 1, y: 1 }, // XX
				{ x: 1, y: 0 },
				{ x: 2, y: 0 }
			],
			[
				{ x: 0, y: 0 }, // X
				{ x: 0, y: 1 }, // XX
				{ x: 1, y: 1 }, //  X
				{ x: 1, y: 2 }
			],
			[
				{ x: 0, y: 1 }, //  XX
				{ x: 1, y: 1 }, // XX
				{ x: 1, y: 0 },
				{ x: 2, y: 0 }
			],
			[
				{ x: 0, y: 0 }, // X
				{ x: 0, y: 1 }, // XX
				{ x: 1, y: 1 }, //  X
				{ x: 1, y: 2 }
			]
		]
	}
};
