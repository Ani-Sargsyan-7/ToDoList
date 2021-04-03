import React from 'react';
import {withRouter} from 'react-router';
import {FaLinkedinIn, FaGithub, FaArrowRight } from 'react-icons/fa';


import styles from './footer.module.css'


 function Footer(props){
    return(
        <footer className={styles.footer}>
            <div className={styles.text}>
                <p>You can contact us here<FaArrowRight className={styles.arrow}/></p>
            </div>
            <div className={styles.socialSites}>
                <a
                 href = "https://www.linkedin.com/in/ani-sargsyan-6aba40201" 
                 target='_blanck'> 
                 <FaLinkedinIn/>
                </a>
                <a 
                href = "https://github.com/Ani-Sargsyan-7/ToDoList" 
                target='_blanck'> 
                <FaGithub/>
                </a>
            </div>
            <div>
            {props.location.pathname === '/' ? <a className = {styles.linkToTop} href= "/#"> To Top </a> : null}            
            </div>
            </footer>
    )
}

export default withRouter(Footer);