import { NavLink, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useUser } from '../../context/user';

const NavigationBar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useUser()

 useEffect(() => {
  const checkLoggedIn = async () => {
    const res = await fetch('/is-authenticated')
    const data = await res.json()
    setUser(data.user)
  }
  if (!user) checkLoggedIn() 
 }, [user])



  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => {navigate("/")}}>Peting</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" >Home</Nav.Link>
            {!user && <Nav.Link as={Link} to="/login" >Login</Nav.Link>}
            {!user && <Nav.Link as={Link} to="/register">Register</Nav.Link>}
            {user && <Nav.Link as={Link} to="/logout">Logout</Nav.Link>}
           {user && <Nav.Link as={Link} to={`/users/${user.id}`}>Your Pets</Nav.Link>}
            
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
        {user ? <Navbar.Brand>Welcome Back {user.username}</Navbar.Brand> : <Navbar.Brand>Welcome Guest!</Navbar.Brand>}
      </Container>
    </Navbar>
  );
}

export default NavigationBar