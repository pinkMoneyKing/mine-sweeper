import React, { PureComponent, Component } from 'react';
import Row									from './Row';
import Cell									from './Cell';
import Board								from './Board';
import { connect }					from 'react-redux';
import { 
	addRow,
	clearBoard,
	updateCell,
}														from '../redux/actions';
import Immutable						from 'immutable';


const mapStateToProps = (state) => {
	return {
		level: state.get('level'),
		board: state.get('board'),
		mines: state.get('mines'),
		mine_positions: state.get('mine_positions'),
	}	
}

const mapDispathToProps = (dispatch) => {
	return {
		addRowDisptach: (row) => {
			dispatch(addRow(row))
		},
		clearBoardDispatch: () => {
			dispatch(clearBoard())
		},
		updateCellDispatch: (position, id) => {
			dispatch(updateCell(position, id))
		},
	}
}


@connect(mapStateToProps, mapDispathToProps)
export default class MineSweeper extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading_board: true,
			// level: "BEGINNER",
			// mines: 10,
			// board: [],
		}
		this.setbuildingBoard = this.setbuildingBoard.bind(this);
		this.buildBoard = this.buildBoard.bind(this);
		this.setMines = this.setMines.bind(this);
		this.switchLevels = this.switchLevels.bind(this);
		this.initGame = this.initGame.bind(this);
	}

	setbuildingBoard(board){
		return this.setState({loading_board: board});
	}

	setMines(){
		let placed = 0;
		const {
			board,
			mines,
			mine_positions,
			updateCellDispatch,
		} = this.props;
		const loading_board = this.state.loading_board;
		if(!loading_board){
			while(placed != mines) {
				const column = Math.floor(Math.random() * board.size);
				const row = Math.floor(Math.random() * board.size);
				const new_mine = board.getIn([row, column], 'position not found');
				const mine_id = new_mine.get('id');
				if(!mine_positions.includes(mine_id)){
					//Add mine
					const position = Immutable.fromJS({row: row, column: column});
					const id = mine_id;
					updateCellDispatch(position, id);
					placed++;
				}
			}
		}
			// console.log('MINE ', board[row][column])
			// console.log('MINE ', board)
			// placed++
	}


	buildBoard(board){
		const addRowDisptach = this.props.addRowDisptach;
		const rows = board.height;
		const columns = board.width;
		for (let row = 0; row <= rows; row++){
			let row_array = Immutable.List();
			for (let column = 0; column <= columns; column++){
				const cell = Immutable.fromJS({
					id: row + "-" + column,
					content: 'EMPTY',
					status: 'HIDDEN',
					});
				row_array = row_array.set(row_array.size, cell);

			}
			// console.log('row_array : ', row_array);
			addRowDisptach(row_array);
			// this.setMines(rows, columns);
		}

		const board_state = this.props.board;
		this.setbuildingBoard(false);
	}


	switchLevels(level){
		switch(level){
				case 'BEGINNER':
					let board = {
						mines: 10,
						width: 9,
						height: 9,
					};
					this.buildBoard(board);
					break;
				case 'INTERMEDIATE':
					board = {
						mines: 40,
						width: 18,
						height: 18,
					};
					this.buildBoard(board);
					break;
				case 'EXPERT':
					board = {
						mines: 99,
						width: 26,
						height: 26,
					};
					this.buildBoard(board);
					break;
				default:
					board = {
						mines: 10,
						width: 9,
						height: 9,
					};
					this.buildBoard(board);
					break;
		}
	}

	initGame(){
		const {
			level,
			clearBoardDispatch
			} = this.props;
		clearBoardDispatch();
		const buildBoard = new Promise((resolve, reject) => {
			resolve(this.switchLevels(level));
		});
		// this.switchLevels(level);
		buildBoard.then(() => {
			this.setMines();
		});
	}



	componentDidMount(){
		this.initGame();
	}

	render() {
		return(
			<div>
				<Board />
			</div>
		)
	}
}


// mapStateToProps = (state) => {
// 	return;
// }

// mapDispathToProps = (dispatch) => {
// 	return {
// 		addRowDisptach: (row) => {
// 			dispatch(addRow(row))
// 		}
// 	}
// }

// export default MineSweeper;
