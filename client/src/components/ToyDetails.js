import '../App.css';
import React from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const ToyDetails = ({ toys, reviews }) => {
  const { toyID, reviewID, petID } = useParams()
  const navigate = useNavigate()

  // UseState
  const [toyReviews, setToyReviews] = useState([])
  
  const getToyReviews = async () => {
    const url = `/toys/${toyID}`
    const res = await fetch(url)
    const data = await res.json()
    setToyReviews(data)
    console.log(data, 'This is the ToyReviews Data')
  }
  
  useEffect(() => {
    getToyReviews()
  }, [])

  // console.log(pets, "Pets")
  // console.log(reviews, "Reviews")
  // console.log(reviews[0].pet_id, "Pet ID inside the reviews table")

  
  console.log(toyReviews)
  const toy = toys.find((toy) => { return toy.id === Number(toyID) })
  const getReviews = reviews.find((getReviews) => { return getReviews.toy_id === Number(toyID) })
  const allToyReviews = toyReviews.map((review) => { 
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
             {review.breed}
            </Card.Text>
            <Card.Text>
              {getReviews.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    )
   })
  // console.log(allToyReviews, 'All toy reviews')
  // console.log(toyReviews)
  // const getPets = pets.find((getPets) => { return getPets.pet_id === Number(petID) })
  // const getpet = pets.filter((pet) => { reviews.pet_id === pets.id })
  // console.log(getPet)

  return (
    <>
      {allToyReviews}
    </>
  )
}

export default ToyDetails