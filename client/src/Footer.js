import React,{useContext} from 'react'
import { Context } from './Context'
import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';



function Footer() {
  const {userInfo, isLoggedIn,logOut} = useContext(Context)

  return (    
  
  <Navbar>
      <Container>
        <Navbar.Brand >
          
        {isLoggedIn ? <>Logged in as {userInfo.name} </>: "not logged in"}

        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          
          {isLoggedIn ? <Navbar.Text><button onClick={logOut}>Log Out</button></Navbar.Text> : 
          <Navbar.Text as={NavLink} to="/login"><button >Log in</button></Navbar.Text>}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default Footer