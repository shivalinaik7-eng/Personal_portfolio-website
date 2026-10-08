import { useState } from 'react';

import {
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';

function Nav({
  loggedIn,
  setLoggedIn
}) {
  const nav = useNavigate();

  return (
    <nav>
      <Link
        className="brand"
        to="/"
      >
        SHIVALI<span>.</span>
      </Link>

      <div className="links">
        <Link to="/">
          Home
        </Link>

        <Link to="/about">
          About
        </Link>

        <Link to="/projects">
          Projects
        </Link>

        <Link to="/contact">
          Contact
        </Link>

        {loggedIn ? (
          <>
            <Link to="/admin">
              Dashboard
            </Link>

            <button
              className="nav-button"
              onClick={() => {
                setLoggedIn(false);
                nav('/');
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  const [
    loggedIn,
    setLoggedIn
  ] = useState(false);

  return (
    <>
      <Nav
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/login"
            element={
              <Login
                setLoggedIn={setLoggedIn}
              />
            }
          />

          <Route
            path="/admin"
            element={
              loggedIn ? (
                <Admin />
              ) : (
                <Login
                  setLoggedIn={setLoggedIn}
                />
              )
            }
          />
        </Routes>
      </main>

      <footer>
        © 2026 Shivali • React + Express + MySQL
      </footer>
    </>
  );
}