// home page

import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center">
      <h1>Welcome to React CRUD App!</h1>
      <p>This app lets you manage your movie collection easily.</p>
      <Link to="/movies">
        <Button variant="primary">View Movies</Button>
      </Link>
    </div>
  );
}

export default Home;

