import React, {useState, useEffect} from 'react';
import {Form, Button, Col, Container, Row} from 'react-bootstrap';
import {sendMessage} from '../../../store/actions';
import {connect} from 'react-redux'

import styles from './contact.module.css';


 function Contact(props){
    const requiredErrMessage = 'Field is required!';

    const [inputValues, setInputValues] = useState({
        name:'',
        email:'',
        message: ''

    });
    const [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null
    });

    const {successSend}= props;

    useEffect(()=>{
        if(successSend){
            setInputValues({
                name: '',
                email: '',
                message: ''
            });
        }
    }, [successSend]);
    
    function onChangeInputValue(e){
        const  {name, value} = e.target;

        setInputValues({
            ...inputValues,
            [name]: value
        });

        if(!value.trim()){
            setErrors({
                ...errors,
                [name]: requiredErrMessage
            });

        } else{
            setErrors({
                ...errors,
                [name] : null
            })
        };
        
        const  nameValid = /^[a-zA-Z]+[a-zA-Z]$/;
        
        switch(name){
            
            case 'name':
            if(!nameValid.test(value) & value){
                setErrors({
                    ...errors,
                    name:'Entered invalid Name!'
                })
            }
            break;

            case 'email':
                const emailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!emailValid.test(value) && value.trim()){
                setErrors({
                    ...errors,
                    email:'Entered invalid email address!'
                })
            }
            break;
            default:setErrors({
                ...errors,
                [name] : null
            })
        }

    };

    function handleSubmit(){
        const errorsExist = !Object.values(errors).every(el => el === null);
        const valuesExist = !Object.values(inputValues).some(el => el === '');

        if(valuesExist && !errorsExist){

            props.sendMessage(inputValues);
      
        }else if(!valuesExist && !errorsExist){
            setErrors({
                name: requiredErrMessage,
                email: requiredErrMessage,
                message: requiredErrMessage
            });
       }
    
    };


    return(
     <Container>
     <Row className='justify-content-center'>
     <Col xs={8}>
     <h2 className={styles.title}>
     Contact Us
     </h2>
     <Form className={styles.form}>
     <h3 className={styles.text}>
     Please fill this form in a decent manner
     </h3>
        <Form.Group  className={styles.inp}>
            <Form.Label  className={styles.label}>Email </Form.Label>
            <Form.Control 
            type="email" 
            placeholder="Enter email..."
            className={`${styles.input} ${errors.email ? styles.invalid: ''}`}
            value = {inputValues.email}
            name = 'email'
            onChange ={onChangeInputValue}
            />
            {errors &&
            <Form.Text className="text-danger">
            {errors.email}
            </Form.Text>
            }
        </Form.Group>
       
        <Form.Group className={styles.inp}>
            <Form.Label className={styles.label}>Full Name</Form.Label>
            <Form.Control 
            className={`${styles.input} ${errors.name ? styles.invalid: ''}`}
            placeholder="Enter your full name..."
            value = {inputValues.name}
            name = 'name'
            onChange = {onChangeInputValue}
            />
            {errors &&
            <Form.Text className="text-danger">
            {errors.name}
            </Form.Text>
            }
        </Form.Group>
       
        <Form.Group className={styles.inp}>
            <Form.Label className={styles.label}>Message</Form.Label>
            <Form.Control 
            className={`${styles.input} ${errors.message ? styles.invalid: ''}`}
            as="textarea" rows={3} 
            value = {inputValues.message}
            name = 'message'
            onChange = {onChangeInputValue}
            />
            {errors &&
            <Form.Text className="text-danger">
            {errors.message}
            </Form.Text>
            }
        </Form.Group>
           
        <Button 
        size="md" 
        className={styles.btn}
        onClick={handleSubmit}
        >
        SEND
        </Button>
   </Form>
   </Col>
   </Row>
</Container>
    );
};

const mapStateToProps =(state)=> {
   return { 
       successSend:state.successSend
    }
}

const mapDispatchToProps = {
     sendMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);