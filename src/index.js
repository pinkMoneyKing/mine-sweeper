import React from 'react';
import ReactDOM from 'react-dom';
import MineSweeper from './components/MineSweeper';


console.log("hello world");
ReactDOM.render(
	<MineSweeper />,
	document.getElementById('app')
);

module.hot.accept();
