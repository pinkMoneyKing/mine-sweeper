import React, { PureComponent } from 'react';
import Cell											from './Cell';
import { connect }							from 'react-redux';
import Immutable								from 'immutable';
import Row									from './Row';


const mapStateToProps = (state) => {
	return {
		board: state.get('board', Immutable.List())
	}
}

@connect(mapStateToProps)
export default class Board extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			id: null,
			type: 'BLANK',
		}
	}

	render(){
		const {
			board
		} = this.props;
			console.log('board', board.toJS());
			return (		
				<div>
					{board.map((row, index) => {
						return (
							<Row
								key={index}
								row={row}/>
							);
					})}
				</div>
		);
	}
}
