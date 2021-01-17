import React, { Component } from 'react';
import {Card, Button,Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './task.module.css';


class Task extends Component {

    state ={
        selected : false
    };

    handleChange =()=>{
        const {card, chekedTasks} = this.props;
        chekedTasks(card._id);
        this.setState({
            selected : !this.state.selected
        });
    };

    render(){
        const card = this.props.card;
        const {disabled, onDelete,index} = this.props;
        const {selected} = this.state;
        
        return(
            <Card border="warning" className={`${styles.task} ${selected ? styles.selected: ""}`}>                   
            <Card.Header>
                <Form.Check 
                type="checkbox" 
                onChange={this.handleChange}
                />
                Task {index}
                </Card.Header>
            <Card.Body>
                <Card.Title>
                    {card.taskTitle}
                </Card.Title>
                <Button 
                border="warning"
                className='mr-2' 
                size="sm" variant="danger" 
                onClick={()=>onDelete(card._id)}
                disabled={disabled}
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
        );
    };
};

Task.propTypes = {
    card : PropTypes.object.isRequired,
    chekedTasks: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onDelete:PropTypes.func.isRequired,
    index:PropTypes.number.isRequired
};


export default Task;