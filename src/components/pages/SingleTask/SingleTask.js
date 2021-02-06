import React, {Component}from 'react';
import EditTask from '../../EditTask/EditTask'
import {Card, Button,Container,Row,Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '../../../helpers/util';

import styles from './singltask.module.css';



export default class SingleTask extends Component{

    state = {
        task : null,
        openEditModal : false
    };

    componentDidMount(){
        const taskId = this.props.match.params.taskId;
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(async (response) => {
            const taskResponse = await response.json();

            if(response.status >=400 && response.status < 600){
                if(taskResponse.error){
                    throw taskResponse.error;
                }
                else {
                    throw new Error('Something went wrong!');
                }
            }

          this.setState({
              task: taskResponse
          });

        })
        .catch((error)=>{
            console.log('catch error', error);
        });

    };

    onDelete  = ()=>{
        const taskId = this.state.task._id;
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async (response) => {
                const taskResponse = await response.json();
    
                if(response.status >=400 && response.status < 600){
                    if(taskResponse.error){
                        throw taskResponse.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }
                
                this.props.history.push('/');
            })
            .catch((error)=>{
                console.log('catch error', error);
            });
    };

    saveTask  = (editedTask)=>{
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(editedTask)
        })
            .then(async (response) => {
                const taskResponse = await response.json();

                if(response.status >=400 && response.status < 600){
                    if(taskResponse.error){
                        throw taskResponse.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }
                
        this.setState({
            task: taskResponse,
            openEditModal: false
        });
              
            })
            .catch((error)=>{
                console.log('catch error', error);
            });



    };

    toggleEditModal = ()=>{
        this.setState({
            openEditModal: !this.state.openEditModal
        });
    };

    render(){
        const {task, openEditModal} = this.state;
        return(
            <>
            <Container>
                <Row className ='justify-content-center'>
                    <Col xs={6}>
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
                    onSave = {this.saveTask}
                 />
            }

            </>
            
        );
    };
    
};