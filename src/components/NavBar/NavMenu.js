import React, {} from 'react';
import {withRouter} from 'react-router';
import SearchTasks from '../Search/SearchTasks';
import {Navbar, Nav, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import styles from './navbar.module.css'




 function NavMenu(props){
    const {isAuth} = props;
    
    return(
        <Navbar className = {styles.navbar}>
            <Navbar.Brand >
            {isAuth &&
            <NavLink to = '/' 
            className = {styles.logo}
            >
            ToDo List
            </NavLink>
            }
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
                {isAuth ?
                <Button variant ='success'>Log out </Button> :
                <>
                <NavLink 
                activeStyle={{fontWeight: "bold", color: "#4b2228c9"}}
                className = {styles.menu}
                to ='/register'
                exact
                >
                Sign Up
                </NavLink>
                <NavLink 
                activeStyle={{fontWeight: "bold", color: "#4b2228c9"}}
                className = {styles.menu}
                to ='/login'
                exact
                >
                Log In
                </NavLink>
                </>
                }
            </Nav>
            {props.location.pathname === '/'? <SearchTasks/> : null}
              
        </Navbar>
    );
};

const mapStateToProps =(state)=>{return{isAuth:state.isAuth}};

export default connect(mapStateToProps)(withRouter(NavMenu))