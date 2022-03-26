import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';
import Login from './pages/Login';
import Header from './components/Header';
import AdminPanel from './pages/AdminPanel';
import NewsDetails from './pages/NewsDetails';
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<NewsPage />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/newsdetails/:id" element={<NewsDetails />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
