// This component shows the full movie list, and includes:
// - form to add a new movie
// - search and sort tools
// - edit and delete buttons for each movie
// - notification messages after actions (add, edit, delete)

import { useEffect, useState } from 'react';
import axios from 'axios';

import MovieCard from './MovieCard';
import MovieForm from './MovieForm';
import EditMovieForm from './EditMovieForm';
import DeleteButton from './DeleteButton';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import Notification from './Notification';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [notification, setNotification] = useState({ message: '', variant: '' });

  const fetchMovies = () => {
    axios.get('http://localhost:3001/movies')
      .then(response => setMovies(response.data))
      .catch(error => {
        console.error('Error fetching movies:', error);
        showNotification('Failed to fetch movies', 'danger');
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const showNotification = (message, variant = 'info') => {
    setNotification({ message, variant });
    setTimeout(() => {
      setNotification({ message: '', variant: '' });
    }, 3000);
  };

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

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
  };

  // Filter movies based on search
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery) ||
    movie.director.toLowerCase().includes(searchQuery)
  );

  // Sort filtered movies
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'year') {
      return b.year - a.year;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <Notification
        message={notification.message}
        variant={notification.variant}
        onClose={() => setNotification({ message: '', variant: '' })}
      />
      <MovieForm
        onMovieAdded={() => {
          fetchMovies();
          showNotification('Movie added successfully!', 'success');
        }}
      />
      <SearchBar onSearch={handleSearch} />
      <SortDropdown onSort={handleSort} />
      <h3>Movie List</h3>
      {sortedMovies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        sortedMovies.map(movie => (
          <div key={movie.id} className="mb-3">
            <MovieCard movie={movie} />
            <button
              onClick={() => handleEditClick(movie)}
              className="btn btn-secondary btn-sm me-2"
            >
              Edit
            </button>
            <DeleteButton
              movieId={movie.id}
              onDelete={() => {
                fetchMovies();
                showNotification('Movie deleted successfully!', 'success');
              }}
            />
          </div>
        ))
      )}

      {editingMovie && (
        <EditMovieForm
          movie={editingMovie}
          show={showEditModal}
          handleClose={handleCloseEdit}
          onMovieUpdated={() => {
            fetchMovies();
            showNotification('Movie updated successfully!', 'success');
          }}
        />
      )}
    </div>
  );
}

export default MovieList;


