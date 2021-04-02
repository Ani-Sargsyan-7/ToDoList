import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import {FaAngleDoubleRight} from 'react-icons/fa';

import Captures  from '../../../images/Captures.png'
import styles from './about.module.css';

export default function About(){
    return(
       <Container>
       <Row className='justify-content-center'>
       <div className = {styles.about}>
       <Col xs={12}>

            <h2 className={styles.text}>This is an application for writing your daily tasks.</h2>
            <h3 className={styles.text}>If you want to be our user you can register there...</h3>
            <Link
            className={styles.link}
            to='/register'
            >
            Sign Up here <FaAngleDoubleRight/>
         </Link>
       </Col>

         <Col xs={10}>
         <div className = {styles.img}>
            <img src = {Captures} alt="Tasks Page"/>
        </div>
        </Col>
       </div>
       </Row>
       </Container>
    );
}