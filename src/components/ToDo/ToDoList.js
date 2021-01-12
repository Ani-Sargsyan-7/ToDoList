import React, { Component } from 'react';
import idGenerator from '../../helpers/idGenerator'
import { Container, Row, Col, Card, Button, FormControl, InputGroup, Form } from 'react-bootstrap';
import styles from './styles.module.css';



class ToDoList extends Component{
    state ={
        currentValue : '',
        tasks : [],
        selectedTasks:new Set()
    };

    handleChange = (e)=>{
        this.setState({
            currentValue :e.target.value,
                
        });
    };
    
    addNewTask = ()=>{  
        const currentValue = this.state.currentValue.trim(); 
        const newTasks ={
            _id:idGenerator(),
            text:currentValue
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

    handleKeyDown = (e)=>{
        if(e.key === "Enter"){
            this.addNewTask();
        }
    }

    removeTask = (id)=>{
            const remainingTask = this.state.tasks.filter(task=> id !== task._id);

            this.setState({
                tasks:remainingTask
            });
    };

    chekedTasks=(id)=>{
        const selectedTasks = new Set(this.state.selectedTasks);
            if(selectedTasks.has(id)){
                selectedTasks.delete(id)
            }else{
                selectedTasks.add(id)
            }
            this.setState({
                selectedTasks,
            });
    };

    deleteCheckedTasks = ()=>{
        const {tasks, selectedTasks} = this.state;

        const chekcedTasks = tasks.filter( task =>{
                if(selectedTasks.has(task._id )){
                    return false;
                }
                return true;
            
        });

        this.setState({
            tasks:chekcedTasks,
            selectedTasks: new Set()
        });

    };

    

   
    render(){
        const {selectedTasks,currentValue, tasks} = this.state;
       
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
                            onChange={()=>this.chekedTasks(task._id)}
                            />
                            Task {index+1}
                            </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                {task.text}
                            </Card.Title>
                            <Button 
                            border="warning"
                            className='mr-2' 
                            size="sm" variant="danger" 
                            onClick={()=>this.removeTask(task._id)}
                            disabled={!!selectedTasks.size}
                            >
                            &#10008;
                            </Button>
                            <Button 
                            border="warning"
                            variant="success" 
                            size="sm"
                            >
                            &#9998;
                            </Button>
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
                                border="warning"
                                placeholder='Enter new task...'
                                value={currentValue}
                                onChange={this.handleChange}
                                onKeyDown={this.handleKeyDown}
                                disabled={!!selectedTasks.size}
                                />
                                
                                <InputGroup.Append>
                                    <Button 
                                    variant="outline-warning" 
                                    onClick={this.addNewTask}
                                    disabled={!!selectedTasks.size}
                                    >
                                    Add
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <Button 
                            border="warning"
                            className='mt-4' 
                            size="sm" variant="danger" 
                            onClick={this.deleteCheckedTasks}
                            disabled={!selectedTasks.size}
                            >
                            Delet selsected
                            </Button>
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