// This component shows a "Delete" button that removes a movie from the list when clicked. 
// It asks for confirmation, sends a DELETE request to the server, and tells the parent to refresh.


import axios from 'axios';

function DeleteButton({ movieId, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      axios.delete(`http://localhost:3001/movies/${movieId}`)
        .then(() => {
          onDelete(); 
        })
        .catch(error => {
          console.error('Error deleting movie:', error);
          alert('Failed to delete movie');
        });
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger btn-sm ms-2">
      Delete
    </button>
  );
}

export default DeleteButton;
