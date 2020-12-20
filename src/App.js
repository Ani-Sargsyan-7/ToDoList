
import HelloWorld from './components/HelloWorld';
import DateFunction from './components/DateFunction';
import GetData from './components/GetData';
import Product from './components/Product';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HelloWorld/>
        <DateFunction/>
        <GetData
        name = "Ani"
        surname ="Sargsyan"
        />
        <Product 
        name="Bananas" 
        price="1$" 
        description="Fresh bananas from Ecuador" 
        />
        
      </header>
    </div>
  );
}

export default App;
