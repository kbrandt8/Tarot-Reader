import React,{useContext} from 'react'
import { NavLink,Link} from 'react-router-dom'
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
        <Navbar.Brand as={Link} to="/">
     
          Tarot-Reader

          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">    </Nav.Link> 
         
            {isLoggedIn ? <Nav.Link as={NavLink} activeClassName="active"  to="/dashboard">Dashboard</Nav.Link>
                    : <Nav.Link as={NavLink} activeClassName="active"  to="/Login">Login</Nav.Link>}

                    {isLoggedIn && <Nav.Link as={NavLink} activeClassName="active"  to="/account">Account</Nav.Link>}
            
                       <NavDropdown title="Readings">
              <NavDropdown.Item as={NavLink}   activeClassName="active"  to="/ThreeCardReading">Three Card Reading   </NavDropdown.Item>
              <NavDropdown.Item as={NavLink}  activeClassName="active"  to="/FourCardReading">Four Card Reading</NavDropdown.Item>
              <NavDropdown.Item as={NavLink}  activeClassName="active"  to="/CelticCrossReading">Celtic Cross Reading  </NavDropdown.Item>
              <NavDropdown.Item as={NavLink}  activeClassName="active"  to="/OneCardReading">One Card Reading   </NavDropdown.Item>
              <NavDropdown.Item as={NavLink}   activeClassName="active"  to="/TodaysCard">Todays Card  </NavDropdown.Item>
              


            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nav1;





// function Nav() {
//     const { isLoggedIn} = useContext(Context)

//     return (
//         <nav>
//           <NavLink to="/"><h1>Tarot Reader
          
//           </h1></NavLink>

//             <ul>
//                 <li> <NavLink reloadDocument activeClassName="active"  to="/ThreeCardReading">Three Card Reading</NavLink></li>
//                 <li> <NavLink reloadDocument activeClassName="active"  to="/FourCardReading">Four Card Reading</NavLink></li>
//                 <li> <NavLink reloadDocument activeClassName="active"  to="/CelticCrossReading">Celtic Cross Reading</NavLink></li>                
//                 <li> <NavLink reloadDocument activeClassName="active"  to="/OneCardReading">One Card Reading</NavLink></li>
//                 <li> <NavLink reloadDocument activeClassName="active"  to="/TodaysCard">Todays Card</NavLink></li>


//                 <li> {isLoggedIn ? <NavLink activeClassName="active"  to="/dashboard">Dashboard</NavLink>
//                     : <NavLink activeClassName="active"  to="/Login">Login</NavLink>}</li>

//                     {isLoggedIn && <li><NavLink activeClassName="active"  to="/account">Account</NavLink></li>}
//             </ul>

//             <BsMoon/>

//         </nav >
//     )
// }

// export default Nav