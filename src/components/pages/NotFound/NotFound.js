import React from 'react';

import styles from './notFound.module.css'

export default function NotFound(){

    return(     
        
        <div className={styles.div}>
            <p className={styles.notFound}>404 Page not found</p>
        </div>
    );
};