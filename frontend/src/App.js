import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';
import NewsDetails from './pages/NewsDetails';
import CookieConsent from 'react-cookie-consent';
function App() {
  return (
    <>
      <Router>
        <Header key={'header'} />
        <div className="container">
          <Routes>
            <Route path="/" element={<NewsPage />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/newsdetails/:id" element={<NewsDetails />} />
          </Routes>
          <CookieConsent
            key={'cookie'}
            location="bottom"
            buttonText="I Agree"
            cookieName="cookie-consent"
            style={{
              background: '#222527',
              padding: '0 10px 0 10px',
              justifyContent: 'center',
            }}
            buttonStyle={{
              background: '#e5383b',
              color: '#fff',
              fontSize: '16px',
              borderRadius: '4px',
            }}
            expires={150}
          >
            <p className="cookieConsentText">
              This website uses cookies to enhance the user experience.{' '}
            </p>
          </CookieConsent>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
