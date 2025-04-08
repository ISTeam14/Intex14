import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/movie" element={<MoviePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
