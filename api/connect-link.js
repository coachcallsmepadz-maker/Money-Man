import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const BASIQ_API_KEY = process.env.BASIQ_API_KEY;
    const { userId } = req.body;

    if (!BASIQ_API_KEY) {
        return res.status(500).json({ message: 'BASIQ_API_KEY not configured on server' });
    }

    try {
        // 1. Get CLIENT_ACCESS token for the user
        const tokenResponse = await axios.post(
            'https://au-api.basiq.io/token',
            `scope=CLIENT_ACCESS&userId=${userId}`,
            {
                headers: {
                    'Authorization': `Basic ${BASIQ_API_KEY}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'basiq-version': '3.0'
                }
            }
        );

        // 2. Generate the auth link
        const linkResponse = await axios.post(
            `https://au-api.basiq.io/users/${userId}/auth_link`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${tokenResponse.data.access_token}`,
                    'basiq-version': '3.0'
                }
            }
        );

        res.status(200).json(linkResponse.data);
    } catch (error) {
        console.error('Connect Link Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Failed to generate connect link' });
    }
}
