// Imported Reactjs
import React from 'react';

import {
    Form,
    Button
} from 'react-bootstrap';

import { useParams } from 'react-router-dom';

// Import url 
import firebaseDB from '../../firebase/firebase';
import history from '../../history/history';

const Delete = () => {
    // Set data 
    const { id } = useParams();

    // Handler clicking yes
    const yesClick = () => {
        firebaseDB.child("games/g" + id).remove();
        history.push("/");
    }

    // Handler clicking no
    const noClick = () => {
        history.push("/");
    }

    // Render Template
    const TemplateRendering = () => {
        return (
            <div>
                <br />
                <br />
                <Form>
                    <h1>Delete Game with ID {id} ?</h1>
                    <br />
                    <br />
                    <br />
                    <table style={{width: "900px"}}>
                        <tr>
                            <th>
                                <Button 
                                    variant="success" 
                                    type="submit"
                                    onClick={yesClick}
                                    style={{
                                        width: '80px'
                                    }}
                                >
                                    Yes
                                </Button>
                            </th>
                            <th>
                                <Button 
                                    variant="danger" 
                                    type="submit"
                                    onClick={noClick}
                                    style={{
                                        width: '80px'
                                    }}
                                >
                                    No
                                </Button>
                            </th>
                        </tr>
                    </table>
                </Form>
            </div>
        );
    };

    return (
        <div className="container">
            <TemplateRendering />
        </div>
    );
};

export default Delete;
