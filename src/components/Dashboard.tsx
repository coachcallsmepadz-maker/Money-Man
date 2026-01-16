import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    type ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ArrowUpRight, ArrowDownRight, Activity, DollarSign, Calendar } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

type Timeframe = '3days' | 'week' | 'month';

const Dashboard: React.FC = () => {
    const [timeframe, setTimeframe] = useState<Timeframe>('month');

    // Multi-timeframe data sets
    const dataMap = {
        '3days': {
            labels: ['Yesterday', 'Today', 'Tomorrow (Est)'],
            income: [120, 450, 300],
            spending: [80, 210, 150]
        },
        'week': {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            income: [800, 1200, 950, 1100, 1400, 400, 300],
            spending: [600, 550, 800, 700, 900, 1200, 400]
        },
        'month': {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            income: [4200, 4100, 4800, 5200, 5100, 5800, 6200],
            spending: [2800, 3200, 2900, 3100, 3900, 3500, 3240]
        }
    };

    const currentData = dataMap[timeframe];

    const incomeData = {
        labels: currentData.labels,
        datasets: [
            {
                fill: true,
                label: 'Income',
                data: currentData.income,
                borderColor: '#00ff88',
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const spendingData = {
        labels: currentData.labels,
        datasets: [
            {
                fill: true,
                label: 'Spending',
                data: currentData.spending,
                borderColor: '#ff4d4d',
                backgroundColor: 'rgba(255, 77, 77, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e1e1e',
                titleColor: '#00ff88',
                bodyColor: '#ffffff',
                borderColor: '#333333',
                borderWidth: 1,
            }
        },
        scales: {
            y: {
                grid: { color: '#333333' },
                ticks: { color: '#666666' },
            },
            x: {
                grid: { display: false },
                ticks: { color: '#666666' },
            },
        },
    };

    const transactions = [
        { id: 1, name: 'Apple Store', category: 'Technology', amount: -1299.00, date: 'Oct 24, 2023' },
        { id: 2, name: 'Monthly Salary', category: 'Income', amount: 5400.00, date: 'Oct 23, 2023' },
        { id: 3, name: 'Uber Eats', category: 'Food & Drink', amount: -42.50, date: 'Oct 22, 2023' },
        { id: 4, name: 'Amazon Prime', category: 'Subscription', amount: -14.99, date: 'Oct 21, 2023' },
    ];

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>Financial Overview</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Welcome back, Alex. Here's what's happening with your money.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', background: 'var(--bg-card)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                        <Calendar size={16} style={{ marginLeft: '0.75rem', color: 'var(--text-muted)' }} />
                        <select
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value as Timeframe)}
                            style={{
                                background: 'transparent',
                                color: 'var(--text-primary)',
                                border: 'none',
                                padding: '0.5rem 1rem 0.5rem 0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                outline: 'none'
                            }}
                        >
                            <option value="3days">3 Days</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                    </div>
                    <button className="btn-primary">Connect Bank</button>
                </div>
            </header>

            <div className="dashboard-grid">
                {/* Top Row: Total Balance */}
                <div className="card" style={{ gridColumn: 'span 3' }}>
                    <div className="card-title">Total Balance</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                        <div className="card-value">$24,560.00</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-green)', fontSize: '0.875rem' }}>
                            <ArrowUpRight size={16} />
                            <span>+2.5% since last month</span>
                        </div>
                    </div>
                </div>

                {/* Concept Group 1: Income */}
                <div style={{ gridColumn: 'span 1.5', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card" style={{ height: 'fit-content' }}>
                        <div className="card-title">Monthly Income {timeframe === 'month' ? '' : `(${timeframe})`}</div>
                        <div className="card-value income">${timeframe === 'month' ? '8,400.00' : timeframe === 'week' ? '5,150.00' : '870.00'}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', color: 'var(--accent-green)', fontSize: '0.875rem' }}>
                            <Activity size={16} />
                            <span>On track</span>
                        </div>
                    </div>
                    <div className="card chart-container" style={{ gridColumn: 'span 1', flex: 1 }}>
                        <div className="card-title">Income Trend</div>
                        <div style={{ height: '300px', marginTop: '1rem' }}>
                            <Line data={incomeData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                {/* Concept Group 2: Expenses */}
                <div style={{ gridColumn: 'span 1.5', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card" style={{ height: 'fit-content' }}>
                        <div className="card-title">Monthly Expenses {timeframe === 'month' ? '' : `(${timeframe})`}</div>
                        <div className="card-value expense">${timeframe === 'month' ? '3,240.00' : timeframe === 'week' ? '5,120.00' : '440.00'}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', color: '#ff4d4d', fontSize: '0.875rem' }}>
                            <ArrowDownRight size={16} />
                            <span>Trending</span>
                        </div>
                    </div>
                    <div className="card chart-container" style={{ gridColumn: 'span 1', flex: 1 }}>
                        <div className="card-title">Outcome Trend</div>
                        <div style={{ height: '300px', marginTop: '1rem' }}>
                            <Line data={spendingData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                <div className="transaction-list" style={{ marginTop: 0 }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', fontWeight: 700 }}>
                        Recent Transactions
                    </div>
                    {transactions.map(tx => (
                        <div key={tx.id} className="transaction-item">
                            <div className="transaction-icon">
                                <DollarSign size={20} />
                            </div>
                            <div>
                                <div className="transaction-name">{tx.name}</div>
                                <div className="transaction-category">{tx.category} • {tx.date}</div>
                            </div>
                            <div className={`transaction-amount ${tx.amount > 0 ? 'income' : ''}`}>
                                {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card">
                    <div className="card-title">Spending by Category</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                        {['Housing', 'Food', 'Transport', 'Entertainment'].map((cat, i) => (
                            <div key={cat} style={{ width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                    <span>{cat}</span>
                                    <span>{40 - i * 10}%</span>
                                </div>
                                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-dark)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: `${40 - i * 10}%`, height: '100%', backgroundColor: 'var(--accent-green)' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
