import React, {PureComponent} from 'react';
import idGenerator from '../../helpers/idGenerator';
import {Button, FormControl, Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './newTask.module.css';

class NewTask extends PureComponent{

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
                show={true}
                onHide={onCloseModal}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title 
                    className = {styles.modalTitle}>
                        Add new Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                    className={styles.input}
                    placeholder='Add  Title...'
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyDown}
                    name = 'taskTitle'  
                    />
                    <FormControl
                    className={styles.textarea}
                    as='textarea'
                    row={4}
                    placeholder='Add Task...'
                    onChange={this.handleChange}
                    name = 'content'  
                    />    
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                    className={`${styles.btn} ${this.state.taskTitle !== "" ? styles.btnHover : ""}`}
                    onClick={this.handleSubmit}
                    disabled={this.state.taskTitle === "" ? true : false}
                    >
                    Add
                    </Button>
                    <Button 
                    className={`${styles.btn} ${styles.btnHover}`}
                    onClick={onCloseModal}
                    >
                    Cancel
                    </Button>
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