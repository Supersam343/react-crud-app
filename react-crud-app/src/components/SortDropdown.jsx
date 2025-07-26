// This component lets the user pick how to sort the movie list.
// When changed, it tells the parent what sorting option was selected.

import { useState } from 'react';
import { Form } from 'react-bootstrap';

function SortDropdown({ onSort }) {
  const [sortBy, setSortBy] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSort(value);
  };

  return (
    <Form.Group className="mb-3" controlId="sortDropdown">
      <Form.Label>Sort By:</Form.Label>
      <Form.Select value={sortBy} onChange={handleChange}>
        <option value="">-- Select --</option>
        <option value="title">Title (A-Z)</option>
        <option value="year">Year (Newest to Oldest)</option>
      </Form.Select>
    </Form.Group>
  );
}

export default SortDropdown;
