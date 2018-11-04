import React, { Component } from 'react';
import ImageComponent				from './Image';
import Immutable						from 'immutable';
import { connect }					from 'react-redux';
import { 
	addRow,
	clearBoard,
	updateCell,
	addMine,
	changeLevel,
}														from '../redux/actions';

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

export default class Cell extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.revealCell = this.revealCell.bind(this);
	}
	revealCell(position, cell){
		const { updateCellDispatch } = this.props;
		const id = cell.get('id');
		updateCellDispatch(position, id, 'status', 'REVEALED');
	}

	handleClick(cell){
		const id = cell.get('id');
		const { updateCellDispatch } = this.props;
		const cell_content = cell.get('content');
		const position = Immutable.fromJS({
			row: id[0],
			column: id[2]
		});
		if(cell_content != 'MINE'){
			this.revealCell(position, cell);
		} else if (cell_content === 'MINE'){
			updateCellDispatch(position, id, 'content', 'BOMB');
			this.revealCell(position, cell);
		}
	}
	render(){
		const {
			cell_state	
		} = this.props;
		const cell_content = cell_state.get('content');
		const status = cell_state.get('status');
		const id = cell_state.get('id');
		if(status === 'REVEALED'){
			return( <ImageComponent 
				cell_state={cell_state}
				cell_content={cell_content} 
				handleClick={this.handleClick}
			/>);
		} else {
			return( <ImageComponent 
				cell_state={cell_state}
				cell_content={'HIDDEN'} 
				handleClick={this.handleClick}
			/>);
		}
	}
}
