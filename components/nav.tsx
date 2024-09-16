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

          Tarot Reader

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
              <Link href={`/account/`} onClick={handleClose} >Account</Link>
              <Link href={`/savedreadings/`} onClick={handleClose} >Saved Readings </Link>
              <Link href={"/signOut"} onClick={handleClose} >Sign out</Link>
            </div>
            :
            <Nav.Link href={"/signIn"} onClick={handleClose} >Sign in</Nav.Link>}
          <h1>Readings</h1>

          <Link href={`/readings/ThreeCardReading`} onClick={handleClose} >Three Card Reading   </Link>
          <Link href={`/readings/FourCardReading`} onClick={handleClose} >Four Card Reading</Link>
          <Link href={`/readings/CelticCrossReading`} onClick={handleClose} >Celtic Cross Reading  </Link>
          <Link href={`/readings/OneCardReading`} onClick={handleClose} >One Card Reading   </Link>
          <Link href={`/readings/TodaysCard`} onClick={handleClose} >Todays Card  </Link>
          <button onClick={handleClose} > Close Nav</button>

        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
