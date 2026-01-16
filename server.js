import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const BASIQ_API_KEY = process.env.BASIQ_API_KEY;

if (!BASIQ_API_KEY) {
  console.error('ERROR: BASIQ_API_KEY is not set in .env');
}

app.use(cors());
app.use(express.json());

// Proxy for Basiq Auth Token
app.post('/api/auth', async (req, res) => {
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
    res.json(response.data);
  } catch (error) {
    console.error('Auth Proxy Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Authentication failed' });
  }
});

// Proxy for creating a user
app.post('/api/users', async (req, res) => {
  try {
    const { email, mobile } = req.body;
    const tokenResponse = await axios.post(
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

    const response = await axios.post(
      'https://au-api.basiq.io/users',
      { email, mobile },
      {
        headers: {
          'Authorization': `Bearer ${tokenResponse.data.access_token}`,
          'Content-Type': 'application/json',
          'basiq-version': '3.0'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Create User Proxy Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Failed to create user' });
  }
});

// Proxy for generating Basiq Connect Auth Link
app.post('/api/connect-link', async (req, res) => {
  try {
    const { userId } = req.body;

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

    res.json(linkResponse.data);
  } catch (error) {
    console.error('Connect Link Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Failed to generate connect link' });
  }
});

app.listen(PORT, () => {
  console.log(`Basiq Proxy Server running on http://localhost:${PORT}`);
});
