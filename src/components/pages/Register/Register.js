import React, {useState} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';




function Register(){
    return(
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                        Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Name" />
                        </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                        <Form.Label column sm={2}>
                            Last Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Last Name" />
                        </Col>
                        </Form.Group><Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Email" />
                        </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="........" />
                        </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Repeat the password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="........" />
                        </Col>
                        </Form.Group>
                    
                        <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit">Register</Button>
                        </Col>
                        </Form.Group>
                    </Form>
                </Col>           
            </Row>       
        </Container>
    );
};

export default Register;