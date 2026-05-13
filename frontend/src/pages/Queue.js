import { useEffect, useState } from 'react';
import axios from 'axios';

const severityColor = {
    Critical: '#ff4d4d',
    Moderate: '#ffaa00',
    Mild: '#44bb44'
};

function Queue() {

    const [queue, setQueue] = useState([]);

    const fetchQueue = async () => {
        const res = await axios.get(
            'http://localhost:5000/api/patients/queue'
        );

        setQueue(res.data);
    };

    const serveNext = async () => {

        await axios.put(
            'http://localhost:5000/api/patients/serve'
        );

        fetchQueue();
    };

    useEffect(() => {

        fetchQueue();

        const interval = setInterval(fetchQueue, 5000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div style={{ padding: '24px' }}>

            <h2>Live Queue Dashboard</h2>

            <button
                onClick={serveNext}
                style={{
                    background: '#01696f',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '6px',
                    marginBottom: '20px',
                    cursor: 'pointer'
                }}
            >
                Serve Next Patient
            </button>

            {queue.length === 0 ? (

                <p>Queue is empty.</p>

            ) : (

                queue.map((patient, index) => (

                    <div
                        key={patient._id}
                        style={{
                            background:
                                index === 0
                                    ? '#fff3f3'
                                    : '#f9f8f5',

                            border: `2px solid ${severityColor[patient.severity]}`,

                            borderRadius: '8px',
                            padding: '16px',
                            marginBottom: '12px'
                        }}
                    >

                        <strong>
                            #{index + 1} - {patient.name}
                        </strong>

                        <span
                            style={{
                                marginLeft: '12px',
                                color: severityColor[patient.severity],
                                fontWeight: 'bold'
                            }}
                        >
                            ● {patient.severity}
                        </span>

                        <p>
                            Age: {patient.age} |
                            Complaint: {patient.complaint}
                        </p>

                        <p
                            style={{
                                color: '#888',
                                fontSize: '12px'
                            }}
                        >
                            Arrived:
                            {' '}
                            {new Date(
                                patient.arrivedAt
                            ).toLocaleTimeString()}
                        </p>

                    </div>

                ))

            )}

        </div>
    );
}

export default Queue;