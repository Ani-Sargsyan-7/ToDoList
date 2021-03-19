import React from 'react';

import styles from './about.module.css';

export default function About(){
    return(
       <div className = {styles.about}>
            <h2>This is an application for writing your daily tasks.</h2>
            <h3>If you want to be our user you can register there...</h3>
       </div>
    );
};