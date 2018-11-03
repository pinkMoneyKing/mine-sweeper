import React, { Component } from 'react';
import mineImage						from '../images/mine.png';
import blankImage						from '../images/blank.png';
import oneImage						from '../images/1.png';
import twoImage						from '../images/2.png';
import threeImage						from '../images/3.png';


class Cell extends Component {
	constructor(props){
		super(props);
	}

	render(){
		const {
			cell_state	
		} = this.props;
		const cell_content = cell_state.get('content');
		if(cell_content === 'MINE'){
			return (
				<img src={mineImage} />
			)
		} else if (cell_content === 0){
			return (
				<img src={blankImage} />
			)
		} else if (cell_content === 1){
			return (
				<img src={oneImage} />
			)
		} else if (cell_content === 2){
			return (
				<img src={twoImage} />
			)
		} else if (cell_content === 3){
			return (
				<img src={threeImage} />
			)
		} else {
			return (
				<div>
					test
				</div>
			)
		}
	}
}


export default Cell;

