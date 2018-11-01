import React, { Component } from 'react';


class Cell extends Component {
	constructor(props){
		super(props);
		this.state = {
			id: null,
			type: 'BLANK',
		}
	}

	render(){
		const {
			cell_state	
		} = this.props;
		// console.log('cell_state', cell_state);
		return (
			<div>
				{cell_state.id}
			</div>
		);
	}
}


export default Cell;

