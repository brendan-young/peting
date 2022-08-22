import React from 'react'
import { useParams } from "react-router-dom"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ToyDetails = ({ toys }) => {
  const { toyID } = useParams()
  console.log(toys, 'These are toys')
  // console.log(toyID, 'These are the toys ID') -> coming in as undefined

  // const toyID = toys.id
  const toy = toys.find((toy) => { return toy.id === Number(toyID) })
  // const toy = toys.filter( obj => {

  // console.log(typeof toyID)
  return (
    <>
      <Card style={{ width: '30rem' }}>
        <Card.Img variant="top" src={toy.photo} />
        <Card.Body>
          <Card.Title>{toy.name}</Card.Title>
          <Card.Text>
            {toy.desc}
          </Card.Text>
          <Card.Text>
           Price: ${toy.price}
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </>
  )
}

export default ToyDetails