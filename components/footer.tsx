'use client'
import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { useSession } from 'next-auth/react';
export default function Footer() {
  const { data: session, status } = useSession();
  return (

    <Navbar bg="dark" data-bs-theme="dark" >
      <Container>
        {status === 'authenticated' ? <Container><h1>Hi, {session.user?.name}! </h1><Nav.Link href={`/savedreadings/${session.user?.id}`}>View your saved readings?</Nav.Link> </Container> : <Container><Nav.Link href="/api/auth/signin">Sign in</Nav.Link> </Container>}


        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">


        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}