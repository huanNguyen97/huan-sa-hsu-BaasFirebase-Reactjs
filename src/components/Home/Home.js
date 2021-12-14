// Reactjs imported
import React, { useState, useEffect } from 'react';

// Imported 
import { read_all_games } from '../../urlCalling/url';

// CSS imported bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';

const HomeComponent = () => {
    // Setting data
    const [data, setData] = useState([]);

    // Fetching to SOAP
    useEffect(() => {
        fetch(read_all_games, {
            method: 'GET'
        })
        .then(resp => resp.json())
        .then(game => {
            setData(game.game_list);
        })
        .catch(() => {
            console.log("Server not found");    // For checking. Not alerting on mobile screen
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
                        {data.length >= 2 ? 
                            data.map((item, key) => {
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
                            }) : 
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.category}</td>
                                <td>{data.brand}</td>
                                <td><Button variant="outline-primary" href={"/read-details/" + data.id}>View</Button></td>
                                <td><Button variant="outline-success" href={"/edit/" + data.id}>Edit</Button></td>
                                <td><Button variant="outline-danger" href={"/delete/" + data.id}>Delete</Button></td>
                            </tr>
                        }
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