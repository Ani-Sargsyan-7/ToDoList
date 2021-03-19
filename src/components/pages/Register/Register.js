import React, {useState} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {register} from '../../../store/actions';
import {connect} from 'react-redux';

import styles from './register.module.css';



function Register(props){

    const [inputValue, setInputValue] = useState(

        {
            name:'',
            surname:'',
            email:'',
            password1:'',
            confirmPassword:'',
        }
    );
    const [errors, setErrors] = useState(

        {
            name:null,
            surname:null,
            email:null,
            password:null,
            confirmPassword: null
        }
    );
    
    const onChangeInputValue = e =>{
        const {name, value} = e.target;
        
        setInputValue({
            ...inputValue,
            [name]: value
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
        const  nameValid = /^[a-zA-Z]$/;
        
        switch(name){
            case 'name':
            if(!nameValid.test(value) & value){
                setErrors({
                    ...errors,
                    name:'Entered invalid Name!'
                })
            }
            break;

            case 'surname':
            if(!nameValid.test(value) & value){
                setErrors({
                    ...errors,
                    surname:'Entered invalid Last Name!'
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

            case 'password':
              const passValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
            if(!passValid.test(value) && value){
                setErrors({
                    ...errors,
                    password: 'Password needs to 8 characters or more and at least one numeric!'
                })
            }      
            break;

            case 'confirmPassword':
            if(value !== inputValue.password && value){
                setErrors({
                    ...errors,
                    confirmPassword: "Passwords do not match!"
                })
            }
            break;

            default:setErrors({
                ...errors,
                [name] : null
            })
        }
        
    };

const handleSubmit = ()=>{
    const errorsExist = !Object.values(errors).every(el => el === null);
    const valuesExist = !Object.values(inputValue).every(el => el === '');
    const requiredMessage = 'Field is required!'
  
    
    if(!valuesExist || errorsExist){
        setErrors({
            email: requiredMessage,
            password: requiredMessage,
        });
        return;
    }
    
        props.register(inputValue);
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
                            autoFocus
                            value = {inputValue.name}
                            onChange = {onChangeInputValue}
                            name = "name"
                             />
                        {errors &&  
                             <Form.Text className="text-danger">
                                {errors.name}
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
                            value = {inputValue.surname}
                            onChange = {onChangeInputValue}
                            name = "surname"
                            />
                            {errors &&  
                                <Form.Text className="text-danger">
                                   {errors.surname}
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
                            value = {inputValue.password}
                            onChange = {onChangeInputValue}
                            name = "password"
                            />
                            {errors &&  
                                <Form.Text className="text-danger">
                                   {errors.password}
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
                            name = "confirmPassword"
                            value = {inputValue.confirmPassword}
                            onChange = {onChangeInputValue}
                             />
                             {errors &&  
                                <Form.Text className="text-danger">
                                   {errors.confirmPassword}
                               </Form.Text>
                           }
                        </Form.Group>                    
                        <Form.Group className ={styles.btn_link}>
                            <Button 
                            className={styles.btn}
                            onClick = {handleSubmit}
                            >
                            Register
                            </Button>
                            <Link
                            className={styles.link}
                            to='/login'
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

const mapDispatchToProps = {
        register
}


export default connect(null, mapDispatchToProps)(Register);