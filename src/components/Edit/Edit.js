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
import firebaseDB from '../../firebase/firebase';
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
        firebaseDB.child("games/g" + id).once("value", snapshot => {
            setData(snapshot.val());

            setName(snapshot.val().name);
            setCategory(snapshot.val().category);
            setBrand(snapshot.val().brand);
            setYear_released(snapshot.val().year_released);
            setPrice(snapshot.val().price);
        })
    }, [])  // Warning at here but it's okay

    // Update game
    const updateGame = () => {
        firebaseDB.child("games/g" + id).once("value", snapshot => {
            data.id = id
            data.name = name;
            data.category = category;
            data.brand = brand;
            data.year_released = year_released;
            data.price = price;
        }).then(item => {
            firebaseDB.child("games/g" + data.id).set(data);
        }).catch(error => {
            console.log(error);     // Just for testing
        });

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
