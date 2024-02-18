import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router';
import "../css/App.css"

// --------------------------------------------------------------------------------

function OffcanvasExample() {
    const expandSize = 'lg'
    const navigate = useNavigate();

    return (
        <>

            <Navbar key={'md'} expand={expandSize} className="bg-body-tertiary mb-3">
                <Container fluid>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expandSize}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expandSize}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expandSize}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expandSize}`}>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-5">
                                <Nav.Link onClick={() => navigate('')}>產品</Nav.Link>
                                <Nav.Link onClick={() => navigate('/Donate')}>捐贈物資</Nav.Link>
                                <Nav.Link onClick={() => navigate('/Upload')}>Upload</Nav.Link>
                                <NavDropdown
                                    title="服務項目"
                                    id={`offcanvasNavbarDropdown-expand-${expandSize}`}
                                >
                                    <NavDropdown.Item onClick={() => navigate('/Register')}>註冊用戶</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => navigate('/Upload')}>捐贈物資</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => navigate('/Transaction')}>Transaction</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => navigate('/Confirmation')}>Confirmation</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Form className="searchBox d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button id="searchBtn" variant="outline-success">Search</Button>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </>
    );
}


// --------------------------------------------------------------------------------

export default OffcanvasExample;