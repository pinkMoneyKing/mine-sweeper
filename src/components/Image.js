import React from 'react';
import mineImage						from '../images/mine.png';
import flagImage						from '../images/flag.png';
import hiddenImage						from '../images/hidden.png';
import questionImage						from '../images/question.png';
import blankImage						from '../images/blank.png';
import oneImage						from '../images/1.png';
import twoImage						from '../images/2.png';
import threeImage						from '../images/3.png';
import fourImage						from '../images/4.png';
import fiveImage						from '../images/5.png';
import sixImage						from '../images/6.png';
import sevenImage						from '../images/7.png';
import eightImage						from '../images/8.png';


export default function ImageComponent({
	cell_content,
	handleClick,
	id
}){
	switch(cell_content){
			case 'MINE': return( <img 
				onClick={() => handleClick(id)}
				src={mineImage} /> )
			case 'FLAG': return( <img 
				onClick={() => handleClick(id)}
				src={flagImage} /> )
			case 'EMPTY': return( <img 
				onClick={() => handleClick(id)}
				src={blankImage} /> )
			case 'HIDDEN': return( <img 
				onClick={() => handleClick(id)}
				src={hiddenImage} /> )
			case 'QUESTION': return( <img 
				onClick={() => handleClick(id)}
				src={questionImage} /> )
			case 0: return( <img 
				onClick={() => handleClick(id)}
				src={blankImage} /> )
			case 1: return( <img 
				onClick={() => handleClick(id)}
				src={oneImage} /> )
			case 2: return( <img 
				onClick={() => handleClick(id)}
				src={twoImage} /> )
			case 3: return( <img 
				onClick={() => handleClick(id)}
				src={threeImage} /> )
			case 4: return( <img 
				onClick={() => handleClick(id)}
				src={fourImage} /> )
			case 5: return( <img 
				onClick={() => handleClick(id)}
				src={fiveImage} /> )
			case 6: return( <img 
				onClick={() => handleClick(id)}
				src={sixImage} /> )
			case 7: return( <img 
				onClick={() => handleClick(id)}
				src={sevenImage} /> )
			case 8: return( <img 
				onClick={() => handleClick(id)}
				src={eightImage} /> )
			default: 
				return( <div>Error cell-content</div> );
				break
	};
}
