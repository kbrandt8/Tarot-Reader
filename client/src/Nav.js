 /* eslint-disable */ 
import React,{useContext} from 'react'
import { NavLink} from 'react-router-dom'
import { Context } from "./Context"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';





function Nav1() {
    const {isLoggedIn} = useContext(Context)
  return (
    <Navbar fixed="top" expand="md">
      <Container>
        <Navbar.Brand>
     
          Tarot-Reader

          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">    </Nav.Link> 
         
            {isLoggedIn ? <Nav.Link as={NavLink} activeclassname="active"  to="/dashboard">Dashboard</Nav.Link>
                    : <Nav.Link as={NavLink} activeclassname="active"  to="/Login">Login</Nav.Link>}

                    {isLoggedIn && <Nav.Link as={NavLink} activeclassname="active"  to="/account">Account</Nav.Link>}
            
                       <NavDropdown title="Readings">
              <NavDropdown.Item as={NavLink}   activeclassname="active"  to="/ThreeCardReading">Three Card Reading   </NavDropdown.Item>
              <NavDropdown.Item as={NavLink}  activeclassname="active"  to="/FourCardReading">Four Card Reading</NavDropdown.Item>
              <NavDropdown.Item as={NavLink}  activeclassname="active"  to="/CelticCrossReading">Celtic Cross Reading  </NavDropdown.Item>
              <NavDropdown.Item as={NavLink}  activeclassname="active"  to="/OneCardReading">One Card Reading   </NavDropdown.Item>
              <NavDropdown.Item as={NavLink}   activeclassname="active"  to="/TodaysCard">Todays Card  </NavDropdown.Item>
              


            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nav1;


