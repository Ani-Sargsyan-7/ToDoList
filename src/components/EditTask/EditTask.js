import React, {PureComponent} from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import {formatDate} from '../../helpers/util';
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types'; 

import styles from './edit.module.css';

class EditTask extends PureComponent{
  constructor(props){
    super(props);
    const {date} = props.data;
    this.state = {
        ...props.data,
        date: date ? new Date(date) : new Date()
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
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            return;
        }

        this.props.onSave({
          _id: this.state._id,
          title,
          description,
          date: formatDate(this.state.date.toISOString())
        });
    };

    handleChangeDate=(value)=>{
      this.setState({
        date: value || new Date()
      });
    };

    render(){
        const {onClose} = this.props;
        const {title, description} = this.state;

        return(
            <Modal
            show={true}
            onHide={onClose}
            size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title 
            className={styles.modalTitle}
            id="contained-modal-title-vcenter">
              Edit Task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <FormControl
            className={`${styles.input} mb-3`}
            onChange={this.handleChange}
            name='title'
            value={title}
            onKeyUp={this.handleKeyDown}
          />
          <FormControl 
          className={`${styles.textarea}`}
          as="textarea" 
          row={4} 
          name='description'
          value={description}
          onChange={this.handleChange}
          />

          </Modal.Body>
          <DatePicker 
          minDate = {new Date()}
          selected={this.state.date}
          onChange={this.handleChangeDate}
          />
          <Modal.Footer>
            <Button 
            className={`${styles.btn} ${styles.btnHover}`}
            onClick={this.handleSubmit}
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