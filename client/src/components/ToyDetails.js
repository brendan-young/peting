import React from 'react'
import { useParams } from "react-router-dom"
import { useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// Put in use effect that gives you data for this component

const ToyDetails = ({ toys, reviews, pets }) => {
  const { toyID, reviewID } = useParams()

  const toy = toys.find((toy) => { return toy.id === Number(toyID) })
  const getReviews = reviews.find((getReviews) => { return getReviews.toy_id === Number(toyID) })
  console.log(getReviews)

  return (
    <>
      <Card style={{ width: '30rem' }}>
        <Card.Img variant="top" src={toy.image_url} />
        <Card.Body>
          <Card.Title>{toy.name}</Card.Title>
          <Card.Text>
            {toy.description}
          </Card.Text>
          <Card.Text>
           Price: ${toy.price}
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
      <h2>Reviews</h2>
      <Card style={{ width: '30rem' }}>
        <Card.Img variant="top" src={pets.image_url} />
        <Card.Body>
          <Card.Title>{getReviews.headline}</Card.Title>
          <Card.Title>{pets.name}</Card.Title>
          <Card.Text>
           {getReviews.date}
          </Card.Text>
          <Card.Text>
            {getReviews.description}
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </>
  )
}

export default ToyDetails