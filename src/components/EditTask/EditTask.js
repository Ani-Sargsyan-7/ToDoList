import React, {Component} from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types'; 
import styles from './edit.module.css'

class EditTask extends Component{
  constructor(props){
    super(props);
    this.state = {
        ...props.data
    };
  }

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    };

    handleSubmit = ()=>{
        const taskTitle = this.state.taskTitle.trim();
        const content = this.state.content.trim();

        if (!taskTitle) {
            return;
        }

        this.props.onSave({
          _id: this.state._id,
          taskTitle,
          content
        });
    };

    render(){
        const {onClose} = this.props;
        const {taskTitle, content} = this.state;

        return(
            <Modal
            show={true}
            onHide={onClose}
            size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <FormControl
            className={`${styles.input} mb-3`}
            onChange={this.handleChange}
            name='taskTitle'
            value={taskTitle}
            onKeyUp={this.handleKeyDown}
          />
          <FormControl 
          className={`${styles.textarea} mb-3`}
          as="textarea" 
          row={4} 
          name='content'
          value={content}
          onChange={this.handleChange}
          />

          </Modal.Body>
          <Modal.Footer>
            <Button 
            className={`${styles.btn} ${styles.btnHover}`}
            onClick={this.handleSubmit}
            variant='success'
            >
            Save
            </Button>
            <Button 
            className={`${styles.btn} ${styles.btnHover}`}
            onClick={onClose}
            >
            Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        );
    }
}

EditTask.propTypes = {
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default EditTask;