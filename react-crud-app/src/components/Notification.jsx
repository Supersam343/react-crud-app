// This component shows a temporary alert message at the top (like success, error, etc.)
// It's used after actions like adding, editing, or deleting a movie

import { Alert } from 'react-bootstrap';

function Notification({ message, variant = 'info', onClose }) {
  if (!message) return null;

  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      {message}
    </Alert>
  );
}

export default Notification;
