import React, { PureComponent, Component } from 'react';
import Row									from './Row';
import Cell									from './Cell';


class MineSweeper extends Component {
	constructor(props){
		super(props);
		this.state = {
			level: "BEGINNER",
			mines: 10,
			board: [],
		}
		this.buildBoard = this.buildBoard.bind(this);
		this.switchLevels = this.switchLevels.bind(this);
		this.setBoardObject = this.setBoardObject.bind(this);
		this.setMines = this.setMines.bind(this);
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
		const rows = board.height;
		const columns = board.width;
		for (let row = 0; row <= rows; row++){
			let row_array = [];
			for (let column = 1; column <= columns; column++){
				const cell = {
					id: row + "-" + column,
					content: null,
					}
				row_array.push(cell);
			}
			this.setBoardObject(row_array);
			this.setMines(rows, columns);
		}
	}

	setBoardObject(row){
		const new_board = this.state.board;
		new_board.push(row);
		this.setState({board: new_board});
	}

	switchLevels(level=this.state.level){
		switch(level){
				case 'BEGINNER':
					console.log('beginner');
					let board = {
						mines: 10,
						width: 9,
						height: 9,
					};
					console.log('board', board);
					this.buildBoard(board);
					break;
				case 'INTERMEDIATE':
					console.log('intermediate');
					board = {
						mines: 40,
						width: 18,
						height: 18,
					};
					this.buildBoard(board);
					break;
				case 'EXPERT':
					console.log('EXPERT');
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



	componentDidMount(){
		this.switchLevels();
	}

	render() {
		if(this.state.board.length != 0){
			return(
				<div>
					{this.state.board.map((row, index) => {
						return (
							<Row
								key={'row' + index}
								row={row}/>
							);
					})}
				</div>
			)
		} else {
			console.log(this.state.board.length);
			return (
				<div>
					loading
				</div>
			)
		}
	}
}


export default MineSweeper;
