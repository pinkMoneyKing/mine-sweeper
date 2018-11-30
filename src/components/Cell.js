import React, { Component } from 'react';
import ImageComponent				from './Image';
import Immutable						from 'immutable';
import { connect }					from 'react-redux';
import { 
	updateCell,
}														from '../redux/actions';


const mapStateToProps = (state) => {
	return {
		board: state.get('board'),
		mine_positions: state.get('mine_positions'),
	}	
}

const mapDispathToProps = (dispatch) => {
	return {
		updateCellDispatch: (position, id, key, value) => {
			dispatch(updateCell(position, id, key, value))
		},
	}
}


@connect(mapStateToProps, mapDispathToProps)
export default class Cell extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.revealCell = this.revealCell.bind(this);
		this.returnCell = this.returnCell.bind(this);
		this.checkForEmptyCell = this.checkForEmptyCell.bind(this);
		this.emptyCellLoop = this.emptyCellLoop.bind(this);
	}

	checkForEmptyCell(row, column){
		const { board } = this.props;
		const content = board.getIn([row, column, 'content']);
		return (content === 0);
	}
	returnCell(row, column){
		const { board } = this.props;
		const cell = board.getIn([row, column]);
		return cell;
	}

	revealCell(cell){
		const { updateCellDispatch, board } = this.props;
		const id = cell.get('id');
		const position = Immutable.fromJS({
			row: cell.get('row'),
			column: cell.get('column')
		});	
		const updateCellPromise = new Promise((resolve, reject) => {
			resolve(updateCellDispatch(position, id, 'status', 'REVEALED'));
		})
		if(cell.get('status') === 'HIDDEN'){
			updateCellPromise.then(() => {
				if(this.checkForEmptyCell(cell.get('row'), cell.get('column'))){
					this.emptyCellLoop(cell);
				}
			})
		}
	}

	emptyCellLoop(cell){
		const { board } = this.props;
		const board_length = board.toJS().length;
		if(cell.get('column') != 0){
			const cell_to_reveal = board.getIn([cell.get('row'), (cell.get('column')-1)]);
			this.revealCell(cell_to_reveal);
		}
		if(cell.get('column') != board_length){ 
			const cell_to_reveal = board.getIn([cell.get('row'), (cell.get('column')+1)]);
			this.revealCell(cell_to_reveal);
		}
		if(cell.get('row') != 0){ 
			if(cell.get('column') != 0){
				const cell_to_reveal = board.getIn([cell.get('row')-1, (cell.get('column')-1)]);
				this.revealCell(cell_to_reveal);
			}
			if(cell.get('column') != board_length){ 
				const cell_to_reveal = board.getIn([cell.get('row')-1, (cell.get('column')+1)]);
				this.revealCell(cell_to_reveal);
			}
		}
		if(cell.get('row') != board_length){ 
			if(cell.get('column') != 0){
				const cell_to_reveal = board.getIn([cell.get('row')+1, (cell.get('column')-1)]);
				this.revealCell(cell_to_reveal);
			}
			if(cell.get('column') != board_length){ 
				const cell_to_reveal = board.getIn([cell.get('row')+1, (cell.get('column')+1)]);
				this.revealCell(cell_to_reveal);
			}
		}
	}

	handleClick(cell){
		const id = cell.get('id');
		const cell_status = cell.get('status');
		const cell_content = cell.get('content');
		const { updateCellDispatch } = this.props;
		if(cell_status === 'REVEALED'){
			console.log('revealed');
			return;
		} else if (cell_content === 'MINE'){
			console.log('mine');
		} else {
			this.revealCell(cell);
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
