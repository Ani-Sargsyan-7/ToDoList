import React from 'react';
// import HelloWorld from './components/HelloWorld';
// import DateFunction from './components/DateFunction';
// import GetData from './components/GetData';
//import Product from './components/Product';
import ToDoList from './components/./ToDo/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<HelloWorld/>
        <DateFunction/>
        <GetData
        name = "Ani"
        surname ="Sargsyan"
        />*/}
        {/*<Product 
        name="Bananas" 
        defVal="4" 
        description="Fresh bananas from Ecuador" 
        />
        */}
        <ToDoList/>
      </header>
    </div>
  );
}

export default App;
