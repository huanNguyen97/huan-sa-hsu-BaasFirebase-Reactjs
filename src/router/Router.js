// Reactjs imported
import React from 'react';

import {
    Switch,
    Route
} from "react-router-dom";

// Component imported
import Nav from '../UI/Navbar/Navbar';

import Home from '../components/Home/Home';
import Create from '../components/Create/Create';
import ReadDetails from '../components/ReadDetails/ReadDetails';
import Delete from '../components/Delete/Delete';
import Edit from '../components/Edit/Edit';
import Search from '../components/Search/Search';

const RouterCalling = () => {
    return (
        <>
            <Nav />
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/create" exact component={Create}/>
                <Route path="/read-details/:id" exact component={ReadDetails}/>
                <Route path="/edit/:id" exact component={Edit} />
                <Route path="/delete/:id" exact component={Delete}/>
                <Route path="/search_game/:key_search" exact component={Search}/>
            </Switch>
        </>
    );
};

export default RouterCalling;