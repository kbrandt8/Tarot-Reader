'use client'
import React,{useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
export default function Footer(){
  const { data: session, status } = useSession();
    return (    
  
        <Navbar>
            <Container>
         
              <Navbar.Brand >
              
         
      
              </Navbar.Brand>
              {status === 'authenticated' ? <h1>Hi, {session.user?.name}! <Link href={`/savedeadings`}>View your saved readings?</Link></h1> :  <Link href="/api/auth/signin">Sign in</Link> }
      
      
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                
            
              </Navbar.Collapse>
            </Container>
          </Navbar>
      
        )
}