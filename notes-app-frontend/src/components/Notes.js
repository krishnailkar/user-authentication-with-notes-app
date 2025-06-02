import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './NoteForm';

const Notes = ({ token, setToken }) => {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/notes', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setNotes(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };
        fetchNotes();
    }, [token]);

    const handleSearch = async () => {
        const response = await axios.get(`http://localhost:5000/api/notes/search?q=${search}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setNotes(response.data);
    };

    const handleLogout = () => {
        setToken(null); // Clear token
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <input
                type="text"
                placeholder="Search notes"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <NoteForm setNotes={setNotes} token={token} />
            <ul>
                {notes.map(note => (
                    <li key={note._id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        {/* Add Update and Delete functionality here */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;
