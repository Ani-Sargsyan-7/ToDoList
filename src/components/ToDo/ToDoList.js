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

    componentDidMount(){
        fetch('http://localhost:3001/task', {
            method: 'GET',
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

                this.setState({
                    tasks: res
                });

            })
            .catch((error)=>{
                console.log('catch error', error);
            });

    };

    addNewTask = (newTask) => {

        fetch('http://localhost:3001/task', {
            method: 'POST',
            body: JSON.stringify(newTask),
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
                
                const tasks = [res,...this.state.tasks];

                this.setState({
                    tasks,
                    showNewTaskModal: false
                });

            })
            .catch((error)=>{
                console.log('catch error', error);
            });


    };

 
    removeTask = (taskId)=>{
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
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
            const remainingTask = this.state.tasks.filter(task=> taskId !== task._id);

            this.setState({
                tasks:remainingTask
            });
        })
        .catch((error)=>{
            console.log('catch error', error);
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

    // selectAllTasks=()=>{
    //     fetch(`http://localhost:3001/task/${id}`, {
    //         method: 'PATCH',
    //         // body : ,
    //         headers: {
    //             "Content-Type": 'application/json'
    //         }
    //     })
    //         .then(async (response) => {
    //             const res = await response.json();

    //             if(response.status >=400 && response.status < 600){
    //                 if(res.error){
    //                     throw res.error;
    //                 }
    //                 else {
    //                     throw new Error('Something went wrong!');
    //                 }
    //             }
    //         const remainingTask = this.state.tasks.filter(task=> id !== task._id);

    //         this.setState({
    //             tasks:remainingTask
    //         });
    //     })
    //     .catch((error)=>{
    //         console.log('catch error', error);
    //     });
    // };
        // const taskId = this.state.tasks.map(task => task._id);
        // this.setState({
        //     selectedTasks:new Set(taskId)
        // });
    //};

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
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(editedTask)
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
        const tasks = [...this.state.tasks];
        const taskIndex = tasks.findIndex(task => task._id === editedTask._id);
        tasks[taskIndex] = editedTask;
        
        this.setState({
            tasks,
            editTask: null
        });
            });
        
};

    render(){
        const {selectedTasks, tasks, showConfirm, showNewTaskModal, editTask} = this.state;
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