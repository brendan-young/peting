import React from 'react'
import { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const initialState = {
  name : "",
  breed : "",
  about: "",
}

const CreatePet = (props) => {
  const [fields, setFields] = useState(initialState)
  const [image, setImage] = useState(null)

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    const updatedFields = {
      ...fields,
      [name]: value,
    }
    setFields(updatedFields)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleCreatePet({ ...fields, image: image })
    setFields(initialState)
    setImage(null)
  }



  return (
    <div>
      <h1>Create a new Pet</h1>
      <Form onSubmit={handleSubmit} className="new-pet-form">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={1}
            value={fields.name}
            onChange={handleChange}
            name="name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="breed">
          <Form.Label>Breed</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={1} 
            value={fields.breed}
            onChange={handleChange}
            name="breed"
          />
        </Form.Group>
       
        <Form.Group className="mb-3" controlId="about">
          <Form.Label>About</Form.Label>
          <Form.Control 
          as="textarea" 
          rows={3} 
          value={fields.about}
          onChange={handleChange}
          name="about"
        />
        </Form.Group>
       
        <label htmlFor="image">
          Upload a profile photo
        </label>
        <input
          name="image"
          onChange={handleImageChange}
          id="image"
          type="file"
        
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  
  )
}

export default CreatePet