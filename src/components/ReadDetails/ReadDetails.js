// Reactjs imported
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';

// Url Imported
import firebaseDB from '../../firebase/firebase';

const ReadDetails = () => {
    // Set Data
    const [data, setData] = useState({});
    const { id } = useParams();

    // Fetching Data firebase
    useEffect(() => {
        firebaseDB.child("games/g" + id).once("value", snapshot => {
            setData(snapshot.val());
        })
    }, [data])  // Warning at here but it's okay

    // Render Template
    const TemplateRendering = () => {
        return (
            <Table striped bordered hover size="lg" variant="warning">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>{data.id}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <td>Catgory</td>
                        <td>{data.category}</td>
                    </tr>
                    <tr>
                        <td>Brand</td>
                        <td>{data.brand}</td>
                    </tr>
                    <tr>
                        <td>Year released</td>
                        <td>{data.year_released}</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>{data.price}$</td>
                    </tr>
                </tbody>
            </Table>
        );
    };

    return (
        <div className="container">
            <br />
            <br />
            <h2>Details game</h2>
            <br />
            <TemplateRendering />
        </div>
    );
};

export default ReadDetails;