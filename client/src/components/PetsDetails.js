import React from "react";
import "../App.css";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const PetsDetails = ({ users, handleDeletePet, pets }) => {
  const { userID, petsID } = useParams();
  const [userPets, setUserPets] = useState([]);
  const navigate = useNavigate();

  console.log(userPets);
  const getUserPets = async () => {
    console.log(userID);
    const url = `/users/${userID}`;
    const res = await fetch(url);
    const data = await res.json();
    setUserPets(data);
  };

  useEffect(() => {
    getUserPets();
  }, []);

  const allUserPets = userPets.map((pet) => {
    return (
      <div>
        <Col key={pet.id}>
          <Card style={{ width: "18rem" }} className='card'>
            <Card.Img variant="top" src={pet.image_url}  />
            <Card.Body>
              <Card.Title>{pet.name}</Card.Title>
              <Card.Text>{pet.breed}</Card.Text>
              <Card.Text>{pet.about}</Card.Text>
              <Button
                className="mr-2"
                variant="primary"
                onClick={() => navigate("/")}
              >
                Update
              </Button>{' '}
              <Button
                className="button"
                variant="danger"
                onClick={() => handleDeletePet(pet.id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </div>
    );
  });

  return (
    <div>
      <Button
        className="button"
        variant="primary"
        onClick={() => navigate(`/pets/new`)}
      >
        Create A New Pet
      </Button>
        <Row xs={1} md={4}>
          {allUserPets}
        </Row>
    </div>
  );
};

export default PetsDetails;
