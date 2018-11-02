import React, { PureComponent } from 'react';
import Cell									from './Cell';
import Immutable								from 'immutable';


const RowStyled = {
	display: 'flex',
	border: '2px solid pink',
}


class Row extends PureComponent {
	constructor(props){
		super(props);
	}

	render(){
		const {
			row
		} = this.props;
			return (		
			<div
				style={RowStyled}>
					{row.map(cell => {
						return (<Cell
							key={cell.get('id', 'no id found')}
							cell_state={cell}
						/>)
					})}
				</div>
		);
	}
}


export default Row;

