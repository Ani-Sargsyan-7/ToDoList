import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import styles from './confirm.module.css';


function Confirm(props){
    return (
        <Modal
        show={true}
        onHide={props.onClose}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className={styles.modalTitle}>
            Are you sure to remove {props.count} task{props.count>1 ? "s": ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer className='justify-content-center'>
            <Button  
            onClick={props.onClose}
            >
            Cancel
            </Button>
            <Button
            onClick={props.onConfirm}
            variant='danger'
            >
            Delet
            </Button>
          </Modal.Footer>
        </Modal>
      );
    };
    



export default Confirm;