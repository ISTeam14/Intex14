import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/home" element={<HomePage />} /> */}
          <Route path="/movie" element={<MoviePage />} />
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
