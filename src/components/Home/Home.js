// Reactjs imported
import React, { useState, useEffect } from 'react';

// Imported 
import firebaseDB from '../../firebase/firebase';

// CSS imported bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';

const HomeComponent = () => {
    // Setting data
    const [data, setData] = useState([]);

    // Fetching from firebase
    useEffect(() => {
        firebaseDB.child("games").on("value", snapshot => {
            const games_list = [];
            snapshot.forEach(child => {
                games_list.push(child.val());
            });
            setData(games_list);
        })
    }, []);

    // Render template
    const TemplateReadAlls = () => {
        return (
            <div className="container">
                <Table striped bordered hover size="sm" variant="primary">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th colSpan="3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.brand}</td>
                                    <td><Button variant="outline-primary" href={"/read-details/" + item.id}>View</Button></td>
                                    <td><Button variant="outline-success" href={"/edit/" + item.id}>Edit</Button></td>
                                    <td><Button variant="outline-danger" href={"/delete/" + item.id}>Delete</Button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }

    return (
        <div>
            <br />
            <br />
            <h2>Games List</h2>
            <br />
            <TemplateReadAlls />
        </div>
    );
};

export default HomeComponent;