import React, { PureComponent, Component } from 'react';
import Row									from './Row';
import Cell									from './Cell';
import Board								from './Board';
import { connect }					from 'react-redux';
import { 
	addRow,
	clearBoard
}														from '../redux/actions';
import Immutable						from 'immutable';


const mapStateToProps = (state) => {
	return {
		level: state.get('level'),
	}	
}

const mapDispathToProps = (dispatch) => {
	return {
		addRowDisptach: (row) => {
			dispatch(addRow(row))
		},
		clearBoardDispatch: () => {
			dispatch(clearBoard())
		}
	}
}


@connect(mapStateToProps, mapDispathToProps)
export default class MineSweeper extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading_game: true,
			// level: "BEGINNER",
			// mines: 10,
			// board: [],
		}
		this.setLoadingGame = this.setLoadingGame.bind(this);
		this.buildBoard = this.buildBoard.bind(this);
		this.setMines = this.setMines.bind(this);
		this.switchLevels = this.switchLevels.bind(this);
		this.initGame = this.initGame.bind(this);
	}

	setLoadingGame(game_state){
		return this.setState({loading_game: game_state});
	}

	setMines(rows, columns){
		let placed = 0;
		const mines = this.state.mines;
		const board = this.state.board;
		if(board[3] === undefined){
			return;
		}
		const temp = board[3];
		console.log('mines ', temp[0]);
		// const column = Math.floor(Math.random() * columns);
		// const row = Math.floor(Math.random() * rows);
		// console.log('MINE ', board[row][column])
		// do {
		// 	const column = Math.floor(Math.random() * columns);
		// 	const row = Math.floor(Math.random() * rows);
			// console.log('MINE ', board[row][column])
			// console.log('MINE ', board)
			// placed++
		// } while (placed != mines);
	}


	buildBoard(board){
		const addRowDisptach = this.props.addRowDisptach;
		const rows = board.height;
		const columns = board.width;
		for (let row = 0; row <= rows; row++){
			let row_array = Immutable.List();
			for (let column = 1; column <= columns; column++){
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
		this.setLoadingGame(false);
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
		this.switchLevels(level);
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
