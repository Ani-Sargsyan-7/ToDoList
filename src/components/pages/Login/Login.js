import React, {useState} from 'react';
import {Container,Row,Col,Button,Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {login} from '../../../store/actions';
import {connect} from 'react-redux';
 
import styles from './login.module.css';


function LogIn(props){

  const [inputValue, setInputValue] = useState(

    {
        email:'',
        password:''
    }
);
const [errors, setErrors] = useState(

    {
        email:null,
        password:null
    }
);

const onChangeInputValue = e =>{

  const {name, value} = e.target;

  setInputValue({
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
      case 'email':
          const emailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!emailValid.test(value) && value.trim()){
          setErrors({
              ...errors,
              email:'Entered invalid email address!'
          })
      }break;

      case 'password':
        const passValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
      if(!passValid.test(value) && value){
          setErrors({
              ...errors,
              password: 'Wrong password!'
          })
      }break;
      default:setErrors({
          ...errors,
          [name] : null
      });
  };
  
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
      return
  }
 

    props.login(inputValue);

  
};
    return(
        <Container>
            <Row className='justify-content-center'>
            <Col xs={6}>
              <h2 className={styles.title}>
                   Login Your Tasks Page 
              </h2>
                <Form className={styles.loginForm}>
                <h3 className={styles.text}>
                    Please fill this form in a decent manner
                </h3>
                <Form.Group>
                  <Form.Label  className = {styles.label}>
                    Email
                  </Form.Label> 
                    <Form.Control 
                    className = {styles.input}
                    type="email" 
                    placeholder="Email address..." 
                    name ="email"
                    value ={inputValue.email}
                    onChange={onChangeInputValue}
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
                    name ="password"
                    value ={inputValue.password}
                    onChange={onChangeInputValue}
                    />
                    {errors &&  
                      <Form.Text className="text-danger">
                         {errors.password}
                     </Form.Text>
                 }
                </Form.Group>

                <Form.Group className={styles.btn_link}>
                    <Button 
                    className={styles.btn}
                    onClick = {handleSubmit}
                    >
                    Log In
                    </Button>
                    <Link
                        className={styles.link}
                        to='/register'
                        >
                        You do not have Sign Up yet? Sign Up here!
                    </Link>
                </Form.Group>
              </Form>
                </Col>    
            </Row>
        </Container>
    )
};

const mapDispatchToProps={
  login
};


export default connect(null, mapDispatchToProps)(LogIn);