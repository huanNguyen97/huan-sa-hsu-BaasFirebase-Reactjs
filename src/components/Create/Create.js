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
// import { create_new_game } from '../../urlCalling/url';
import firebaseDB from '../../firebase/firebase';
import history from '../../history/history';

// Declare type of data Game
const initialState = {
    id: "",
    name: "",
    category: "",
    brand: "",
    year_released: "",
    price: ""
};

const Create = () => {
    // Set data
    const [state, setState] = useState(initialState);

    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [brand, setBrand] = useState();
    const [year_released, setYear_released] = useState();
    const [price, setPrice] = useState();

    // Create new game
    const createGameHandler = (e) => {
        e.preventDefault();

        if (!name || !category || !brand || !year_released || !price) {
            console.log("Some things was nil");     // Just for testing
        } else {
            // Add new data
            state.name = name;
            state.category = category;
            state.brand = brand;
            state.year_released = year_released;
            state.price = price;

            // Push in firebase
            firebaseDB.child("games").once("value", snapshot => {
                // Take length of child "games"
                let length = parseInt(snapshot.numChildren(), 10);

                if (length === 0) {
                    state.id = 1;
                } else {
                    state.id = length + 1;
                }
                
            }).then(item => {
                firebaseDB.child("games/g" + state.id).set(state);
            }).catch(error => {
                console.log(error);     // Just for testing
            })
        }

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