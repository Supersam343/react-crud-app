// details page 

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Spinner, Alert } from 'react-bootstrap';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    axios.get(`http://localhost:3001/movies/${id}`)
      .then(response => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Movie not found or an error occurred.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="text-center py-4">
      <Spinner animation="border" />
    </div>
  );

  if (error) return (
    <div className="py-4">
      <Alert variant="danger">{error}</Alert>
      <Link to="/movies">
        <Button variant="primary">Back to Movies</Button>
      </Link>
    </div>
  );

  return (
    <div className="py-4">
      <h2>{movie.title}</h2>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Year:</strong> {movie.year}</p>
      <Link to="/movies">
        <Button variant="primary">Back to Movies</Button>
      </Link>
    </div>
  );
}

export default MovieDetails;


