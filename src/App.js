import React from 'react';
import ToDoList from './components/./ToDo/ToDoList';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import SingleTask from './components/pages/SingleTask/SingleTask';
import NavMenu from './components/NavBar/NavMenu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {
  return (
    <div className="App">
      <Router>
      <NavMenu/>
        <Switch>
          <Route
          path = '/'
          component = {ToDoList}
          exact
          />
          <Route
          path = '/home'
          component = {ToDoList}
          exact
          />
          <Route
          path = '/about'
          component = {About}
          exact
          />
          <Route
          path = '/contact'
          component = {Contact}
          exact
          />
          <Route
          path = '/task'
          component = {SingleTask}
          exact
          />
          <Route
          path = '/not-found'
          component = {NotFound}
          exact
          />
          <Redirect to='/not-found'/>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
