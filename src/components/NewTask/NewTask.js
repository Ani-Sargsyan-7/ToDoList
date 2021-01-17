import React, {Component} from 'react';
import idGenerator from '../../helpers/idGenerator';
import {InputGroup, Button, FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types';
//import styles from './newTask.module.css';



class NewTask extends Component{

       state = {
        taskTitle : '',
        content: ''
    };

    handleChange = (e)=>{
        this.setState({
            taskTitle :e.target.value       
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

        this.setState({
            taskTitle : '',
            content: ''
        });
        
    };

    handleKeyDown = (e)=>{
        if(e.key === "Enter"){
             this.handleSubmit();
        };
        
    };


    render(){
        const {taskTitle} = this.state;
        const {disabled} = this.props;

        return(
                     <InputGroup>
                                <FormControl
                                border="warning"
                                placeholder='Enter new task...'
                                value={taskTitle}
                                onChange={this.handleChange}
                                onKeyDown={this.handleKeyDown}
                                disabled={disabled}   
                                />
                                
                                <InputGroup.Append>
                                    <Button 
                                    variant="outline-warning" 
                                    onClick={this.handleSubmit}
                                    disabled={disabled}
                                    >
                                    Add
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                              
        );
    };
};


 NewTask.propTypes = {
    onAddTask: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default NewTask;