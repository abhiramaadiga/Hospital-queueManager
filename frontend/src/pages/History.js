import { useEffect, useState } from 'react';
import axios from 'axios';

function History() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/patients/history')
           .then(res => setHistory(res.data));

    },
   []);

   return (
    <div style={{ padding: '24px'}}>
        <h2>Patient History Log</h2>
        <table style ={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>

                <tr style={{ background: '#01696f', color: 'white'}}>
                    <th style={{ padding: '10px'}}>Name</th>
                    <th>Age</th>
                    <th>Complaint</th>
                    <th>Severity</th>
                    <th>Arrived</th>
                    <th>Served</th>
                </tr>
            </thead>
            <tbody>
                {history.map(p => (
                    <tr key={p._id} style={{ borderBottom: '1px solid #ddd'}}>
                        <td style={{ padding: '10px'}}>{p.name}</td>
                        <td>{p.age}</td>
                        <td>{p.complaint}</td>
                        <td>{p.severity}</td>
                        <td>{new Date(p.privateAt).toLocaleString()}</td>
                        <td>{p.servedAt ? new Date(p.servedAt).toLocaleString() : '-'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

   );
}

export default History;