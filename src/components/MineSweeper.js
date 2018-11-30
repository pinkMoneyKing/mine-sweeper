import React, { PureComponent, Component } from 'react';
import Board								from './Board';
import Immutable						from 'immutable';
import { connect }					from 'react-redux';
import { 
	addRow,
	clearBoard,
	updateCell,
	addMine,
	changeLevel,
}														from '../redux/actions';


const BoardClass = {
	display: 'flex',
	justifyContent: 'center',
	marginTop: '5em',
}

const mapStateToProps = (state) => {
	return {
		difficulty: state.getIn(['level', 'difficulty'], 'BEGINNER'),
		board: state.get('board'),
		mines: state.getIn(['level', 'mines'], 10),
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
		updateCellDispatch: (position, id, key, value) => {
			dispatch(updateCell(position, id, key, value))
		},
		addMineDispatch: (mine_id) => {
			dispatch(addMine(mine_id))
		},
		changeLevelDispatch: (level) => {
			dispatch(changeLevel(level))
		},
	}
}


@connect(mapStateToProps, mapDispathToProps)
export default class MineSweeper extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading_board: true,
		}
		this.buildBoard = this.buildBoard.bind(this);
		this.setMines = this.setMines.bind(this);
		this.setProximityMineCount = this.setProximityMineCount.bind(this);
		this.switchLevels = this.switchLevels.bind(this);
		this.initGame = this.initGame.bind(this);
		this.setLevel = this.setLevel.bind(this);
		this.returnMineCount = this.returnMineCount.bind(this);
		this.setLoadingStatus = this.setLoadingStatus.bind(this);
	}

	setLoadingStatus(status){
		this.setState({loading_board: status});
	}

	returnMineCount(row, column){
		const board = this.props.board;
		if(board.getIn([row, column, 'content']) === 'MINE'){
			return 1;
		} else {
			return 0;
		}
	}

	setProximityMineCount(){
		const {
			board,
			updateCellDispatch,
		} = this.props;

		board.map((row, row_index) => {
			row.map((column, column_index) => {
				const cell_id = column.get('id');
				const mine_count = (
					this.returnMineCount(row_index-1, column_index-1) +
					this.returnMineCount(row_index-1, column_index) +
					this.returnMineCount(row_index-1, column_index+1) +
					this.returnMineCount(row_index, column_index-1) +
					this.returnMineCount(row_index, column_index+1) +
					this.returnMineCount(row_index+1, column_index-1) +
					this.returnMineCount(row_index+1, column_index) +
					this.returnMineCount(row_index+1, column_index+1)
				);
				if(column.get('content') != 'MINE'){
					const position = Immutable.fromJS({row: row_index, column: column_index});
					updateCellDispatch(position, cell_id, 'content', mine_count);
				}
			});
		});
		this.setLoadingStatus(false);
	}

	setLevel(level){
		changeLevelDispatch(level);
	}

	setMines(){
		let placed = 0;
		const {
			board,
			mines,
			mine_positions,
			updateCellDispatch,
			addMineDispatch,
		} = this.props;
		const loading_board = this.state.loading_board;
		while(placed != mines) {
			const column = Math.floor(Math.random() * board.size);
			const row = Math.floor(Math.random() * board.size);
			const new_mine = board.getIn([row, column], 'position not found');
			const mine_id = new_mine.get('id');
			if(!mine_positions.includes(mine_id)){
				const position = Immutable.fromJS({row: row, column: column});
				const id = mine_id;
				updateCellDispatch(position, id, 'content', 'MINE');
				addMineDispatch(id);
				placed++;
				}
			}
		}


	buildBoard(board){
		const addRowDisptach = this.props.addRowDisptach;
		const rows = board.rows;
		const columns = board.columns;
		for (let row = 0; row <= rows; row++){
			let row_array = Immutable.List();
			for (let column = 0; column <= columns; column++){
				const cell = Immutable.fromJS({
					id: row + "-" + column,
					content: 'EMPTY',
					status: 'HIDDEN',
					row: row,
					column: column
					});
				row_array = row_array.set(row_array.size, cell);

				}
			addRowDisptach(row_array);
			}

		const board_state = this.props.board;
		}


	switchLevels(level='BEGINNER'){
		const { changeLevelDispatch } = this.props;
		switch(level){
				case 'BEGINNER':
					let board = {
						difficulty: 'BEGINNER',
						mines: 10,
						rows: 9,
						columns: 9,
						};
				changeLevelDispatch(Immutable.fromJS(board));
				this.buildBoard(board);
				break;
				case 'INTERMEDIATE':
					board = {
						difficulty: 'INTERMEDIATE',
						mines: 40,
						rows: 18,
						columns: 18,
						};
				changeLevelDispatch(Immutable.fromJS(board));
				this.buildBoard(board);
				break;
				case 'EXPERT':
					board = {
						difficulty: 'EXPERT',
						mines: 99,
						rows: 26,
						columns: 26,
						};
				changeLevelDispatch(Immutable.fromJS(board));
				this.buildBoard(board);
				break;
				default:
					board = {
						level: 'BEGINNER',
						mines: 10,
						rows: 9,
						columns: 9,
						};
				this.buildBoard(board);
				break;
				}
		}

	initGame(){
		const {
			difficulty,
			clearBoardDispatch
			} = this.props;
		clearBoardDispatch();
		const buildBoard = new Promise((resolve, reject) => {
			resolve(this.switchLevels(difficulty));
			});
		buildBoard.then(() => {
			this.setMines();
			this.setProximityMineCount();
			});
		}

	componentDidMount(){
		this.initGame();
		}

	render() {
		const { board } = this.props;
		if(this.state.loading_board){
			return(
				<div>
					loading Game
				</div>
			);
			} else {
				return(
					<div style={BoardClass}>
						<Board board={board} />
					</div>
				)
			}
	}
}
