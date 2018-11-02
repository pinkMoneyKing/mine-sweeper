const ADD_CELL			= 'ADD_CELL';
const ADD_ROW				= 'ADD_ROW';		
const ADD_MINE			= 'ADD_MINE';		
const CHANGE_LEVEL	= 'CHANGE_LEVEL';
const CLEAR_BOARD		= 'CLEAR_BOARD';


export function addCell(cell){
	return {
		type: ADD_CELL,
		cell
	}
}

export function addRow(row){
	console.log('adding row action : ', row.toJS());
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
