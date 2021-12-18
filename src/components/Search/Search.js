// Import from react
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Table,
    Button
} from 'react-bootstrap';

// URL imported
import firebaseDB from '../../firebase/firebase';

const Search = () => {
    // Set data
    const [data, setData] = useState([]);
    const { key_search } = useParams();

    // Fetching data
    useEffect(() => {
        firebaseDB.child("games").once("value", snapshot => {
            console.log(key_search.toLowerCase());
            const games_list = [];

            snapshot.forEach(child => {
                const game = child.val().name;
                if (game.toLowerCase().includes(key_search.toLowerCase())) {
                    games_list.push(child.val())
                }
            })
            setData(games_list);
        })
    }, [])

    // Render template
    const TemplateRendering = () => {
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
    };

    return (
        <>
            <br />
            <br />
            <h2>Games List with searching "{key_search}"</h2>
            <br />
            <TemplateRendering />
        </>
    );
};

export default Search;
