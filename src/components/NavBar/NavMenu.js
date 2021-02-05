import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

import styles from './navbar.module.css'




export default function NavMenu(){

    return(

        <Navbar className = {styles.navbar}>
            <Navbar.Brand href="/" className = {styles.logo}>ToDo List</Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink
                className = {styles.menu}
                to ='/'
                activeClassName={styles.active}
                exact
                >
                Home
                </NavLink>
                <NavLink 
                className = {styles.menu}
                to ='/about'
                activeClassName={styles.active}
                exact
                >
                About us
                </NavLink>
                <NavLink 
                className = {styles.menu}
                to ='/contact'
                activeClassName={styles.active}
                exact
                >
                Contact us
                </NavLink>
            </Nav>
        </Navbar>
    );
};