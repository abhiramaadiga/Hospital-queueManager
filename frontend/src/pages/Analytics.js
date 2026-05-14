import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';

const COLORS = ['#ff4d4d', '#ffaa00', '#44bb44'];

function Analytics() {
    const [data, setData ] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/patients/analytics')
            .then(res => setData(res.data));
    }, []);

    if (!data) return <p style ={{ padding: '24px'}} >Loading analytics...</p>;

    const pieData = [
        { name: 'Critical', value: data.critical },
        { name: 'Moderate', value: data.moderate },
        { name: 'Mild', value: data.mild }

    ];

    const barData = [
        { name: 'Totlal', count: data.total },
        { name: 'Served', count: data.served },
        { name: 'Waiting', count: data.waiting }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <h2>Analytics Dashboard </h2>
            <div style={{ display: 'flex', gap: '48px', flexWrap: 'warp', marginTop: '24px'}}>
                <div>
                    <h3>Severity Distribution</h3>
                    <PieChart width={320} height={280}>
                        <Pie data={pieData} cx={160} cy={120} outerRadius={100} dataKey="value" label>
                            {pieData.map((_, i) => <Cell key={1} fill={COLORS[i]}/>)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
                <div>
                    <h3>Patient Status Overview</h3>
                    <BarChart width={320} height={280} data={barData}>
                        <XAxis datakey="name" /><YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#01696f" radius={[4,4,0,0]} />

                    </BarChart>
                </div>
            </div>
        </div>
    );
}

export default Analytics;