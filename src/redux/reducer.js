const ADD_CELL			= 'ADD_CELL';
const ADD_ROW				= 'ADD_ROW';		
const ADD_MINE			= 'ADD_MINE';		
const CHANGE_LEVEL	= 'CHANGE_LEVEL';


const initialState = {
	level: "BEGINNER",
	mines: 10,
	rows: 9,
	columns: 9,
	board: [],
	mine_positions: [],
}	

export function mineSweeper(state = initialState, action){
	switch(action.type){
			case ADD_ROW:
				return Object.assign({}, state, {
					board: [
						...state.board,
						[row]
					]
				})
			default:
				return state;
			}	
	}


