import React, {PureComponent} from 'react';
import {
    Button, 
    FormControl, 
    Modal
} from 'react-bootstrap';
import {formatDate} from '../../helpers/util';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from './newTask.module.css';

class NewTask extends PureComponent{

       state = {
        title : '',
        description: '',
        date: new Date()
    };

    handleChange = (e)=>{
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit=()=>{
        const title = this.state.title.trim(); 
        const description = this.state.description.trim(); 
        if(!title){
            return;
        };

        const newTask ={ 
            title,
            description,
            date:formatDate(this.state.date.toISOString())
        };
      this.props.onAddTask(newTask);
        this.props.onCloseModal();
    };
   
    handleKeyDown = (e)=>{
        if(e.key === "Enter"){
             this.handleSubmit();
        };
        
    };

    handleChangeDate=(value)=>{
        this.setState({
          date: value || new Date()
        });
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
                    name = 'title'  
                    />
                    <FormControl
                    className={styles.textarea}
                    as='textarea'
                    row={4}
                    placeholder='Add Task...'
                    onChange={this.handleChange}
                    name = 'description'  
                    /> 
                    <DatePicker
                    className = {styles.datepicker}
                    minDate = {new Date()}
                    selected={this.state.date}
                    onChange={this.handleChangeDate}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                    className={`${styles.btn} ${this.state.taskTitle !== "" ? styles.btnHover : ""}`}
                    onClick={this.handleSubmit}
                    disabled={this.state.title === "" ? true : false}
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