import React, {Component } from 'react';
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../Confirm/Confirm';
import EditTask from '../EditTask/EditTask';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getTasks, addTask, removeTask, deleteCheckedTasks, saveTask} from '../../store/actions'

import styles from './todo.module.css';



class ToDoList extends Component{
    
    state ={
        //tasks : [],
        selectedTasks:new Set(),
        showConfirm:false,
        showNewTaskModal: false,
        editTask: null
    };

    componentDidMount(){
        this.props.getTasks();
    };

    componentDidUpdate(prevProps){
        if(!prevProps.addingTask && this.props.addingTask){
            this.setState({
                showNewTaskModal: false
            });
            return;
        };

        if (!prevProps.deletingTask && this.props.deletingTask){
            this.setState({
                selectedTasks: new Set(),
                showConfirm: false
            });
            return;
        };
    };
 

    chekedTasks=(taskId)=>{
        const selectedTasks = new Set(this.state.selectedTasks);
            if(selectedTasks.has(taskId)){
                selectedTasks.delete(taskId)
            }else{
                selectedTasks.add(taskId)
            }
            this.setState({
                selectedTasks
            });
    };

    selectAllTasks=()=>{
        const taskId = this.props.tasks.map(task => task._id);
        this.setState({
            selectedTasks:new Set(taskId)
        });
    };

    unselectAll=()=>{
        this.setState({
            selectedTasks:new Set()
        });
    };

    deleteTasks = ()=>{
        const { selectedTasks } = this.state;
    this.props.deleteCheckedTasks(selectedTasks);
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

    handleSaveTask = (editTask)=>{
        this.props.saveTask(editTask);
           
};

    render(){
        const {selectedTasks, showConfirm, showNewTaskModal, editTask} = this.state;
        const {tasks} = this.props;
        const tasksList = tasks.map((task,index)=>{
            index++;
             return (
                <Col
                    key={task._id}
                    xs={9}
                    sm={8}
                    md={6}
                    lg={5}
                    xl={3}
                    className='ml-1 mb-4 justify-content-center'
                >
                <Task
                card={task}
                chekedTasks={this.chekedTasks}
                disabled = {!!selectedTasks.size}
                onDelete = {this.props.removeTask}
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
                    <Row className='justify-content-beetwen'>
                        <Col className = {styles.buttons}> 
                           <Button 
                           className={`${styles.btn} ${!selectedTasks.size ? styles.btnHover : " "} `}
                           size="sm"  
                           onClick={this.toggleNewTaskModal}
                           disabled={!!selectedTasks.size}
                           >
                           Add new Task
                           </Button>
                           </Col>
                           <Col  className = {styles.buttons}>
                           <Button 
                           className={`${styles.btn} ${selectedTasks.size ? styles.btnHover : " "} `}
                           size="sm"  
                           onClick={this.toggleShowConfirm}
                           disabled={!selectedTasks.size}
                           >
                           Delete selected
                           </Button>
                           </Col>

                           <Col  className = {styles.buttons}>
                           <Button                           
                           className={`${styles.btn} ${selectedTasks.size !== tasks.length ? styles.btnHover : " "} `}
                           size="sm"  
                           onClick={this.selectAllTasks}
                           disabled={selectedTasks.size === tasks.length}
                           >
                           Select  All
                           </Button>
                           </Col>

                           <Col  className = {styles.buttons}>
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
                    <Row className='ml-1 mb-4 mt-5 justify-content-center'>
                    {tasksList}
                    </Row>                  
                </Container>
                
                {showConfirm && 
                    <Confirm 
                    onClose ={this.toggleShowConfirm}
                    onConfirm ={this.deleteTasks}
                    count={selectedTasks.size}
                    />
                }
                
                {
                    showNewTaskModal &&
                    <NewTask
                    onCloseModal = {this.toggleNewTaskModal}
                    onAddTask={this.props.addTask}
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

const mapStateToProps = (state)=>{
    return {
        tasks: state.tasks,
        addingTask :state.addingTask,
        deletingTask :state.deletingTask
    };
};

const mapDispatchToProps = {
    getTasks,
    addTask,
    removeTask,
    deleteCheckedTasks,
    saveTask

   
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);