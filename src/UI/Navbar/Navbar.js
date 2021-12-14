// import from reactjs
import React, { useState } from 'react';

import { 
    Navbar,
    Container,
    Nav,
    Form,
    FormControl,
    Button
} from 'react-bootstrap';

// CSS bootstrap imported
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const NavbarUI = () => {
    // Set data
    const [data, setData] = useState();

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">All games</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/create">Create game</Nav.Link>
                </Nav>
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={event => setData(event.target.value)}
                    />
                    <Button 
                        variant="outline-success" 
                        href={'/search_game/' + data}
                    >
                        Search
                    </Button>
                </Form>
            </Container>
        </Navbar>
    );
};

export default NavbarUI;