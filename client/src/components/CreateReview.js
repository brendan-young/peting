import React from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


const CreateReview = () => {
  return (
    <div>
      <h1>Create a new review</h1>
      <Form>
        <Form.Group className="mb-3" controlId="headliner">
          <Form.Label>Headliner</Form.Label>
          <Form.Control as="textarea" rows={1} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>What are your thoughts?</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter your thoughts" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="longevity">
          <Form.Label>Rate your toys longevity:</Form.Label>
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="me-2" aria-label="First group">
              <Button>1</Button> <Button>2</Button> <Button>3</Button>
              <Button>4</Button><Button>5</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rating">
          <Form.Label>Overall toy rating:</Form.Label>
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="me-2" aria-label="First group">
              <Button>1</Button> <Button>2</Button> <Button>3</Button>
              <Button>4</Button><Button>5</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Form.Group>

        <Form.Group className="mb-3" controlId="enjoyment">
          <Form.Label>How much did you enjoy this toy?</Form.Label>
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="me-2" aria-label="First group">
              <Button>1</Button> <Button>2</Button> <Button>3</Button>
              <Button>4</Button><Button>5</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Would you have your parents buy again?" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default CreateReview