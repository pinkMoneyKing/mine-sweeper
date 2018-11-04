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
	}
	handleClick(id){
		const { updateCellDispatch } = this.props;
		const position = Immutable.fromJS({
			row: id[0],
			column: id[2]
		});
		updateCellDispatch(position, id, 'status', 'REVEALED');
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
				id={id}
				cell_content={cell_content} 
				handleClick={this.handleClick}
			/>);
		} else {
			return( <ImageComponent 
				id={id}
				cell_content={'HIDDEN'} 
				handleClick={this.handleClick}
			/>);
		}
	}
}
