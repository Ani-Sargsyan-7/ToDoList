import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import {FaAngleDoubleRight} from 'react-icons/fa';

import Capture  from '../../../images/Capture.png'
import styles from './about.module.css';

export default function About(){
    return(
       <Container>
       <Row className='justify-content-start'>
       <Col xs={11}>
       <div className = {styles.about}>
            <h2>This is an application for writing your daily tasks.</h2>
            <h3>If you want to be our user you can register there...</h3>
            <Link
            className={styles.link}
            to='/register'
            >
            Sign Up here <FaAngleDoubleRight/>
         </Link>
         <div className = {styles.img}>
            <img src = {Capture} alt="Tasks Page"/>
        </div>
       </div>
       </Col>
       </Row>
       </Container>
    );
}