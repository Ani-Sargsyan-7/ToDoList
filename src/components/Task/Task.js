import React, { PureComponent } from 'react';
import {
    Card, 
    Button,
    Form 
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '../../helpers/util';
import {descripTruncate, titleTruncate} from '../../helpers/util';
import PropTypes from 'prop-types';

import styles from './task.module.css';
import {Link} from 'react-router-dom';


class Task extends PureComponent {

    handleChange =()=>{
        const {card, chekedTasks} = this.props;
        chekedTasks(card._id);
    };

    render(){       
        const {card} = this.props;
        const {disabled, onDelete,index, selected, onEdit} = this.props;
   
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
                <Link  to={`/task/${card._id}`} className = {styles.link}>
                    <Card.Title className= {styles.title}>
                        {titleTruncate(card.title)}
                    </Card.Title>
                </Link>     
                <Card.Text className= {styles.text}>
                 {descripTruncate(card.description)}
                </Card.Text>
                <Card.Text className= {styles.text}>
                 {formatDate(card.date)}
                </Card.Text>
                <Button 
                className={`${styles.btnColor} ${!selected ? styles.btnColorHover : ""}`} 
                size="sm" 
                onClick={()=>onDelete(card._id)}
                disabled={disabled}
                >
                <FontAwesomeIcon icon={faTrash} className={styles.iconColor} />
                </Button>
                <Button 
                className={`${styles.btnColor} ${!selected ? styles.btnColorHover : ""}`}
                size="sm"
                onClick={() => onEdit(card)}
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
    card : PropTypes.object.isRequired,
    chekedTasks: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onDelete:PropTypes.func.isRequired,
    index:PropTypes.number.isRequired
};


export default Task;
