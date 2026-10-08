import {
  useEffect,
  useState
} from 'react';

const PROJECTS_API =
  'http://localhost:5000/api/projects';

const CONTACT_API =
  'http://localhost:5000/api/contact';

const emptyProject = {
  userId: 1,
  title: '',
  description: '',
  technologies: '',
  category: '',
  githubLink: '',
  demoLink: ''
};

export default function Admin() {
  const [
    projects,
    setProjects
  ] = useState([]);

  const [
    messages,
    setMessages
  ] = useState([]);

  const [
    form,
    setForm
  ] = useState(emptyProject);

  const [
    editingId,
    setEditingId
  ] = useState(null);

  const [
    status,
    setStatus
  ] = useState('');

  useEffect(() => {
    loadProjects();
    loadMessages();
  }, []);

  async function loadProjects() {
    try {
      const response = await fetch(
        PROJECTS_API
      );

      const data = await response.json();

      setProjects(data);
    } catch (error) {
      console.error(
        'Unable to load projects:',
        error
      );
    }
  }

  async function loadMessages() {
    try {
      const response = await fetch(
        CONTACT_API
      );

      const data = await response.json();

      setMessages(data);
    } catch (error) {
      console.error(
        'Unable to load messages:',
        error
      );
    }
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]:
        event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus(
      editingId
        ? 'Updating project...'
        : 'Creating project...'
    );

    const method = editingId
      ? 'PUT'
      : 'POST';

    const url = editingId
      ? `${PROJECTS_API}/${editingId}`
      : PROJECTS_API;

    try {
      const response = await fetch(
        url,
        {
          method,
          headers: {
            'Content-Type':
              'application/json'
          },
          body: JSON.stringify(form)
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.message
        );
      }

      setStatus(
        editingId
          ? 'Project updated successfully.'
          : 'Project created successfully.'
      );

      resetForm();
      loadProjects();
    } catch (error) {
      setStatus(
        error.message ||
        'Operation failed.'
      );
    }
  }

  function startEdit(project) {
    setEditingId(project.id);

    setForm({
      userId: project.userId,
      title: project.title,
      description: project.description,
      technologies:
        project.technologies,
      category: project.category,
      githubLink:
        project.githubLink || '',
      demoLink:
        project.demoLink || ''
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm({
      ...emptyProject
    });
  }

  async function deleteProject(id) {
    const confirmed =
      window.confirm(
        'Are you sure you want to delete this project?'
      );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${PROJECTS_API}/${id}`,
        {
          method: 'DELETE'
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.message
        );
      }

      setStatus(
        'Project deleted successfully.'
      );

      loadProjects();
    } catch (error) {
      setStatus(
        error.message ||
        'Unable to delete project.'
      );
    }
  }

  return (
    <section className="page">
      <div className="section-heading">
        <p className="eyebrow">
          ADMIN DASHBOARD
        </p>

        <h2>
          Manage <span>Portfolio.</span>
        </h2>
      </div>

      <div className="dashboard-grid">
        <form
          className="glass-card form-card"
          onSubmit={handleSubmit}
        >
          <h3>
            {editingId
              ? 'Edit Project'
              : 'Add Project'}
          </h3>

          <input
            name="title"
            placeholder="Project title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Project description"
            rows="5"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            name="technologies"
            placeholder="Technologies"
            value={form.technologies}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <input
            name="githubLink"
            type="url"
            placeholder="GitHub URL"
            value={form.githubLink}
            onChange={handleChange}
          />

          <input
            name="demoLink"
            type="url"
            placeholder="Demo URL"
            value={form.demoLink}
            onChange={handleChange}
          />

          <div className="form-actions">
            <button
              className="primary-button"
              type="submit"
            >
              {editingId
                ? 'Update Project'
                : 'Create Project'}
            </button>

            {editingId && (
              <button
                className="secondary-button"
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>

          {status && (
            <p className="status">
              {status}
            </p>
          )}
        </form>

        <div className="glass-card">
          <h3>
            Projects
          </h3>

          <div className="admin-list">
            {projects.map(
              (project) => (
                <div
                  className="admin-item"
                  key={project.id}
                >
                  <div>
                    <h4>
                      {project.title}
                    </h4>

                    <small>
                      {project.category}
                    </small>
                  </div>

                  <div className="item-actions">
                    <button
                      onClick={() => {
                        startEdit(project);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="danger"
                      onClick={() => {
                        deleteProject(
                          project.id
                        );
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="glass-card messages-card">
        <h3>
          Contact Messages
        </h3>

        {messages.length === 0 ? (
          <p className="status">
            No messages yet.
          </p>
        ) : (
          <div className="message-list">
            {messages.map(
              (message) => (
                <article
                  className="message-item"
                  key={message.id}
                >
                  <h4>
                    {message.subject}
                  </h4>

                  <p>
                    <strong>
                      {message.name}
                    </strong>
                    {' '}
                    — {message.email}
                  </p>

                  <p>
                    {message.message}
                  </p>
                </article>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}