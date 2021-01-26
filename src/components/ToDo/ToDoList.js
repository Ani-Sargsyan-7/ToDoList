import React, {Component } from 'react';
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../Confirm/Confirm';
import EditTask from '../EditTask/EditTask';
import {Container, Row, Col, Button} from 'react-bootstrap';
import styles from './todo.module.css';



class ToDoList extends Component{
    
    state ={
        tasks : [],
        selectedTasks:new Set(),
        showConfirm:false,
        showNewTaskModal: false,
        editTask: null
    };

    addNewTask = (newTasks)=>{  
        const newTasksArr = [newTasks, ...this.state.tasks];
       
        this.setState({
            tasks:newTasksArr,
            showNewTaskModal:this.state.showNewTaskModal
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
                selectedTasks
            });
    };

    selectAllTasks=()=>{
        const taskId = this.state.tasks.map(task => task._id);
        this.setState({
            selectedTasks:new Set(taskId)
        });
    };

    unselectAll=()=>{
        this.setState({
            selectedTasks:new Set()
        });
    };

    deleteCheckedTasks = ()=>{
        const {tasks, selectedTasks} = this.state;

        const chekcedTasks = tasks.filter( task =>{
                if(selectedTasks.has(task._id )){
                    return false;
                }
                else{
                    return true;
                }
    
        });

        this.setState({
            tasks:chekcedTasks,
            selectedTasks: new Set(),
            showConfirm: false
        });

    };

    toggleNewTaskModal=()=>{
        this.setState({
            showNewTaskModal:!this.state.showNewTaskModal
        });
    };

    toggleShowConfirm=()=>{
        this.setState({
            showConfirm:!this.state.showConfirm,
        });
    };

    handleEdit = (editTask)=>{

        this.setState({ editTask });
    };

    handleSaveTask = (editedTask)=>{
        const tasks = [...this.state.tasks];
        const taskIndex = tasks.findIndex(task => task._id === editedTask._id);
        tasks[taskIndex] = editedTask;
        
        this.setState({
            tasks,
            editTask: null
        });
    };
    
    render(){
        const {selectedTasks, tasks, showConfirm, showNewTaskModal, editTask} = this.state;
      console.log(selectedTasks.size)
        const tasksList = tasks.map((task,index)=>{
            index++;
             return (
                <Col
                    key={task._id}
                    xs={9}
                    sm={8}
                    md={6}
                    lg={4}
                    xl={2}
                    className='mb-4 justify-content-center'
                >
                <Task
                card={task}
                chekedTasks={this.chekedTasks}
                disabled = {!!selectedTasks.size}
                onDelete = {this.removeTask}
                onEdit = {this.handleEdit}
                selected={selectedTasks.has(task._id)}
                index={index}
                />         
                </Col>
             );
        });
        
       return(

           <>              
                <Container className = {styles.container}>
                    <Row>
                        <Col className = ' mb-4'>
                            <h1 className ='text-center mt-4'>ToDo List</h1>
                        </Col>
                    </Row>
                    <Row className='justify-content-around'>
                        <Col> 
                           <Button 
                           className={`${styles.btn} ${!selectedTasks.size ? styles.btnHover : " "} `}
                           size="sm"  
                           onClick={this.toggleNewTaskModal}
                           disabled={!!selectedTasks.size}
                           >
                           Add new Task
                           </Button>
                           </Col>
                           <Col>
                           <Button 
                           className={`${styles.btn} ${selectedTasks.size ? styles.btnHover : " "} `}
                           size="sm"  
                           onClick={this.toggleShowConfirm}
                           disabled={!selectedTasks.size}
                           >
                           Delete selected
                           </Button>
                           </Col>

                           <Col>
                           <Button                           
                           className={`${styles.btn} ${selectedTasks.size !== tasks.length ? styles.btnHover : " "} `}
                           size="sm"  
                           onClick={this.selectAllTasks}
                           disabled={selectedTasks.size === tasks.length}
                           >
                           Select  All
                           </Button>
                           </Col>

                           <Col>
                           <Button 
                           className={`${styles.btn} ${selectedTasks.size ? styles.btnHover : " "} `}
                           size="sm"  
                           onClick={this.unselectAll}
                           disabled={!selectedTasks.size}
                           >
                           Unselect  All
                           </Button>
                        </Col> 
                    </Row>
                    <Row className = 'mt-5'>
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
                
                {
                    showNewTaskModal &&
                    <NewTask
                    onCloseModal = {this.toggleNewTaskModal}
                    onAddTask={this.addNewTask}
                    />
                }
                {
                    editTask && 
                    <EditTask
                        data = {editTask}
                        onClose = {()=> this.handleEdit(null)}
                        onSave = {this.handleSaveTask}
                     />
                }
        </>

       );
    };
};

 export default ToDoList;