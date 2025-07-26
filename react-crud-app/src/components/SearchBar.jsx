// This component is the search bar users type into
// It sends the search term to the parent so it can filter movies

import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" variant="primary">Search</Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;
