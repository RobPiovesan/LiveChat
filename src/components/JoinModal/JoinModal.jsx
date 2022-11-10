import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function JoinModal({ show, onClick }) {
  const [input, setInput] = useState();
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Welcome!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Elon Musk"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => onClick(input)}>
          Join chat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
