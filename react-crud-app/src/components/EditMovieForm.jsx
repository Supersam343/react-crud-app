// This component shows a pop-up form (modal) that lets the user edit a movie.
// It fills the form with the selected movie’s current info and updates it when submitted.


import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

function EditMovieForm({ movie, show, handleClose, onMovieUpdated }) {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDirector(movie.director);
      setYear(movie.year);
    }
  }, [movie]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !director || !year) {
      alert('Please fill all fields');
      return;
    }

    const updatedMovie = { title, director, year: parseInt(year, 10) };

    axios.put(`http://localhost:3001/movies/${movie.id}`, updatedMovie)
      .then(() => {
        onMovieUpdated();
        handleClose();
      })
      .catch((error) => {
        console.error('Error updating movie:', error);
        alert('Failed to update movie');
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDirector">
            <Form.Label>Director</Form.Label>
            <Form.Control
              type="text"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formYear">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>

        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditMovieForm;
