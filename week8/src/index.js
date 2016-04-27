import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './chat.css';
import './styles.css';
import './photo.css';

render(
	<Router history={browserHistory} routes={routes} />, 
	document.getElementById('root')
);
