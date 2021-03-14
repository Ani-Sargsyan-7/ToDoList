import React, {useState} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import styles from './register.module.css';



function Register(){

    const [inputValue, setInputValue] = useState(

        {
            firstName:'',
            lastName:'',
            email:'',
            password1:'',
            password2:''
        }
    );
    const [errors, setErrors] = useState(

        {
            firstName:null,
            lastName:null,
            email:null,
            password1:null,
            password2: null
        }
    );
    
    const onChangeInputValue = e =>{
        const {name, value} = e.target;

        setInputValue({
            ...inputValue,
            [name] : value
        });

        if(!value.trim()){
            setErrors({
                ...errors,
                [name]: 'Field is required!'
            });
        } else{
            setErrors({
                ...errors,
                [name] : null
            })
        };

        switch(name){
            
            case 'firstName':
            if(!/^[a-zA-Z]/.test(value) & value){
                setErrors({
                    ...errors,
                    firstName:'Entered invalid Name!'
                })
            }
            break;

            case 'lastName':
            if(!/^[a-zA-Z]/.test(value) & value){
                setErrors({
                    ...errors,
                    lastName:'Entered invalid Last Name!'
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

            case 'password1':
              const passValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
            if(!passValid.test(value) && value){
                setErrors({
                    ...errors,
                    password1: 'Password needs to 8 characters or more and at least one numeric!'
                })
            }      
            break;

            case 'password2':
            if(value !== inputValue.password1 && value){
                setErrors({
                    ...errors,
                    password2: "Passwords do not match!"
                })
            }
            break;

            default:setErrors({
                ...errors,
                [name] : null
            })
        }
        setInputValue({
            ...inputValue,
            [name]: value
        });

        
    }
  
    return(
        <Container>
            <Row xs={8} className='justify-content-center'>
                <Col xs={6}>
                <h2 className={styles.title}>
                   Register Now
                </h2>
                    <Form className={styles.registerForm}>
                    <h3 className={styles.text}>
                    Please fill this form in a decent manner
                    </h3>
                        <Form.Group>                    
                        <Form.Label className = {styles.label} >
                            First Name
                        </Form.Label>
                            <Form.Control 
                            className = {styles.input} 
                            type="text" 
                            placeholder="Name"
                            value = {inputValue.firstName}
                            onChange = {onChangeInputValue}
                            name = "firstName"
                             />
                        {errors &&  
                             <Form.Text className="text-danger">
                                {errors.firstName}
                            </Form.Text>
                        }
                        </Form.Group>
                        <Form.Group>
                        <Form.Label className = {styles.label}>
                            Last Name
                        </Form.Label>
                            <Form.Control 
                            className = {styles.input} 
                            type="text" 
                            placeholder="Last Name" 
                            value = {inputValue.lastName}
                            onChange = {onChangeInputValue}
                            name = "lastName"
                            />
                            {errors &&  
                                <Form.Text className="text-danger">
                                   {errors.lastName}
                               </Form.Text>
                           }
                        </Form.Group>
                        <Form.Group >
                        <Form.Label className = {styles.label}>
                            Email
                        </Form.Label>
                            <Form.Control
                            className = {styles.input} 
                            type="email" 
                            placeholder="Email address..." 
                            value = {inputValue.email}
                            onChange = {onChangeInputValue}
                            name = "email"
                            />
                            {errors &&  
                                <Form.Text className="text-danger">
                                   {errors.email}
                               </Form.Text>
                           }
                        </Form.Group>
                        <Form.Group>
                        <Form.Label className = {styles.label}>
                            Password
                        </Form.Label>
                            <Form.Control 
                            className = {styles.input}
                            type="password" 
                            placeholder="........" 
                            value = {inputValue.password1}
                            onChange = {onChangeInputValue}
                            name = "password1"
                            />
                            {errors &&  
                                <Form.Text className="text-danger">
                                   {errors.password1}
                               </Form.Text>
                           }
                        </Form.Group>
                        <Form.Group  controlId="formHorizontalPassword">
                        <Form.Label className = {styles.label}>
                            Confirm password
                        </Form.Label>
                            <Form.Control
                            className = {styles.input} 
                            type="password" 
                            placeholder="........"
                            name = "password2"
                            value = {inputValue.password2}
                            onChange = {onChangeInputValue}
                             />
                             {errors &&  
                                <Form.Text className="text-danger">
                                   {errors.password2}
                               </Form.Text>
                           }
                        </Form.Group>                    
                        <Form.Group className ={styles.btn_link}>
                            <Button className={styles.btn}>Register</Button>
                            <Link
                            className={styles.link}
                            to='/sign-in'
                            >
                            You already Sign Up? Login here!
                            </Link>
                        </Form.Group>
                    </Form>
                </Col>           
            </Row>       
        </Container>
    );
};

export default Register;