import React, { Component } from 'react';
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../Confirm'
import { Container, Row, Col, Button} from 'react-bootstrap';
import styles from './todo.module.css';



class ToDoList extends Component{
    state ={
        tasks : [],
        selectedTasks:new Set(),
        showConfirm:false
    };

    addNewTask = (newTasks)=>{  
        const newTasksArr = [newTasks, ...this.state.tasks];
       
        this.setState({
            tasks:newTasksArr
        });
    };
 
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
            selectedTasks: new Set(),
            showConfirm: false
        });

    };

    toggleShowConfirm=()=>{
        this.setState({
            showConfirm:!this.state.showConfirm,
        });
    };

    
    render(){
        const {selectedTasks, tasks, showConfirm} = this.state;
       
        const tasksList = tasks.map((task,index)=>{
            index++;
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
                <Task
                card={task}
                chekedTasks={this.chekedTasks}
                disabled = {!!selectedTasks.size}
                onDelete = {this.removeTask}
                index={index}
                />
                   
                </Col>
             );
        });
    
       return(
       
           <>              
                <Container>
                    <Row>
                        <Col className = ' mb-4'>
                            <h1 className ='text-center mt-4'>ToDo List</h1>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col xs={12} xl={6}>
                           <NewTask     
                           onAddTask ={this.addNewTask}
                           disabled={!!selectedTasks.size}
                           /> 
                           <Button 
                           border="warning"
                           className='mt-4' 
                           size="sm" variant="danger" 
                           onClick={this.toggleShowConfirm}
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
                
                {showConfirm && 
                    <Confirm 
                    onClose ={this.toggleShowConfirm}
                    onConfirm ={this.deleteCheckedTasks}
                    count={selectedTasks.size}
                    />
                } 
           </>

       );
    };
};

 export default ToDoList;