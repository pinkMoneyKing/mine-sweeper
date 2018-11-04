import React								from 'react';
import mineImage						from '../images/mine.png';
import misplacedImage				from '../images/misplaced.png';
import flagImage						from '../images/flag.png';
import hiddenImage					from '../images/hidden.png';
import questionImage				from '../images/question.png';
import blankImage						from '../images/blank.png';
import oneImage							from '../images/1.png';
import twoImage							from '../images/2.png';
import threeImage						from '../images/3.png';
import fourImage						from '../images/4.png';
import fiveImage						from '../images/5.png';
import sixImage							from '../images/6.png';
import sevenImage						from '../images/7.png';
import eightImage						from '../images/8.png';


export default function ImageComponent({
	cell_content,
	handleClick,
	cell_state
}){
	const id = cell_state.get('id');
	switch(cell_content){
			case 'MINE': return( <img 
				onClick={() => handleClick(cell_state)}
				src={mineImage} /> )
			case 'BOMB': return( <img 
				onClick={() => handleClick(cell_state)}
				src={misplacedImage} /> )
			case 'FLAG': return( <img 
				onClick={() => handleClick(cell_state)}
				src={flagImage} /> )
			case 'EMPTY': return( <img 
				onClick={() => handleClick(cell_state)}
				src={blankImage} /> )
			case 'HIDDEN': return( <img 
				onClick={() => handleClick(cell_state)}
				src={hiddenImage} /> )
			case 'QUESTION': return( <img 
				onClick={() => handleClick(cell_state)}
				src={questionImage} /> )
			case 0: return( <img 
				onClick={() => handleClick(cell_state)}
				src={blankImage} /> )
			case 1: return( <img 
				onClick={() => handleClick(cell_state)}
				src={oneImage} /> )
			case 2: return( <img 
				onClick={() => handleClick(cell_state)}
				src={twoImage} /> )
			case 3: return( <img 
				onClick={() => handleClick(cell_state)}
				src={threeImage} /> )
			case 4: return( <img 
				onClick={() => handleClick(cell_state)}
				src={fourImage} /> )
			case 5: return( <img 
				onClick={() => handleClick(cell_state)}
				src={fiveImage} /> )
			case 6: return( <img 
				onClick={() => handleClick(cell_state)}
				src={sixImage} /> )
			case 7: return( <img 
				onClick={() => handleClick(cell_state)}
				src={sevenImage} /> )
			case 8: return( <img 
				onClick={() => handleClick(cell_state)}
				src={eightImage} /> )
			default: 
				return( <div>Error cell-content</div> );
				break
	};
}
