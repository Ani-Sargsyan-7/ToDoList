import React, {Component} from 'react';
import idGenerator from '../../helpers/idGenerator';
import {Button, FormControl, Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './newTask.module.css';


class NewTask extends Component{

       state = {
        taskTitle : '',
        content: ''
    };

    handleChange = (e)=>{
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        });
       
    };

    handleSubmit=()=>{
        const taskTitle = this.state.taskTitle.trim(); 
        const content = this.state.content.trim(); 
        
        if(!taskTitle){
            return;
        };

        const newTasks ={
            _id:idGenerator(),
            taskTitle :taskTitle,
            content:content
        };

      this.props.onAddTask(newTasks);
        this.props.onCloseModal();
    };
   
    handleKeyDown = (e)=>{
        if(e.key === "Enter"){
             this.handleSubmit();
        };
        
    };


    render(){
        const {onCloseModal} = this.props;

        return(
        
                <Modal
                className={styles.modal}
                show={true}
                onHide={onCloseModal}
                size="md"
                centered
                >
                <Modal.Header >
                    <Modal.Title className = {styles.modalTitle}>
                        Add new Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                    className={styles.inp}
                    placeholder='Add  Title...'
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyDown}
                    name = 'taskTitle'  
                    />
                    <FormControl
                    as='textarea'
                    row={4}
                    placeholder='Add Task...'
                    onChange={this.handleChange}
                    name = 'content'  
                    />    
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                    onClick={this.handleSubmit}
                    variant='success'
                    >
                    Add
                    </Button>
                    <Button onClick={onCloseModal}>Cancel</Button>
                </Modal.Footer>           
             </Modal>
                              
        );
    };
};


 NewTask.propTypes = {
    onAddTask: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired

};

export default NewTask;