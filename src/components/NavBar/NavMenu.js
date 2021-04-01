import React, {useEffect} from 'react';
import {Navbar, Nav, Button, Container, Row, Col} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {logout} from '../../helpers/auth';
import {getUserInfo} from '../../store/actions';
import {connect} from 'react-redux';

import styles from './navbar.module.css'



 function NavMenu(props){
    const {user,getUserInfo}=props;

    useEffect(()=>{

    return getUserInfo(user)
      
    },[user, getUserInfo]);
    
    const {isAuth} = props;
    return(
        <Container fluid>
        <Row >            
            <Navbar className = {styles.navbar}>
            <Navbar.Brand >
            {isAuth &&
            <NavLink to = '/' 
            className = {styles.logo}
            >
            ToDo
            </NavLink>
            } 
            </Navbar.Brand>
            <Nav className = {styles.nav}>
            <Col xs={8}>
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
                </Col>
                
               {isAuth ?
                <Col xs={3}>
                <span className={styles.flex}>
                    <span className={styles.userName}>
                        {props.user}
                    </span>
                    <Button 
                    className = {styles.btn}
                    onClick ={logout}
                    >
                        Log out 
                    </Button> 
                </span>
                </Col>:
                <Col>
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
                </Col>
                }
            </Nav>
        </Navbar>
        </Row>
        </Container>
    );
};

const mapStateToProps =(state)=>{ 

    return {
        isAuth:state.isAuth,
        user:state.user
    } 
};

const mapDispatchToProps={
    getUserInfo
}

export default connect(mapStateToProps,mapDispatchToProps)(NavMenu);