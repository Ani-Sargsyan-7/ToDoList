import React, {useState} from 'react';
import {Form, Button, Col, Container, Row} from 'react-bootstrap';

import styles from './contact.module.css';




const requiredErrMessage = 'Fiel is required';

 function Contact(){
    
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
    
    function onChangeInputValue(e){
        const  {name, value } = e.target;

        if(!value){
            setErrors({
                ...errors,
                [name]: requiredErrMessage
            });
          }

          if(name === 'name' && value){
              
            if (!/^(([A-Za-z]+[-']?)*([A-Za-z]+)?\s)+([A-Za-z]+[-']?)*([A-Za-z]+)?$/){
                setErrors({
                    ...errors,
                    name : 'Enter a valid name'
                });
                
              };
        };
          if(name === 'email' && value){
            const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if(!emailReg.test(value)){
              setErrors({
                  ...errors,
                  email: 'Invalid email'
              }); 
            };
        }
        else {
            setErrors({
                ...errors,
                [name]: null
            }); 
          }; 

        setInputValues({
            ...inputValues,
            [name]: value
        });
    };

    function handleSubmit(){
        const errorsExist = !Object.values(errors).every(el => el === null);
        const valuesExist = !Object.values(inputValues).some(el => el === '');

        if(valuesExist && !errorsExist){

            fetch('http://localhost:3001/form', {
                method: 'POST',
                body: JSON.stringify(inputValues),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            .then(async (response) => {
                const res = await response.json();

                if(response.status >=400 && response.status < 600){
                
                    if(res.error){
                        throw res.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }

                setInputValues({
                    name:'',
                    email:'',
                    message:''
                });
        })
        .catch((error)=>{
            console.log('catch error', error);
        });

    return;
        }
        if(!valuesExist && !errorsExist){
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
     <h3 className={styles.text}>
     Please fill this form in a decent manner
     </h3>
     <Form className={styles.form}>
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
            <Form.Text className="text-danger">
            {errors.email}
            </Form.Text>
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
            <Form.Text className="text-danger">
            {errors.name}
            </Form.Text>
        </Form.Group>
       
        <Form.Group className={styles.inp}>
            <Form.Label className={styles.label}>Message</Form.Label>
            <Form.Control 
            className={`${styles.input} ${errors.message ? styles.invalid: ''}`}
            as="textarea" rows={5} 
            value = {inputValues.message}
            name = 'message'
            onChange = {onChangeInputValue}
            />
            <Form.Text className="text-danger">
            {errors.message}
            </Form.Text>
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

export default Contact;