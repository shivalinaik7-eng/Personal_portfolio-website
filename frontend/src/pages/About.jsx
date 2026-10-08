export default function About() {
  return (
    <section className="page">
      <div className="section-heading">
        <p className="eyebrow">
          ABOUT ME
        </p>

        <h2>
          Turning ideas into useful
          <span> web experiences.</span>
        </h2>
      </div>

      <div className="glass-card about-card">
        <p>
          I am a BCA student interested in
          full stack web development and
          creating practical applications.
        </p>

        <p>
          My current focus is on React,
          Node.js, Express, Sequelize and
          MySQL. I enjoy learning by building
          real projects.
        </p>
      </div>

      <div className="grid three">
        <div className="glass-card">
          <h3>Frontend</h3>
          <p>
            React, JavaScript, HTML and CSS.
          </p>
        </div>

        <div className="glass-card">
          <h3>Backend</h3>
          <p>
            Node.js, Express and REST APIs.
          </p>
        </div>

        <div className="glass-card">
          <h3>Database</h3>
          <p>
            MySQL with Sequelize ORM.
          </p>
        </div>
      </div>
    </section>
  );
}