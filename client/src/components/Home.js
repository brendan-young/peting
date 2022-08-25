import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from '../context/user'


import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Home = ({ toys }) => {
  const [user, setUser] = useUser()

  const navigate = useNavigate();


  const toyList = toys.map((toy) => {
    return (
      <Col key={toy.id}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={toy.image_url} />
          <Card.Body>
            <Card.Title>{toy.name}</Card.Title>
            <Button
              className="button"
              variant="primary"
              onClick={() => navigate(`/${toy.id}`)}
            >
              Take a look!
            </Button>{' '}
            { user && <Button
              className="button"
              variant="success"
              onClick={() => navigate(`/review/new`)}
            >
              Write a review
            </Button>}
          </Card.Body>
        </Card>
      </Col>
    );
  });

  return (
    <Row xs={1} md={4}>
      {toyList}
    </Row>
  );
};

export default Home;
