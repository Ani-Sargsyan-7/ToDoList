import React, { Component } from 'react';
import {Card, Button,Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from './task.module.css';



class Task extends Component {

    handleChange =()=>{
        const {card, chekedTasks} = this.props;
        chekedTasks(card._id);
    };

    render(){       
        const {card} = this.props;
        const {disabled, onDelete,index, selected, onEdit} = this.props;
   
        return(           
            <Card className={`${styles.card} ${selected ? styles.selected : ""}`}>               
            <Card.Header>
                <Form.Check
                className={styles.check} 
                type="checkbox" 
                onChange={this.handleChange}
                checked={selected}
                />
                Task {index}
                </Card.Header>
            <Card.Body>
                <Card.Title className= {styles.title}>
                    {card.taskTitle}
                </Card.Title>
                <Card.Text className= {styles.text}>
                    {card.content}
                </Card.Text>
                <Button 
                className={styles.btnColor} 
                size="sm" 
                onClick={()=>onDelete(card._id)}
                disabled={disabled}
                >
                <FontAwesomeIcon icon={faTrash} className={styles.iconColor} />
                </Button>
                <Button 
                className={styles.btnColor}
                size="sm"
                onClick={() => onEdit(card)}
                >
                <FontAwesomeIcon icon={faPencilAlt} className={styles.iconColor}/>
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
