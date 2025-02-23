import { Navbar, Nav, Container } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const NavigationComponent = () => {
  const { logout } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Hotel Reservation</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/create-room">Create room</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>{" "}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationComponent;
