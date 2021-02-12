import React, {useState} from 'react';
import {Form, Button, Col, Container} from 'react-bootstrap';

export default function Contact(){

    const [inputValues, setInputValues] = useState({
        name:'',
        email:'',
        massage: ''

    });

    console.log(inputValues.name)

    function onChangeInputValue(e){
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

    function handleSubmit(){
        console.log(inputValues.name)
        fetch(`http://localhost:3001/task/form`, {
            method: 'POST',
            body: {name:inputValues.name,
                   email:inputValues.email,
                   massage:inputValues.massage
                  },
            headers: {
                "Content-Type": 'application/json'
            },
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
                };
                const {name, email, massage} = inputValues;
                setInputValues({
                    name,
                    email,
                    massage
                });
    });
};



    return(

     <Container>
     <Form>
     <Form.Row>
       <Form.Group as={Col} controlId="formGridEmail"    className='mt-5'>
         <Form.Label>Email </Form.Label>
         <Form.Control type="email" placeholder="Enter email"
         value = {inputValues.email}
         name = 'email'
         onChange ={onChangeInputValue}
          />
       </Form.Group>
     </Form.Row>
   
     <Form.Group controlId="formGridAddress1">
       <Form.Label>Name</Form.Label>
       <Form.Control placeholder="Enter your name..."
       value = {inputValues.name}
       name = 'name'
       onChange = {onChangeInputValue}
       />
     </Form.Group>
     <Form.Group controlId="exampleForm.ControlTextarea1">
       <Form.Label>Example textarea</Form.Label>
       <Form.Control as="textarea" rows={3} 
       value = {inputValues.massage}
       name = 'massage'
       onChange = {onChangeInputValue}
       />
     </Form.Group>
   
     <Button variant="primary"
     onClick={handleSubmit}
     >
       Submit
     </Button>
   </Form>
     </Container>
    );
};