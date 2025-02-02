const { Plan, Piece, Event } = require("../classes");
import { PLACE_PHASE, NEW_ROUND } from "../../client/src/redux/actions/actionTypes";
import { SERVER_SENDING_ACTION } from "../../client/src/redux/socketEmits";
const giveNextEvent = require("./giveNextEvent");
const { BOTH_TEAMS_INDICATOR, POS_BATTLE_EVENT_TYPE, COL_BATTLE_EVENT_TYPE, REFUEL_EVENT_TYPE } = require("./eventConstants");

const executeStep = async (socket, thisGame) => {
	//inserting events here and moving pieces, or changing to new round or something...
	const { gameId, gameRound } = thisGame;

	//TODO: rename this to 'hadPlans0' or something more descriptive
	const currentMovementOrder0 = await Plan.getCurrentMovementOrder(gameId, 0);
	const currentMovementOrder1 = await Plan.getCurrentMovementOrder(gameId, 1);

	//No More Plans for either team
	//DOESN'T MAKE PLANS FOR PIECES STILL IN THE SAME POSITION...NEED TO HAVE AT LEAST 1 PLAN FOR ANYTHING TO HAPPEN (pieces in same postion would battle (again?) if there was 1 plan elsewhere...)
	if (currentMovementOrder0 == null && currentMovementOrder1 == null) {
		await thisGame.setSlice(0); //if no more moves, end of slice 1

		let serverAction;
		if (gameRound == 2) {
			await thisGame.setRound(0);
			await thisGame.setPhase(3);

			//Combat -> Place Phase
			serverAction = {
				type: PLACE_PHASE,
				payload: {}
			};
		} else {
			await thisGame.setRound(gameRound + 1);

			serverAction = {
				type: NEW_ROUND,
				payload: {
					gameRound: thisGame.gameRound
				}
			};
		}

		socket.to("game" + gameId).emit(SERVER_SENDING_ACTION, serverAction);
		socket.emit(SERVER_SENDING_ACTION, serverAction);
		return;
	}

	//One of the teams may be without plans, keep them waiting
	if (currentMovementOrder0 == null) {
		await thisGame.setStatus(0, 1);
	}
	if (currentMovementOrder1 == null) {
		await thisGame.setStatus(1, 1);
	}

	let currentMovementOrder = currentMovementOrder0 != null ? currentMovementOrder0 : currentMovementOrder1;

	//Collision Battle Events
	const allCollisions = await Plan.getCollisions(gameId, currentMovementOrder); //each item in collisionBattles has {pieceId0, pieceTypeId0, pieceContainerId0, piecePositionId0, planPositionId0, pieceId1, pieceTypeId1, pieceContainerId1, piecePositionId1, planPositionId1 }
	if (allCollisions.length > 0) {
		let allCollideEvents = {}; //'position0-position1' => [piecesInvolved]

		for (let x = 0; x < allCollisions.length; x++) {
			let { pieceId0, piecePositionId0, planPositionId0, pieceId1 } = allCollisions[x];

			//TODO: figure out if these 2 pieces would actually collide / battle (do the same for position battles)
			//consider visibility

			let thisEventPositions = `${piecePositionId0}-${planPositionId0}`;
			if (!Object.keys(allCollideEvents).includes(thisEventPositions)) allCollideEvents[thisEventPositions] = [];
			if (!allCollideEvents[thisEventPositions].includes(pieceId0)) allCollideEvents[thisEventPositions].push(pieceId0);
			if (!allCollideEvents[thisEventPositions].includes(pieceId1)) allCollideEvents[thisEventPositions].push(pieceId1);
		}

		let eventInserts = [];
		let eventItemInserts = [];
		let keys = Object.keys(allCollideEvents);
		for (let b = 0; b < keys.length; b++) {
			let key = keys[b];
			eventInserts.push([gameId, BOTH_TEAMS_INDICATOR, COL_BATTLE_EVENT_TYPE, key.split("-")[0], key.split("-")[1]]);
			let eventPieces = allCollideEvents[key];
			for (let x = 0; x < eventPieces.length; x++) eventItemInserts.push([eventPieces[x], gameId, key.split("-")[0], key.split("-")[1]]);
		}

		await Event.bulkInsertEvents(eventInserts);
		await Event.bulkInsertItems(gameId, eventItemInserts);
	}

	await Piece.move(gameId, currentMovementOrder); //changes the piecePositionId, deletes the plan, all for specialflag = 0
	await Piece.updateVisibilities(gameId);

	//Position Battle Events
	const allPositionCombinations = await Plan.getPositionCombinations(gameId);
	if (allPositionCombinations.length > 0) {
		let allPosEvents = {};
		for (let x = 0; x < allPositionCombinations.length; x++) {
			let { pieceId0, piecePositionId0, pieceId1 } = allPositionCombinations[x];

			//consider if they would fight (see collision)
			//consider visibility

			let thisEventPosition = `${piecePositionId0}`;
			if (!Object.keys(allPosEvents).includes(thisEventPosition)) allPosEvents[thisEventPosition] = [];
			if (!allPosEvents[thisEventPosition].includes(pieceId0)) allPosEvents[thisEventPosition].push(pieceId0);
			if (!allPosEvents[thisEventPosition].includes(pieceId1)) allPosEvents[thisEventPosition].push(pieceId1);
		}

		let eventInserts = [];
		let eventItemInserts = [];
		let keys = Object.keys(allPosEvents);
		for (let b = 0; b < keys.length; b++) {
			let key = keys[b];
			eventInserts.push([gameId, BOTH_TEAMS_INDICATOR, POS_BATTLE_EVENT_TYPE, key, key]);
			let eventPieces = allPosEvents[key];
			for (let x = 0; x < eventPieces.length; x++) eventItemInserts.push([eventPieces[x], gameId, key, key]);
		}

		await Event.bulkInsertEvents(eventInserts);
		await Event.bulkInsertItems(gameId, eventItemInserts);
	}

	// TODO: Refuel Events (special flag? / proximity) (check to see that the piece still exists!*!*) (still have plans from old pieces that used to exist? (but those would delete on cascade probaby...except the events themselves...))

	//should not do refuel events if the team didn't have any plans for this step (TODO: prevent refuel stuff for team specific things)

	//refueling is team specific (loop through 0 and 1 teamIds)
	const teamHadPlans = [currentMovementOrder0 == null ? 0 : 1, currentMovementOrder1 == null ? 0 : 1];
	for (let thisTeamNum = 0; thisTeamNum < 2; thisTeamNum++) {
		if (teamHadPlans[thisTeamNum]) {
			//refuel events if they had plans for this step, otherwise don't want to refuel stuff for no plans (possibly will do it anyway)
			//need to grab all refuel events from database, looking at pieces in the same positions
			let allPositionRefuels = await Piece.getPositionRefuels(gameId, thisTeamNum);
			if (allPositionRefuels.length > 0) {
				let allPosEvents = {};
				for (let x = 0; x < allPositionRefuels.length; x++) {
					// tnkrPieceId, tnkrPieceTypeId, tnkrPiecePositionId, tnkrPieceMoves, tnkrPieceFuel, arcftPieceId, arcftPieceTypeId, arcftPiecePositionId, arcftPieceMoves, arcftPieceFuel
					//prettier-ignore
					let { tnkrPieceId, tnkrPiecePositionId, arcftPieceId } = allPositionRefuels[x];

					let thisEventPosition = `${tnkrPiecePositionId}`;
					if (!Object.keys(allPosEvents).includes(thisEventPosition)) allPosEvents[thisEventPosition] = [];
					if (!allPosEvents[thisEventPosition].includes(tnkrPieceId)) allPosEvents[thisEventPosition].push(tnkrPieceId);
					if (!allPosEvents[thisEventPosition].includes(arcftPieceId)) allPosEvents[thisEventPosition].push(arcftPieceId);
				}

				let eventInserts = [];
				let eventItemInserts = [];
				let keys = Object.keys(allPosEvents);
				for (let b = 0; b < keys.length; b++) {
					let key = keys[b];
					eventInserts.push([gameId, thisTeamNum, REFUEL_EVENT_TYPE, key, key]);
					let eventPieces = allPosEvents[key];
					for (let x = 0; x < eventPieces.length; x++) eventItemInserts.push([eventPieces[x], gameId, key, key]);
				}

				await Event.bulkInsertEvents(eventInserts);
				await Event.bulkInsertItems(gameId, eventItemInserts);
			}
		}
	}

	// TODO: Container Events (special flag)

	// Note: All non-move (specialflag != 0) plans should result in events (refuel/container)...
	// If there is now an event, send to user instead of PIECES_MOVE

	// await giveNextEvent(socket, { thisGame, executingStep: true });
	await giveNextEvent(socket, { thisGame, executingStep: true, gameTeam: 0 });
	await giveNextEvent(socket, { thisGame, executingStep: true, gameTeam: 1 });
};

module.exports = executeStep;
