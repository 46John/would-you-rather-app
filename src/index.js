import 'bootstrap/dist/css/bootstrap.css';
import "typeface-open-sans";
import 'font-awesome/css/font-awesome.min.css';
import './App.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';

const store = createStore(reducer, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
