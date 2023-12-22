'use client'
import React,{useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Footer(){
    return (    
  
        <Navbar>
            <Container>
         
              <Navbar.Brand >
              
         
      
              </Navbar.Brand>
      
      
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                
            
              </Navbar.Collapse>
            </Container>
          </Navbar>
      
        )
}