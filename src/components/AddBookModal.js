import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap/';


class AddBookModal extends React.Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Adding New Book</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>  
                        <Form onSubmit={this.props.handleForm}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Book Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Name" name="name" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Book Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Description" name="description" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Book Status</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Status" name="status" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Book Image</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Image Link" name="img" />
                            </Form.Group>
                             <Modal.Footer>
                                <Button variant="secondary" onClick={this.props.handleClose}>
                                    Close
                                </Button>
                                <Button variant="success" type="submit" >
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default AddBookModal
