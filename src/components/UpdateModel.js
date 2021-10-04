import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';


class UpdateModel extends Component {
    render() {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Fruit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    name
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control value={this.props.name} onChange={this.props.handleName} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    image
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control value={this.props.image} onChange={this.props.handleImage} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    price
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control value={this.props.price} onChange={this.props.handlePrice} />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="primary" onClick={() => this.props.handleUpdateSubmit(this.props.fruitId)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default UpdateModel
