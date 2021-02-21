import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {store} from './store/store';
//import Counter from './components/UsingRedax/Counter';


// store.dispatch({type:"INCREMENT"});
// store.dispatch({type:"DECREMENT"});

ReactDOM.render(
  <React.StrictMode>
  <Provider store = {store}>
{/*<Counter/>*/}
   <App /> 
  </Provider>   
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
