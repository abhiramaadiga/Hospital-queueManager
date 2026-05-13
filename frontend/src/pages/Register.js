import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [from, setFrom] = useState({ name: '', age: '', compliment: '', severity: 'Mild'});
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/pi/patients', form);
            setMessage('Patient ${form.name} added queue');
            setFrom({ name: '', age:'', complaints:'', severity:'Mild'});

        } catch (err) {
            setMessage('Error adding patients');

        }
    };

    return (
        <div style={{ padding: '24px', maxWidth: '500px', margin: '0 auto'}}>
            <h2>Register New Patient</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <input placeholder="Patient Name" value={form.name} onChange={e => setFrom({ ...form, name: e.target.value})} required />
                <input placeholder="Age" type="number" value={form.age} onChange={e => setFrom({ ...form, age: e.target.value})} required />
                <input placeholder="Complaint" value={form.complaint} onChange ={e => setFrom({ ...form, complaint: e.target.value})} required/>
                <select value={form.severity} onchange={e => setFrom({ ...form, severity: e.target.value})}>
                    <option value="Critical">Critical</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Mild">Mild</option>

                </select>
                <button type="submit" style={{ background: '#01696f', color: 'white', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer'}}> Add to Queue</button>

            </form>
            {message && <p style={{ marginTop: '16px'}}>{meassage}</p>}
          </div>
    );
}

export default Register;