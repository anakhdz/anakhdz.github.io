import { useState } from 'react';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3001/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Hello! Contact me</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} required /><br /><br />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br /><br />
          <textarea name="message" placeholder="Your message" onChange={handleChange} required /><br /><br />
          <button type="submit">Send</button>
        </form>
      ) : (
        <p>Thank you! Your message was sent.</p>
      )}
    </div>
  );
}

export default ContactForm;
