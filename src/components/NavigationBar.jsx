import React from 'react'
import Navbar  from 'react-bootstrap/Navbar'
import Container  from 'react-bootstrap/Container'
import Nav  from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { selectCountAll } from "../redux/slices/wishlistSlice";
export default function NavigationBar() {
  const wishlistCounter = useSelector(selectCountAll);
    const active = {
        fontWeight:"bold",
    };
  return (
    <Navbar bg="light" expand="lg" >
    <Container>
      <Navbar.Brand>MyEvents</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link
          as={NavLink}
          to="events"
          style={({ isActive }) => (!isActive ? undefined :active )}
        >
          Events
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="events/add"
          style={({ isActive }) => (!isActive ? undefined :active )}
        >
          Add Event
        </Nav.Link>
        <Nav.Link
            as={NavLink}
            to="/wishlist"
            style={({ isActive }) => ({
              textDecoration: isActive && "underline",
            })}
          >
            Wishlist ({wishlistCounter})
          </Nav.Link>
      </Nav>
    </Container>
  </Navbar>

  )
}
