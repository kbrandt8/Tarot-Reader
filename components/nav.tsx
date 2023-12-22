'use client'
import React,{useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';




export default function NavBar() {

  return (
    <Navbar fixed="top" expand="md">
      <Container>
        <Navbar.Brand as={Link} href="/">
     
          Tarot-Reader

          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">    </Nav.Link> 
         
            
                       <NavDropdown title="Readings">
              <NavDropdown.Item as={Link}    href={`/readings/ThreeCardReading`}>Three Card Reading   </NavDropdown.Item>
              <NavDropdown.Item as={Link}   href={`/readings/FourCardReading`}>Four Card Reading</NavDropdown.Item>
              <NavDropdown.Item as={Link}   href={`/readings/CelticCrossReading`}>Celtic Cross Reading  </NavDropdown.Item>
              <NavDropdown.Item as={Link}   href={`/readings/OneCardReading`}>One Card Reading   </NavDropdown.Item>
              <NavDropdown.Item as={Link}    href={`/readings/TodaysCard`}>Todays Card  </NavDropdown.Item>
              


            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
