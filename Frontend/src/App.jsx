import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Pass isLoggedIn and onLogout to Navbar */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      {/* Main content */}
      <main className="flex-grow-1">
        {/* Pass setIsLoggedIn to AppRoutes */}
        <AppRoutes setIsLoggedIn={setIsLoggedIn} />
      </main>

      <Footer />
    </div>
  );
}

export default App;