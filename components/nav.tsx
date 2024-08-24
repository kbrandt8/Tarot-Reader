'use client'
import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { NavLink } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function NavBar() {
  const { data: session, status } = useSession();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Navbar fixed="top" expand="xx-sm" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} href="/">

          Tarot-Reader

        </Navbar.Brand>
        <Navbar.Toggle onClick={handleShow} />
      </Container>

      <Offcanvas show={show} onHide={handleClose} className="mobileNav">
        <Offcanvas.Header closeButton>
          <h1>Nav</h1>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h1>Account</h1>
          {status === 'authenticated' ?
            <div>
              <Link href={`/account/${session.user?.id}`} >Account</Link>
              <Link href={`/savedreadings/${session.user?.id}`} >Saved Readings </Link>
              <Link href="/api/auth/signout">Sign out</Link>
            </div>
            :
            <Nav.Link href="/api/auth/signin">Sign in</Nav.Link>}
          <h1>Readings</h1>

          <Link href={`/readings/ThreeCardReading`}>Three Card Reading   </Link>
          <Link href={`/readings/FourCardReading`}>Four Card Reading</Link>
          <Link href={`/readings/CelticCrossReading`}>Celtic Cross Reading  </Link>
          <Link href={`/readings/OneCardReading`}>One Card Reading   </Link>
          <Link href={`/readings/TodaysCard`}>Todays Card  </Link>
          <button onClick={handleClose} > Close Nav</button>

        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
