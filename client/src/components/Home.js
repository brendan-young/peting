import React from 'react'
import toys from '../data/seed'
import { Link, useNavigate } from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const Home = () => {
  const navigate = useNavigate()

  const toyList = toys.map(toy => {
    return (
      <>
        <Row xs={1} md={2} className="g-4">
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={toy.photo} />
              <Card.Body>
                <Card.Title>{toy.name}</Card.Title>
                <Button
                  className="button"
                  variant="primary"
                  onClick={() => navigate(`/${toy.id}`)}

                >Take a look!</Button>

                <Button
                  className="button"
                  variant="success"
                  onClick={() => navigate(`/review/new`)}

                >Write a review</Button>
              </Card.Body>

            </Card>
          </Col>
        </Row>
      </>
    )
  })

  return (
    <div>
      {toyList}
    </div>
  )
}

export default Home