import {
  useEffect,
  useMemo,
  useState
} from 'react';

const API_URL =
  'http://localhost:5000/api/projects';

export default function Projects() {
  const [
    projects,
    setProjects
  ] = useState([]);

  const [
    search,
    setSearch
  ] = useState('');

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch(
          API_URL
        );

        const data = await response.json();

        setProjects(data);
      } catch (error) {
        console.error(
          'Unable to load projects:',
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const value =
      search.toLowerCase().trim();

    if (!value) {
      return projects;
    }

    return projects.filter((project) => {
      return (
        project.title
          .toLowerCase()
          .includes(value) ||
        project.category
          .toLowerCase()
          .includes(value) ||
        project.technologies
          .toLowerCase()
          .includes(value)
      );
    });
  }, [
    projects,
    search
  ]);

  return (
    <section className="page">
      <div className="section-heading">
        <p className="eyebrow">
          MY WORK
        </p>

        <h2>
          Featured <span>Projects</span>
        </h2>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search projects..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />

      {loading ? (
        <p className="status">
          Loading projects...
        </p>
      ) : (
        <div className="grid three">
          {filteredProjects.map(
            (project) => (
              <article
                className="glass-card project-card"
                key={project.id}
              >
                <span className="tag">
                  {project.category}
                </span>

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>

                <small>
                  {project.technologies}
                </small>

                <div className="project-links">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>

                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo
                  </a>
                </div>
              </article>
            )
          )}
        </div>
      )}

      {!loading &&
        filteredProjects.length === 0 && (
          <p className="status">
            No projects found.
          </p>
        )}
    </section>
  );
}