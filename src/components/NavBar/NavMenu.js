import React, {} from 'react';
import {withRouter} from 'react-router';
import SearchTasks from '../Search/SearchTasks'
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

import styles from './navbar.module.css'




 function NavMenu(props){
    
    return(

        <Navbar className = {styles.navbar}>
            <Navbar.Brand >
            <NavLink to = '/' 
            className = {styles.logo}
            >
            ToDo List
            </NavLink>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink
                activeStyle={{fontWeight: "bold", color: "#4b2228c9"}}
                className = {`${styles.menu} ${styles.home}`}
                to ='/'
                exact
                >
                Home
                </NavLink>
                <NavLink 
                activeStyle={{fontWeight: "bold", color: "#4b2228c9"}}
                className = {styles.menu}
                to ='/about'
                exact
                >
                About us
                </NavLink>
                <NavLink 
                activeStyle={{fontWeight: "bold", color: "#4b2228c9"}}
                className = {styles.menu}
                to ='/contact'
                exact
                >
                Contact us
                </NavLink>
                <NavLink 
                activeStyle={{fontWeight: "bold", color: "#4b2228c9"}}
                className = {styles.menu}
                to ='/register'
                exact
                >
                Register
                </NavLink>
                <NavLink 
                activeStyle={{fontWeight: "bold", color: "#4b2228c9"}}
                className = {styles.menu}
                to ='/login'
                exact
                >
                Log In
                </NavLink>
            </Nav>
            {props.location.pathname === '/'? <SearchTasks/> : null}
              
        </Navbar>
    );
};

export default withRouter(NavMenu)