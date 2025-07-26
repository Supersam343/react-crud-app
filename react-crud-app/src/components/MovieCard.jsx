// pass movie object as prop to the movie card componenet and bootsrap each movie

import Card from 'react-bootstrap/Card';

function MovieCard({ movie }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Directed by {movie.director}
        </Card.Subtitle>
        <Card.Text>Year: {movie.year}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
