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
			id
		} = this.props;
		console.log('id', id);
		return (
			<div>
				{id}
			</div>
		);
	}
}


export default Cell;

