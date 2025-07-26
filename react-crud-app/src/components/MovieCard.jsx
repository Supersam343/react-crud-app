// This component displays a single movie inside a Bootstrap card.
// It shows the title (as a link), director, and release year.

import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          <Link to={`/movies/${movie.id}`}>
            {movie.title}
          </Link>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Directed by {movie.director}
        </Card.Subtitle>
        <Card.Text>Year: {movie.year}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;

