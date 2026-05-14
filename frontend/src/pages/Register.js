import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    complaint: '',
    severity: 'Mild'
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/patients', form);
      setMessage(`Patient ${form.name} added to queue`);
      setForm({
        name: '',
        age: '',
        complaint: '',
        severity: 'Mild'
      });
    } catch (err) {
      setMessage('Error adding patient');
      console.log(err);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Register New Patient</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          name="name"
          placeholder="Patient Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="age"
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={handleChange}
          required
        />

        <input
          name="complaint"
          placeholder="Complaint"
          value={form.complaint}
          onChange={handleChange}
          required
        />

        <select
          name="severity"
          value={form.severity}
          onChange={handleChange}
        >
          <option value="Critical">Critical</option>
          <option value="Moderate">Moderate</option>
          <option value="Mild">Mild</option>
        </select>

        <button
          type="submit"
          style={{
            background: '#01696f',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Add to Queue
        </button>
      </form>

      {message && <p style={{ marginTop: '16px' }}>{message}</p>}
    </div>
  );
}

export default Register;