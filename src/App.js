import React, {useEffect} from 'react';
import ToDoList from './components/./ToDo/ToDoList';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import NotFound from './components/pages/NotFound/NotFound';
import SingleTask from './components/pages/SingleTask/SingleTask';
import NavMenu from './components/NavBar/NavMenu';
import Footer from './components/Footer/Footer';
import AuthRoute from './components/AuthRoute/AuthRoute';
import {
  Route,
  Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Spinner from './components/Spinner/Spinner';
import {connect} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {history} from './helpers/history';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';



function App({loading,successMessage, errorMessage}){
    useEffect(()=>{
      if(successMessage){
        toast(successMessage, {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          });
      }

      if(errorMessage){
        toast.dark(errorMessage, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
          });
      }
    }, [successMessage, errorMessage]);


  return (
    <div className="App">
      <Router history = {history}>
      <NavMenu/>
        <Switch>
          <AuthRoute
          type = 'private'
          path = '/'
          component = {ToDoList}
          exact
          />
          <AuthRoute
          type = 'private'
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
          path='/contact'
          component = {Contact}
          exact
         />
          <AuthRoute
          type = 'public'
          path = '/register'
          component = {Register}
          exact
          />
          <AuthRoute
          type = 'public'
          path = '/login'
          component = {Login}
          exact
          />
          <AuthRoute
          type = 'private'
          path='/task/:taskId'
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
        <Footer/>
      </Router>
      <ToastContainer />
      {loading && <Spinner />}
    </div>
  );
};

const mapStateToProps = (state)=>{
    return {
      loading: state.loading,
      successMessage:state.successMessage,
      errorMessage:state.errorMessage
    };
};

export default connect(mapStateToProps)(App);
