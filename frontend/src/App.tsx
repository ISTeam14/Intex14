import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/movie" element={<MoviePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
