import '../App.css';
import React from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const ToyDetails = ({ toys, reviews }) => {
  const { toyID, reviewID, petID } = useParams()
  const navigate = useNavigate()

  const [toyReviews, setToyReviews] = useState([])
  
  const getToyReviews = async () => {
    const url = `/toys/${toyID}`
    const res = await fetch(url)
    const data = await res.json()
    setToyReviews(data)
  }
  
  useEffect(() => {
    getToyReviews()
  }, [])
  
  console.log(toyReviews)
  const toy = toys.find((toy) => { return toy.id === Number(toyID) })
  const getReviews = reviews.find((getReviews) => { return getReviews.toy_id === Number(toyID) })
  const allToyReviews = toyReviews.map((review) => { 
    return (
      <div key={toy.id}>
        
        <h2>Reviews</h2>
        <Card className='review-card' style={{ width: '20rem' }}>
          <Card.Img variant="top" src={review.image_url} />
          <Card.Body>
            <Card.Title>{getReviews.headline}</Card.Title>
            <Card.Title>{review.name}</Card.Title>
            <Card.Text>
             {getReviews.date}
            </Card.Text>
            <Card.Text>
             Breed : {review.breed}
            </Card.Text>
            <Card.Text>
              {getReviews.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
   })

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
            <Button variant="primary" onClick={() => {navigate("/review/new")}} >Write a review</Button>
          </Card.Body>
        </Card>
      {allToyReviews}
    </>
  )
}

export default ToyDetails