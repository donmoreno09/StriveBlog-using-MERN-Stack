import { Navbar, Container, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

const NavBar = () => {
    const {user, logout} = useAuth();

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/"> Blog </Navbar.Brand>
                <Navbar.Toggle aria-control="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        {/* <Link to="/posts" className="nav-link">Posts</Link>
                        <Link to="/users" className="nav-link">Users</Link> */}
                    </Nav>
                    <Nav>
                        { user && (
                            <Nav.Link as={Link} to="/posts/create"> Create Post </Nav.Link>
                        )}
                    </Nav>
                    {
                        user ? (
                            <>
                                <Nav> <span className="nav-link"> Benvenuto, {user.firstName}  </span> </Nav>
                                <Link to="/" className="nav-link" onClick={logout}>Logout</Link>
                            </>
                        ) : (
                            <>
                            <Nav>
                                <Link to="/login" className="nav-link">Login</Link>
                                <Link to="/register" className="nav-link">Register</Link>
                            </Nav>
                            </>
                        )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;