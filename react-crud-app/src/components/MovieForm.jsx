// This component lets the user add a new movie using a form.
// It sends a POST request to the server and refreshes the movie list after adding.

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function MovieForm({ onMovieAdded }) {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !director || !year) {
      alert('Please fill all fields');
      return;
    }

    const newMovie = { title, director, year: parseInt(year, 10) };

    axios.post('http://localhost:3001/movies', newMovie)
      .then(response => {
        onMovieAdded(response.data); //refresh list
        setTitle('');
        setDirector('');
        setYear('');
      })
      .catch(error => {
        console.error('Error adding movie:', error);
        alert('Failed to add movie');
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <h4>Add New Movie</h4>

      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter movie title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDirector">
        <Form.Label>Director</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter director's name"
          value={director}
          onChange={e => setDirector(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formYear">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter release year"
          value={year}
          onChange={e => setYear(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Movie
      </Button>
    </Form>
  );
}

export default MovieForm;
