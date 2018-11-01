import React from 'react';
import { render } from 'react-dom';
import MineSweeper from './components/MineSweeper';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mineSweeper } from './redux/reducer';


const store = createStore(mineSweeper);

render(
	<Provider store={store}>
		<MineSweeper />
	</Provider>,
	document.getElementById('app')
);

module.hot.accept();
