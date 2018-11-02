import Immutable from "immutable";

const UPDATE_CELL		= 'UPDATE_CELL';
const ADD_ROW				= 'ADD_ROW';		
const ADD_MINE			= 'ADD_MINE';		
const CHANGE_LEVEL	= 'CHANGE_LEVEL';
const CLEAR_BOARD		= 'CLEAR_BOARD';


const initialState = Immutable.fromJS({
	level: Immutable.fromJS({
		difficulty: "BEGINNER",
		mines: null,
		rows: null,
		columns: null,
	}),
	board: Immutable.List([]),
	mine_positions: Immutable.List([]),
});

export function mineSweeper(state = initialState, action){
	switch(action.type){
			case CLEAR_BOARD:
				return initialState;
			case ADD_ROW:
				return state.update('board', boardList => boardList.push(action.row));
			case ADD_MINE:
				return state.update('mine_positions', mineList => mineList.push(action.mine_id));
			case UPDATE_CELL:
				const row = action.position.get('row');
				const column = action.position.get('column');
				return state.update('board', boardList =>  boardList.setIn([row, column, 'content'], action.content));

			case CHANGE_LEVEL:
				return state.set('level', action.level);
			default:
				return state;
		}	
}


