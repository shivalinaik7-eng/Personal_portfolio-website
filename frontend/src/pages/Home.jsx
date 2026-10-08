import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="hero page">
      <div>
        <p className="eyebrow">
          FULL STACK DEVELOPER
        </p>

        <h1>
          Hi, I'm <span>Shivali.</span>
        </h1>

        <p className="hero-text">
          I build clean, responsive and
          dynamic web applications using
          React, Express, Sequelize and MySQL.
        </p>

        <div className="actions">
          <Link
            className="primary-button"
            to="/projects"
          >
            View Projects
          </Link>

          <Link
            className="secondary-button"
            to="/contact"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}