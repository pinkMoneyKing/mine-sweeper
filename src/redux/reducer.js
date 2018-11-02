import Immutable from "immutable";

const UPDATE_CELL		= 'UPDATE_CELL';
const ADD_ROW				= 'ADD_ROW';		
const ADD_MINE			= 'ADD_MINE';		
const CHANGE_LEVEL	= 'CHANGE_LEVEL';
const CLEAR_BOARD		= 'CLEAR_BOARD';


const initialState = Immutable.fromJS({
	level: "BEGINNER",
	mines: 10,
	rows: 9,
	columns: 9,
	board: Immutable.List([]),
	mine_positions: Immutable.List([]),
});

export function mineSweeper(state = initialState, action){
	switch(action.type){
			case CLEAR_BOARD:
				return state.set('board', Immutable.List([]));
			case ADD_ROW:
				return state.update('board', boardList => boardList.push(action.row));
			case ADD_MINE:
				return state.update('mine_positions', mineList => mineList.push(action.mine));
			case UPDATE_CELL:
				const row = action.position.get('row');
				const column = action.position.get('column');
				return state.update('board', boardList =>  boardList.setIn([row, column, 'content'], 'MINE'));

			default:
				return state;
		}	
}


