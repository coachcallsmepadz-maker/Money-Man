import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const BASIQ_API_KEY = process.env.BASIQ_API_KEY;

    if (!BASIQ_API_KEY) {
        return res.status(500).json({ message: 'BASIQ_API_KEY not configured on server' });
    }

    try {
        const response = await axios.post(
            'https://au-api.basiq.io/token',
            'scope=SERVER_ACCESS',
            {
                headers: {
                    'Authorization': `Basic ${BASIQ_API_KEY}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'basiq-version': '3.0'
                }
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Auth Proxy Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Authentication failed' });
    }
}
