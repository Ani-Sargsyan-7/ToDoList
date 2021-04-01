import React, { PureComponent } from 'react';
import {Container,Row,Col, Card, Button,Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faCheckDouble, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '../../helpers/util';
import {textTruncate} from '../../helpers/util';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {editTask} from '../../store/actions'

import styles from './task.module.css';
import { connect } from 'react-redux';



class Task extends PureComponent {

    handleChange = ()=>{
        const {data, chekedTasks} = this.props;
        chekedTasks(data._id);
    };
    
    render(){     
  
        const task = this.props.data;
        const {disabled, onDelete,index, selected,onEdit, editTask } = this.props;
        
        return(    
            <Container fluid>  
            <Row className='justify-content-center'>  
            <Col xs={12}>
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
                        {textTruncate(task.title, 26)}
                    </Card.Title>  
            </Link>
               
                <Card.Text className= {styles.text}>
                 {textTruncate(task.description, 50)}
                </Card.Text>

                <Card.Text className= {styles.statusDate}>
                    Status: {task.status}
                </Card.Text>

                <Card.Text className= {styles.statusDate}>
                   <span> Created: {formatDate(task.created_at)}</span>
                   <br/>
                   <span> Date for doing:{formatDate(task.date)}</span>
                </Card.Text>

                <Button 
                className={`${styles.btn} ${!selected ? styles.btnColorHover : ""}`} 
                size="sm" 
                onClick={()=>onDelete(task._id)}
                disabled={disabled}
                >
                <FontAwesomeIcon icon={faTrash} className={styles.iconColor} />
                </Button>

                <Button 
                className={`${styles.btn} ${!selected ? styles.btnColorHover : ""}`}
                size="sm"
                onClick={() => onEdit(task)}
                disabled={disabled}
                >
                <FontAwesomeIcon icon={faPencilAlt} className={styles.iconColor}/>
                </Button>
                {task.status === 'active' ?
                <Button 
                className={`${styles.btn} ${!selected ? styles.btnColorHover : ""}`}
                size="sm"
                onClick={() => editTask({
                    status : 'done',
                    _id: task._id
                })}
                >
                <FontAwesomeIcon icon={faCheckDouble} className={styles.iconColor}/>                
                </Button>:
                <Button 
                className={`${styles.btn} ${!selected ? styles.btnColorHover : ""}`}
                size="sm"
                onClick={() => editTask({
                    status : 'active',
                    _id: task._id
                })}
                >
                <FontAwesomeIcon icon={faRedoAlt} className={styles.iconColor}/>
                </Button>
            }
            </Card.Body>
        </Card>
        </Col> 
        </Row> 
        </Container> 
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

const mapDispatchToProps = {
    editTask
}

export default connect(null, mapDispatchToProps)(Task);
