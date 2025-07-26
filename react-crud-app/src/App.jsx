// 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Movies from './pages/Movies';
import About from './pages/About';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="d-flex flex-column min-vh-100">
        <main className="container flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;





