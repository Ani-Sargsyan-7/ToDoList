import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Counter from './components/UsingRedax/Counter';


const initState = {count:0}

function reducer(state= initState, action){
  console.log(action)
  
switch (action.type) {
  case "INCREMENT":
    
    return{
      ...state,
      count:state.count + 1
    };
  case "DECREMENT" :
    
    return{
      ...state,
      count:state.count - 1
    };

  default:
    return state;
};
 
};

const store = createStore(reducer);

store.dispatch({type:"INCREMENT"});
store.dispatch({type:"DECREMENT"});

ReactDOM.render(
  <React.StrictMode>
  <Provider store = {store}>
  <Counter/>
  { /* <App /> */}
  </Provider>   
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
