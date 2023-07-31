import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from'react-router-dom';

function Mainpage() {
    const [search, setSearch] = useState('');
    return (
        <div className="Mainpage">
            <header className="Mainpage-header">
            <h1>What do you feel like listening today?</h1>
            <Container>
                <Form.Control
                laceholder='Choose what you feel like listening today'
                type="search"
                value={search}
                onChange={event => setSearch(event.target.value)}
                />
                <Link to="/songboard">
                <Button>
                    Search
                </Button>
                </Link>
            </Container>
            </header>
        </div>
    );
}

export default Mainpage;