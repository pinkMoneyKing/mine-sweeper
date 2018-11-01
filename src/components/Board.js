import React, { PureComponent } from 'react';
import Cell									from './Cell';

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
				<div>
					{row.map(column => {
						return (<Cell
							key={column}
							id={column}
						/>)
					})}
				</div>
		);
	}
}


export default Row;

