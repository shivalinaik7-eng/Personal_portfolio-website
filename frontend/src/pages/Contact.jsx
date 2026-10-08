import {
  useState
} from 'react';

const API_URL =
  'http://localhost:5000/api/contact';

export default function Contact() {
  const [
    form,
    setForm
  ] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [
    status,
    setStatus
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

    setStatus('Sending...');

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
          data.error ||
          data.message
        );
      }

      setStatus(
        'Message sent successfully!'
      );

      setForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setStatus(
        error.message ||
        'Unable to send message.'
      );
    }
  }

  return (
    <section className="page">
      <div className="section-heading">
        <p className="eyebrow">
          GET IN TOUCH
        </p>

        <h2>
          Let's <span>talk.</span>
        </h2>
      </div>

      <form
        className="glass-card form-card"
        onSubmit={handleSubmit}
      >
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your message"
          rows="7"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button
          className="primary-button"
          type="submit"
        >
          Send Message
        </button>

        {status && (
          <p className="status">
            {status}
          </p>
        )}
      </form>
    </section>
  );
}