import React, { PureComponent } from 'react';
import {
    Card, 
    Button,
    Form 
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '../../helpers/util';
import {descripTruncate} from '../../helpers/util';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import styles from './task.module.css';



class Task extends PureComponent {

    handleChange =()=>{
        const {data, chekedTasks} = this.props;
        chekedTasks(data._id);
    };
    
    render(){     
  
        const task = this.props.data;
        const {disabled, onDelete,index, selected,onEdit } = this.props;
        
        return(           
            <Card className={`${styles.card} ${selected ? styles.selected : ""}`}>               
            <Card.Header className = {styles.header}>
                <Form.Check
                className={styles.check} 
                type="checkbox" 
                onChange={this.handleChange}
                checked={selected}
                />
                Task {index}
                </Card.Header>
            <Card.Body>
            <Link to={`/task/${task._id}`} className = {styles.link}>
                    <Card.Title className= {styles.title}>
                        {descripTruncate(task.title, 26)}
                    </Card.Title>  
            </Link>
                <Card.Text className= {styles.text}>
                 {descripTruncate(task.description, 50)}
                </Card.Text>
                <Card.Text className= {styles.text}>
                 {formatDate(task.date)}
                </Card.Text>
                <Button 
                className={`${styles.btnColor} ${!selected ? styles.btnColorHover : ""}`} 
                size="sm" 
                onClick={()=>onDelete(task._id)}
                disabled={disabled}
                >
                <FontAwesomeIcon icon={faTrash} className={styles.iconColor} />
                </Button>
                <Button 
                className={`${styles.btnColor} ${!selected ? styles.btnColorHover : ""}`}
                size="sm"
                onClick={() => onEdit(task)}
                disabled={disabled}
                >
                <FontAwesomeIcon icon={faPencilAlt} className={styles.iconColor}/>
                </Button>
            </Card.Body>
        </Card>
        
        );
    };
    
};


Task.propTypes = {
    data : PropTypes.object.isRequired,
    chekedTasks: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onDelete:PropTypes.func.isRequired,
    index:PropTypes.number.isRequired
};


export default Task;
