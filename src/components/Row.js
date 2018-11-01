import React, { PureComponent } from 'react';
import Cell									from './Cell';


const RowStyled = {
	display: 'flex',
	border: '2px solid pink',
}

class Row extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			id: null,
			type: 'BLANK',
		}
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
							key={cell.id}
							cell_state={cell}
						/>)
					})}
				</div>
		);
	}
}


export default Row;

