import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { Bar } from 'react-chartjs-2';

const AdvancedDashboard = ({ token }) => {
    const [stats, setStats] = useState([]);
    const [period, setPeriod] = useState('month'); // Mặc định là "month"

    const fetchStats = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/order/stats`, {
                params: { period },
                headers: { token },
            });

            if (response.data.success) {
                setStats(response.data.stats);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [period]);

    const labels = period === 'month'
        ? Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`)
        : Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`);

    const data = {
        labels,
        datasets: [
            {
                label: 'Revenue ($)',
                data: stats.map((stat) => stat.revenue),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Profit ($)',
                data: stats.map((stat) => stat.profit),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
            {
                label: 'Orders',
                data: stats.map((stat) => stat.orders),
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
            },
        ],
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Advanced Dashboard</h1>
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setPeriod('month')}
                    className={`px-4 py-2 rounded ${period === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    Last 12 Months
                </button>
                <button
                    onClick={() => setPeriod('week')}
                    className={`px-4 py-2 rounded ${period === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    Last 12 Weeks
                </button>
            </div>
            <div className="w-full max-w-4xl mx-auto">
                <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </div>
        </div>
    );
};

export default AdvancedDashboard;
