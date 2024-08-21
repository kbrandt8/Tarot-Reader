'use client'
import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { useSession } from 'next-auth/react';
export default function Footer() {
  const { data: session, status } = useSession();
  return (
    <footer>
      <Navbar bg="dark" data-bs-theme="dark" >
        <Container>
          {status === 'authenticated' ? <Container> <Nav.Link href={`/account/${session.user?.id}`}>Signed in as {session.user?.name}</Nav.Link> </Container> : <Container><Nav.Link href="/api/auth/signin">Sign in</Nav.Link> </Container>}


          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">


          </Navbar.Collapse>
        </Container>
      </Navbar>
    </footer>
  )
}