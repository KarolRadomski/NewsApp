import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NewsPage from './pages/NewsPage';
import Login from './pages/Login'
import Header from './components/Header'
function App() {
  return (
    <>
        <Router>
          <div className="container">
            <Header />
            <Routes>
              <Route path='/' element={<NewsPage />} />
              <Route path='/admin' element={<Login />} />
            </Routes>
          </div>
        </Router>
    </>
  );
}

export default App;
