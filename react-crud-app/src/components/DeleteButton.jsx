// 


import axios from 'axios';

function DeleteButton({ movieId, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      axios.delete(`http://localhost:3001/movies/${movieId}`)
        .then(() => {
          onDelete(); // Tell parent to refresh list
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
