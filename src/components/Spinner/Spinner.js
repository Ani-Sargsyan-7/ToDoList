import React, {useEffect} from 'react';
import { Spinner as Loading } from 'react-bootstrap';
import styles from './spinner.module.css';


function Spinner(){

    useEffect(()=>{
            document.body.style.overflow = 'hiden';

        return ()=>{
            document.body.style.overflow = 'auto';
        }

    },[]);

    return (
        <div  className = {styles.container}>
            <Loading
            className={styles.spinner}
            animation="border" 
            role="status"
            >
            <span className="sr-only">Loading...</span>
            </Loading>
        </div>

    )
};

export default Spinner;