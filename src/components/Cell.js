import React, { Component } from 'react';


class Cell extends Component {
	constructor(props){
		super(props);
	}

	render(){
		const {
			cell_state	
		} = this.props;
		return (
			<div>
				{cell_state.get('id', 'no id found')}
			</div>
		);
	}
}


export default Cell;

