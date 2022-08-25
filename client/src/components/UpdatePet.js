
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";



const UpdatePet = ({ pets, handleUpdatePet }) => {
  // const [pets, setPets] = useState([])
  console.log(pets, 'This is pets from Update')
  const { petID } = useParams()
  console.log(petID);
  const pet = pets.find((pet) => pet.id === Number(petID))

  const [fields, setFields] = useState(pet)
  const [image, setImage] = useState(pet.image_url)
  

  // const getPets = async () => {
  //   const url = '/pets'
  //   const res = await fetch(url)
  //   const data = await res.json()
  //   console.log(data)
  //   setPets(data)
  // }

  // useEffect(() => {
  //   const getPets = async () => {
  //     const url = '/pets'
  //     const res = await fetch(url)
  //     const data = await res.json()
  //     console.log(data)
  //     setPets(data)
  //   }
  //   getPets()
  //   .catch(console.error)
  // }, [])

 
  console.log(pets, "Pets state on UpdatePet page")
 
  console.log(pet)

  
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedFields = {
      ...fields,
      [name] : value
    }
    setFields(updatedFields)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdatePet({
      ...fields,
      image: image},
      fields.id)
  }

  return (
    <div>
      <h1> Update {pet.name}</h1>
      <Form onSubmit={handleSubmit} className="update-pet-form">
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

export default UpdatePet