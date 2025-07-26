//  creating movie cards for each movie 

import { useEffect, useState } from 'react';
import axios from 'axios';

import MovieCard from './MovieCard';
import MovieForm from './MovieForm';
import EditMovieForm from './EditMovieForm';
import DeleteButton from './DeleteButton';
import SearchBar from './SearchBar';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMovies = () => {
    axios.get('http://localhost:3001/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleEditClick = (movie) => {
    setEditingMovie(movie);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setEditingMovie(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filter movies based on search
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery) ||
    movie.director.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      <MovieForm onMovieAdded={fetchMovies} />
      <SearchBar onSearch={handleSearch} />
      <h3>Movie List</h3>
      {filteredMovies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        filteredMovies.map(movie => (
          <div key={movie.id} className="mb-3">
            <MovieCard movie={movie} />
            <button
              onClick={() => handleEditClick(movie)}
              className="btn btn-secondary btn-sm me-2"
            >
              Edit
            </button>
            <DeleteButton movieId={movie.id} onDelete={fetchMovies} />
          </div>
        ))
      )}

      {editingMovie && (
        <EditMovieForm
          movie={editingMovie}
          show={showEditModal}
          handleClose={handleCloseEdit}
          onMovieUpdated={fetchMovies}
        />
      )}
    </div>
  );
}

export default MovieList;
