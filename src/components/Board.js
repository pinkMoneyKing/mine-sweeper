import React, { PureComponent } from 'react';
import Cell											from './Cell';
import { connect }							from 'react-redux';
import Immutable								from 'immutable';
import Row									from './Row';


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
