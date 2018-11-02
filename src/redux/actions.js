const UPDATE_CELL		= 'UPDATE_CELL';
const ADD_ROW				= 'ADD_ROW';		
const ADD_MINE			= 'ADD_MINE';		
const CHANGE_LEVEL	= 'CHANGE_LEVEL';
const CLEAR_BOARD		= 'CLEAR_BOARD';


export function updateCell(position, id){
	return {
		type: UPDATE_CELL,
		position,
		id
	}
}

export function addRow(row){
	return {
		type: ADD_ROW,
		row
	}
}

export function addMine(mine){
	return {
		type: ADD_MINE,
		mine
	}
}

export function changeLevel(level){
	return {
		type: CHANGE_LEVEL,
		level
	}
}

export function clearBoard(){
	console.log('clearing board');
	return {
		type: CLEAR_BOARD,
	}
}
