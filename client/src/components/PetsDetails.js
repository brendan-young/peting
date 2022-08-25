import React from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const PetsDetails = ({ users, handleDeletePet, pets }) => {
  const { userID, petsID } = useParams();
  const [userPets, setUserPets] = useState([]);
  const navigate = useNavigate();

  console.log(userPets)
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
      <Col key={pet.id}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={pet.image_url} />
          <Card.Body>
            <Card.Title>{pet.name}</Card.Title>
            <Button
              className="button"
              variant="primary"
              onClick={() => navigate('/')
              }
            >
              Update
            </Button>
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
    );
  });

  return (
  <div>
    <Row xs={1} md={4}>
      {allUserPets}
    </Row>
  </div>
  )
};

export default PetsDetails;
