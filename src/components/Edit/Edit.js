// React imported
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
    Form,
    Row,
    Col,
    Button
} from 'react-bootstrap';

// Url imported
import { read_details_game, edit_game } from '../../urlCalling/url';
import history from '../../history/history';

const Edit = () => {
    // Set data 
    const [data, setData] = useState({});

    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [brand, setBrand] = useState();
    const [year_released, setYear_released] = useState();
    const [price, setPrice] = useState();

    const { id } = useParams();

    // Fetching Data
    useEffect(() => {
        fetch(read_details_game + id, {
            method: 'GET'
        })
        .then(resp => resp.json())
        .then(game_details => {
            setData(game_details.game_detail);

            setName(game_details.game_detail.name);
            setCategory(game_details.game_detail.category);
            setBrand(game_details.game_detail.brand);
            setYear_released(game_details.game_detail.year_released);
            setPrice(game_details.game_detail.price);
        })
        .catch(() => {
            console.log("Server not found");     // For checking. Not alerting on mobile screen
        })
    }, [])  // Warning at here but it's okay

    // Update game
    const updateGame = () => {
        fetch(edit_game + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                id: id,     // Just only id cannot edit.
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
    }

    return (
        <div className="container">
            <br />
            <h2>Edit game with ID {id}</h2>
            <br />
            <Form style={{  border: '2px solid black' }}>
                <div className="container">
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label><strong>Name</strong></Form.Label>
                            <Form.Control 
                                type="text" 
                                value={name} 
                                onChange={event => setName(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label><strong>Category</strong></Form.Label>
                            <Form.Control 
                                type="text" 
                                value={category} 
                                onChange={event => setCategory(event.target.value)} 
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label><strong>Brand</strong></Form.Label>
                        <Form.Control 
                            value={brand}
                            onChange={event => setBrand(event.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label><strong>Year released</strong></Form.Label>
                        <Form.Control 
                            value={year_released}
                            onChange={event => setYear_released(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label><strong>Price</strong></Form.Label>
                        <Form.Control 
                            value={price} 
                            onChange={event => setPrice(event.target.value)}
                        />
                    </Form.Group>

                    <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={updateGame}
                    >
                        Submit
                    </Button>
                </div>
            </Form>           
        </div>
    );
};

export default Edit;
