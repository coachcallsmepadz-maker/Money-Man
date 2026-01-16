import axios from 'axios';

const PROXY_URL = '/api';

export const basiqClient = {
    getAuthToken: async () => {
        const response = await axios.post(`${PROXY_URL}/auth`);
        return response.data;
    },

    createUser: async (email: string, mobile: string) => {
        const response = await axios.post(`${PROXY_URL}/users`, { email, mobile });
        return response.data;
    },

    getConnectLink: async (userId: string) => {
        const response = await axios.post(`${PROXY_URL}/connect-link`, { userId });
        return response.data;
    },

    // Note: Most financial data fetching will happen via the client-side using the access token
    // generated for the user once they connect their bank via Basiq Connect.
};
