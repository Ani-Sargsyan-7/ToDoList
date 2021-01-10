import React, { Component } from 'react';
import idGenerator from '../../helpers/idGenerator'
import { Container, Row, Col, Card, Button, FormControl, InputGroup, Form } from 'react-bootstrap';
import styles from './styles.module.css';



class ToDoList extends Component{
    state ={
        check: false,
        currentValue : '',
        tasks : [],
        selectedTask:[]
    };

    handleChange = (e)=>{
        this.setState({
            currentValue :e.target.value,
                
        });
    };
    
    addNewTask = ()=>{  
        const currentValue = this.state.currentValue.trim(); 
        const date = new Date('');
        const newTasks ={
            _id:idGenerator(),
            text:currentValue,
            date:date,

        };
        const newTasksArr = [newTasks, ...this.state.tasks];
        if(!currentValue){
            return;
        };

        this.setState({
            currentValue:'',
            tasks:newTasksArr
        });
       
    };

    removeTask = (id)=>{
            const remainingTask = this.state.tasks.filter(task=> id !== task._id);

            this.setState({
                tasks:remainingTask
            });
    };

    onChecking(){
        this.setstate({
            check:!this.state.check,
        });
        
      }
    

   
    render(){
        const {currentValue, tasks} = this.state;
       
        const tasksList = tasks.map((task, index)=>{
             return (
                <Col
                    key={task._id}
                    xs={12}
                    sm={6}
                    md={5}
                    lg={4}
                    xl={3}
                    className='mb-4'
                >
                    <Card border="warning">
                   
                        <Card.Header>
                            <Form.Check type="checkbox" 
                            checked={this.state.check} 
                            onChange={()=>this.onChecking()}
                            />
                            Task {index+1}
                            </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                {task.text}
                            </Card.Title>
                            <Button className='mr-2' 
                            size="sm" variant="danger" 
                            onClick={()=>this.removeTask(task._id)}
                            >
                            Remove
                            </Button>
                            <Button variant="success" size="sm">Edit</Button>
                        </Card.Body>
                    </Card>
                </Col>
             );
        });
    
       return(
       
           <div>              
                <Container>
                    <Row>
                        <Col className = ' mb-4'>
                            <h1 className ='text-center'>ToDo List</h1>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col xs={12} xl={6}>
                            <InputGroup>
                                <FormControl
                                placeholder='Enter new task...'
                                value={currentValue}
                                onChange={this.handleChange}
                                />
                                
                                <InputGroup.Append>
                                    <Button  variant="outline-warning" 
                                    onClick={this.addNewTask}
                                    >
                                    Add
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className='mt-4 justify-content-center'>
                        {tasksList}
                    </Row>
                </Container>
           </div>

      

       );
    };
}

export default ToDoList;