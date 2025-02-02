export const TYPE_COSTS = {
	//TypeId: Cost
	0: 5, //bomer
	1: 5, //stealth bomber
	2: 5, //stealth fighter
	3: 5,
	4: 5,
	5: 5,
	6: 5,
	7: 5,
	8: 5,
	9: 5,
	10: 5,
	11: 5,
	12: 5,
	13: 5,
	14: 5,
	15: 5,
	16: 5,
	17: 5,
	18: 5,
	19: 5
};

export const TYPE_MAIN = 0;
export const TYPE_AIR = 1;
export const TYPE_LAND = 2;
export const TYPE_SEA = 3;
export const TYPE_SPECIAL = 4;

export const TYPE_OWNERS = {
	0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
	1: [0, 1, 2, 3, 4, 5],
	2: [6, 7, 8, 9, 10, 11, 12],
	3: [13, 14, 15, 16],
	4: [17, 18, 19]
};

export const TYPE_MOVES = {
	//TypdId: Moves
	0: 5, //bomer
	1: 5, //stealth bomber
	2: 5, //stealth fighter
	3: 5,
	4: 5,
	5: 5,
	6: 5,
	7: 5,
	8: 5,
	9: 5,
	10: 5,
	11: 5,
	12: 5,
	13: 5,
	14: 5,
	15: 5,
	16: 5,
	17: 5,
	18: 5,
	19: 5
};

export const TYPE_FUEL = {
	//TypdId: Moves (-1 = warfare)
	0: 5, //bomer
	1: 5, //stealth bomber
	2: 5, //stealth fighter
	3: 500, //Tanker
	4: 5, //Air Transport
	5: 5,
	6: 5,
	7: 5,
	8: 5, //TODO: these should be -1 for non-aircraft
	9: 5,
	10: 5,
	11: 5,
	12: 5,
	13: 5,
	14: 5,
	15: 5,
	16: 5,
	17: 5,
	18: 5,
	19: 5
};

//this represents the typeIds that are 'containers' and can perform container moves for a plan, and other things
export const CONTAINER_TYPES = [4, 14, 16, 18];

export const TYPE_HIGH_LOW = {
	highPieces: [0, 1, 2, 3, 4, 5, 10, 17, 18],
	lowPieces: [6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 19]
};

export const TYPE_NAMES = {
	0: "Bomber",
	1: "Stealth Bomber",
	2: "Stealth Fighter",
	3: "Tanker",
	4: "Air Transport",
	5: "Air ISR",
	6: "Army Infantry",
	7: "Artillery",
	8: "Tank",
	9: "Marine Infantry",
	10: "Attack Helicopter",
	11: "LAV",
	12: "SAM",
	13: "Destroyer",
	14: "A.C. Carrier",
	15: "Submarine",
	16: "Transport",
	17: "MC-12",
	18: "C-130",
	19: "SOF Team"
};

export const TYPE_NAME_IDS = {
	"Bomber": 0,
	"Stealth Bomber": 1,
	"Stealth Fighter": 2,
	"Tanker": 3,
	"Air Transport": 4,
	"Air ISR": 5,
	"Army Infantry": 6,
	"Artillery": 7,
	"Tank": 8,
	"Marine Infantry": 9,
	"Attack Helicopter": 10,
	"LAV": 11,
	"SAM": 12,
	"Destroyer": 13,
	"A.C. Carrier": 14,
	"Submarine": 15,
	"Transport": 16,
	"MC-12": 17,
	"C-130": 18,
	"SOF Team": 19
};

