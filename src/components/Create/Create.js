// React imported
import React, { useState } from 'react';
// import { useHistory } from "react-router-dom";

import {
    Form,
    Row,
    Col,
    Button
} from 'react-bootstrap';

// Url Imported
import { create_new_game } from '../../urlCalling/url';
import history from '../../history/history';


const Create = () => {
    // // Set data
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [brand, setBrand] = useState();
    const [year_released, setYear_released] = useState();
    const [price, setPrice] = useState();
    
    // const history = useHistory();

    // Create new game
    const createGameHandler = () => {
        // check status
        fetch(create_new_game, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                id: null,     // Just only id cannot edit.
                name: name,
                category: category,
                brand: brand,
                year_released: year_released,
                price: price
            })
        })
        .then(resp => resp.json())
        .then(game => {
            console.log(game);
        })
        .catch(() => {
            console.log("Server not found");    // For checking. Not alerting on mobile screen
        })

        history.push('/');
    };

    return (
        <div className="container">
            <br />
            <h2> New Game</h2>
            <br />
            <Form style={{  border: '2px solid black' }}>
                <div className="container">
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label><strong>Name</strong></Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Name..." 
                                onChange={event => setName(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label><strong>Category</strong></Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Category..." 
                                onChange={event => setCategory(event.target.value)} 
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label><strong>Brand</strong></Form.Label>
                        <Form.Control 
                            placeholder="Brand..." 
                            onChange={event => setBrand(event.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label><strong>Year released</strong></Form.Label>
                        <Form.Control 
                            placeholder="Year released..." 
                            onChange={event => setYear_released(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label><strong>Price</strong></Form.Label>
                        <Form.Control 
                            placeholder="Price..." 
                            onChange={event => setPrice(event.target.value)}
                        />
                    </Form.Group>

                    <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={createGameHandler}
                    >
                        Submit
                    </Button>
                </div>
            </Form>           
        </div>
    );
};

export default Create;