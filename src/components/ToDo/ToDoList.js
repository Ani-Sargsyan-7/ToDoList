import React, {Component } from 'react';
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../Confirm/Confirm';
import EditTask from '../EditTask/EditTask';
import SearchTasks from '../Search/SearchTasks';
import {Container, Row, Col, Button,ButtonGroup} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getTasks, removeTask, deleteCheckedTasks } from '../../store/actions'

import styles from './todo.module.css';



class ToDoList extends Component{
    
    state ={
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

        if (!prevProps.editingTask && this.props.editingTask){
                    
                this.setState({
                    editTask:null
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
        const {selectedTasks} = this.state;
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

        this.setState({editTask});
    };

    

    render(){
        const {selectedTasks, showConfirm, showNewTaskModal, editTask} = this.state;
        const {tasks} = this.props;
        const tasksList = tasks.map((task,index)=>{
             return (
                <Col
                    key={task._id}
                    xs={12}
                    sm={7}
                    md={4}
                    lg={3}
                    xl={2}
                    className='ml-1 mr-1 mb-4 justify-content-center'
                >
                    <Task
                    data={task}
                    chekedTasks={this.chekedTasks}
                    disabled = {!!selectedTasks.size}
                    onDelete = {this.props.removeTask}
                    onEdit = {this.handleEdit}
                    selected={selectedTasks.has(task._id)}
                    index={index + 1}
                    />         
                </Col>
            );
            
        });

        return(

           <>              
                <Container fluid>
                <Row className={` mb-4 mt-5 justify-content-center`}>
                <Row>
                    <Col xs={6} md={8} lg={12}  className={styles.sarchSection}>
                        <SearchTasks/>
                    </Col>
                </Row>
                <Row className={` mb-4 mt-5 justify-content-center`}>
                    <ButtonGroup className={styles.btnGroup}>
                        <Col xs={3} md={4} className = {styles.buttons}> 
                           <Button 
                           className={`${styles.btn} ${!selectedTasks.size ? styles.btnHover : " "} `}
                           size="sm"  
                           onClick={this.toggleNewTaskModal}
                           disabled={!!selectedTasks.size}
                           >
                           Add Task
                           </Button>
                           </Col>
                           <Col xs={3} md={4} className = {styles.buttons}>
                           <Button 
                           className={`${styles.btn} ${selectedTasks.size ? styles.btnHover : " "} `}
                           onClick={this.toggleShowConfirm}
                           disabled={!selectedTasks.size}
                           >
                           Del.selected
                           </Button>
                           </Col>

                           <Col xs={3} md={4} className = {styles.buttons}>
                           <Button                           
                           className={`${styles.btn} ${selectedTasks.size !== tasks.length ? styles.btnHover : " "} `}
                           size="sm"  
                           onClick={this.selectAllTasks}
                           disabled={selectedTasks.size === tasks.length}
                           >
                           Select All
                           </Button>
                           </Col>

                           <Col xs={3}  md={4} className = {styles.buttons}>
                           <Button 
                           className={`${styles.btn} ${selectedTasks.size ? styles.btnHover : " "} `}
                           size="sm"  
                           onClick={this.unselectAll}
                           disabled={!selectedTasks.size}
                           >
                           Unselect All
                           </Button>
                        </Col> 
                        </ButtonGroup> 
                    </Row>
                    </Row>  
                    <Row className={`${styles.cards} justify-content-center`}>
            
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
                    />
                }
                {
                    editTask && 
                    <EditTask
                        data = {editTask}
                        onClose = {()=> this.handleEdit(null)}
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
        deletingTask :state.deletingTask,
        editingTask :state.editingTask
    };
};

const mapDispatchToProps = {
    getTasks,
    removeTask,
    deleteCheckedTasks,   
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);