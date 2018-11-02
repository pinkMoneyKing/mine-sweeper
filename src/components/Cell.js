import React, { Component } from 'react';


class Cell extends Component {
	constructor(props){
		super(props);
	}

	render(){
		const {
			cell_state	
		} = this.props;
		console.log('cell_state', cell_state.toJS());
		return (
			<div>
				{cell_state.get('content', 'no id found')}
			</div>
		);
	}
}


export default Cell;

