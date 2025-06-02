import React, { useState } from 'react';
import axios from 'axios';

const NoteForm = ({ setNotes, token }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/notes', { title, content }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update the notes state in the parent component
            setNotes(prevNotes => [...prevNotes, response.data]);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error adding note:', error);
        alert('Error adding note: ' + error.response.data.message || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
            <button type="submit">Add Note</button>
        </form>
    );
};

export default NoteForm;


