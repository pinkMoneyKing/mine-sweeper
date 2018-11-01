import React, { PureComponent, Component } from 'react';
import Row									from './Board';
import Cell									from './Cell';


class MineSweeper extends Component {
	constructor(props){
		super(props);
		this.state = {
			level: "BEGINNER",
			board: [],
		}
		this.buildBoard = this.buildBoard.bind(this);
		this.returnCell = this.returnCell.bind(this);
		this.switchLevels = this.switchLevels.bind(this);
		this.setBoardObject = this.setBoardObject.bind(this);
	}

	setBoardObject(row){
		const old_board = this.state.board;
		old_board.push([row]);
		this.setState({board: old_board});
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

	returnCell(id){
		console.log('cell id', id);
		return ( <Cell id={id} /> );
	}

	buildBoard(board){
		for (let row = 0; row <= board.height; row++){
			let row_array = [];
			for (let column = 0; column <= board.width; column++){
				const id = row + "-" + column;
				row_array.push(id);
			}
			this.setBoardObject(row_array);
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
						console.log('index', index);
						return (
							<Row
								key={'row' + index}
								row={row[0]}/>
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
