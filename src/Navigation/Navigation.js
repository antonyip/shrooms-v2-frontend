import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">ant-flipside-api</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Login</Nav.Link>
            <Nav.Link href="#link">Admin</Nav.Link>
            <Nav.Link href="#link">Queries</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;