// used the updated units excel at https://docs.google.com/spreadsheets/d/1kiMLv05oK6IZKtiYdErvD4Kp5tI3lXLL2-qbO3ZqHAI/edit#gid=306372336
export const VISIBILITY_MATRIX = [
	[1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, -1, 2, 1, 1, -1], //bomber
	[1, 0, -1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, -1, 2, 1, 1, -1], //stealth bomber
	[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, -1, 2, 1, 1, -1], //stealth fighter
	[0, -1, -1, 0, 1, 0, 0, -1, -1, -1, 0, -1, -1, 0, 0, -1, 0, 0, 1, -1], //tanker
	[0, -1, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 1, -1], //air transport
	[2, 0, 0, 2, 2, 2, -1, -1, -1, -1, 2, -1, -1, 0, 0, -1, 0, 2, 2, -1], //air isr
	[-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, -1, -1, 0], //infantry (army)
	[-1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 0, 0, -1, 0, -1, -1, 0], //artillery
	[-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, -1, -1, 0], //tank
	[-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, -1, -1, 0], //infantry (marine)
	[-1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 0, 1, 0], //attack helicopter
	[-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, -1, -1, 0], //LAV
	[2, 0, 0, 2, 2, 2, -1, -1, -1, -1, 2, -1, 0, -1, -1, -1, -1, 1, 2, -1], //SAM
	[0, -1, -1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, -1], //destroyer
	[0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, -1, 1, 0, 1, -1], //a.c. carrier
	[-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, -1, 0, 0, 1, 1, 1, 1, -1, -1, -1], //submarine
	[0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, -1], //transport
	[-1, -1, -1, -1, -1, -1, 2, 2, 2, 2, 1, 2, 2, 2, 2, -1, 2, 1, 0, 1], //mc-12
	[0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, -1, 1, 1, 1, -1], //c-130
	[-1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 0, 0, -1, 0, 0, 0, 0] //sof team
];

export const ATTACK_MATRIX = [
	[0, 0, 0, 0, 0, 0, 11, 11, 10, 11, 0, 10, 3, 10, 9, 0, 8, 0, 0, 8, 11, 0, 0], //bomber
	[0, 0, 0, 0, 0, 0, 10, 10, 9, 10, 0, 9, 8, 9, 8, 0, 8, 0, 0, 8, 11, 0, 0], //stealth bomber
	[10, 4, 3, 11, 10, 11, 5, 5, 4, 5, 9, 6, 7, 4, 3, 0, 6, 10, 9, 8, 8, 0, 0], //stealth fighter
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //tanker
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //air transport
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //air isr
	[0, 0, 0, 0, 0, 0, 7, 8, 4, 8, 6, 6, 10, 0, 0, 0, 0, 2, 2, 9, 6, 0, 0], //infantry (army)
	[0, 0, 0, 0, 0, 0, 8, 8, 6, 7, 0, 7, 10, 0, 0, 0, 0, 0, 0, 10, 9, 0, 0], //artillery
	[0, 0, 0, 0, 0, 0, 7, 10, 7, 7, 2, 8, 11, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0], //tank
	[0, 0, 0, 0, 0, 0, 8, 9, 5, 7, 3, 6, 10, 0, 0, 0, 0, 2, 2, 9, 7, 0, 0], //infantry (marine)
	[0, 0, 0, 0, 0, 0, 9, 10, 8, 9, 2, 10, 9, 6, 5, 0, 5, 8, 7, 10, 9, 0, 0], //attack helicopter
	[0, 0, 0, 0, 0, 0, 8, 8, 6, 8, 4, 7, 10, 0, 0, 0, 0, 3, 2, 9, 8, 0, 0], //LAV
	[10, 8, 7, 11, 10, 10, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0], //SAM
	[9, 0, 0, 5, 5, 5, 6, 7, 6, 6, 6, 4, 7, 7, 8, 9, 8, 3, 3, 3, 9, 0, 0], //destroyer
	[9, 1, 1, 3, 2, 4, 0, 0, 0, 0, 3, 0, 0, 2, 4, 2, 4, 6, 5, 0, 0, 0, 0], //a.c. carrier
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 7, 8, 0, 0, 0, 0, 0, 0], //submarine
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //transport
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //mc-12
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //c-130
	[0, 0, 0, 0, 0, 0, 3, 8, 2, 3, 2, 5, 10, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0] //sof team
];
