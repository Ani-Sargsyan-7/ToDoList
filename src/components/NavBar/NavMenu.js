import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

import styles from './navbar.module.css'




export default function NavMenu(){

    return(

        <Navbar className = {styles.navbar}>
            <Navbar.Brand to ="/" className = {styles.logo}>ToDo List</Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink
                className = {styles.menu}
                to ='/'
                exact
                >
                Home
                </NavLink>
                <NavLink 
                className = {styles.menu}
                to ='/about'
                exact
                >
                About us
                </NavLink>
                <NavLink 
                className = {styles.menu}
                to ='/contact'
                exact
                >
                Contact us
                </NavLink>
            </Nav>
        </Navbar>
    );
};