import React, {Component} from 'react';
import EditTask from '../../EditTask/EditTask'
import {Card, Button,Container,Row,Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '../../../helpers/util';
import {getOneTask, removeTask} from '../../../store/actions'
import {connect} from 'react-redux';

import styles from './singltask.module.css';



 class SingleTask extends Component{

    state = {
        openEditModal : false
    };

    componentDidMount(){
        const taskId = this.props.match.params.taskId;
        this.props.getOneTask(taskId);

    };

    componentDidUpdate(prevProps){
        if (!prevProps.editingOneTask && this.props.editingOneTask){
            this.setState({
                openEditModal : false
            });

        };
    
    }

    onDelete  = ()=>{
        const taskId = this.props.match.params.taskId;
        this.props.removeTask(taskId, 'single');
    };


    toggleEditModal = ()=>{
        this.setState({
            openEditModal: !this.state.openEditModal
        });
    };


    render(){
        const {openEditModal} = this.state;
        const {task} = this.props;

        return(
            <div className = {styles.wrap}>
            <Container className = {styles.container}>
                <Row className ='justify-content-center'>
                    <Col xs={10}>
                    { task ?
                    <Card className={`${styles.task} `}>               
                        <Card.Body className ='justify-content-center'>
                            <Card.Title className= {styles.title}>
                                    {task.title}
                            </Card.Title>    
                            <Card.Text className= {styles.text}>
                            {task.description}
                            </Card.Text>
                            <Card.Text className= {styles.text}>
                            {formatDate(task.date)}
                            </Card.Text>
                            <Button 
                            className={`${styles.btnColor} `} 
                            size="sm" 
                            onClick={this.onDelete}
                            >
                            <FontAwesomeIcon icon={faTrash} className={styles.iconColor} />
                            </Button>
                            <Button 
                            className={`${styles.btnColor}`}
                            size="sm"
                            onClick={this.toggleEditModal}
                            >
                            <FontAwesomeIcon icon={faPencilAlt} className={styles.iconColor}/>
                            </Button>
                    </Card.Body>
                    </Card> :
                       <p  className = {styles.loading}>Loading...</p>
                    }  
                </Col>
                </Row>
            </Container>

            {
                openEditModal && 
                <EditTask
                    data = {task}
                    onClose = {this.toggleEditModal}
                    from='single'
                 />
            }

            </div>
            
        );
    };
    
};

const mapStateToProps = (state) => {
    return {
        task:state.task
    };
};


const mapDispatchToProps = {
    getOneTask,
    removeTask
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);