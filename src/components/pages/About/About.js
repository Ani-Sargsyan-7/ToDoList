import React from 'react';
import {Link} from 'react-router-dom';
import {FaAngleDoubleRight} from 'react-icons/fa';


import styles from './about.module.css';

export default function About(){
    return(
       <div className = {styles.about}>
            <h2>This is an application for writing your daily tasks.</h2>
            <h3>If you want to be our user you can register there...</h3>
            <Link
            className={styles.link}
            to='/register'
            >
            Sign Up here <FaAngleDoubleRight/>
         </Link>
         <div>
            <img src = {"../../../images/Capture.png"} alt="Tasks Page" width="200" height="200"/>
        </div>
       </div>
    );
}