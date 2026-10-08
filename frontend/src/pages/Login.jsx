import {
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

const API_URL =
  'http://localhost:5000/api/login';

export default function Login({
  setLoggedIn
}) {
  const nav = useNavigate();

  const [
    form,
    setForm
  ] = useState({
    email: '',
    password: ''
  });

  const [
    error,
    setError
  ] = useState('');

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]:
        event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError('');

    try {
      const response = await fetch(
        API_URL,
        {
          method: 'POST',
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
          data.message ||
          'Login failed.'
        );
      }

      setLoggedIn(true);
      nav('/admin');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="page narrow">
      <div className="section-heading">
        <p className="eyebrow">
          ADMIN
        </p>

        <h2>
          Welcome <span>back.</span>
        </h2>
      </div>

      <form
        className="glass-card form-card"
        onSubmit={handleSubmit}
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          className="primary-button"
          type="submit"
        >
          Login
        </button>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <small>
          Demo: admin@portfolio.com /
          admin123
        </small>
      </form>
    </section>
  );
}