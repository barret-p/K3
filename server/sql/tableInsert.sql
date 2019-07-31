CREATE TABLE IF NOT EXISTS games (
	gameId INT(3) NOT NULL UNIQUE AUTO_INCREMENT,
    gameSection VARCHAR(4) NOT NULL,
    gameInstructor VARCHAR(32) NOT NULL,
    gameAdminPassword VARCHAR(32) NOT NULL,
    gameActive INT(1) NOT NULL DEFAULT 0,
    game0Password VARCHAR(32) NOT NULL DEFAULT '5f4dcc3b5aa765d61d8327deb882cf99',
    game1Password VARCHAR(32) NOT NULL DEFAULT '5f4dcc3b5aa765d61d8327deb882cf99',
    game0Controller0 INT(1) NOT NULL DEFAULT 0,
    game0Controller1 INT(1) NOT NULL DEFAULT 0,
    game0Controller2 INT(1) NOT NULL DEFAULT 0,
    game0Controller3 INT(1) NOT NULL DEFAULT 0,
    game1Controller0 INT(1) NOT NULL DEFAULT 0,
    game1Controller1 INT(1) NOT NULL DEFAULT 0,
    game1Controller2 INT(1) NOT NULL DEFAULT 0,
    game1Controller3 INT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY(gameId)
) AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS pieces (
	pieceId INT(8) NOT NULL AUTO_INCREMENT,
    pieceGameId INT(3) NOT NULL,
    pieceTeamId INT(1) NOT NULL,
    pieceUnitId INT(2) NOT NULL,
    piecePositionId INT(4) NOT NULL,
    pieceContainerId INT(8) NOT NULL,
    pieceVisible INT(1) NOT NULL,
    pieceMoves INT(2) NOT NULL,
    pieceFuel INT(2) NOT NULL,
    PRIMARY KEY(pieceId)
) AUTO_INCREMENT=1;