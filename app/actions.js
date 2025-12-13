'use server';

import axios from 'axios';

let accessToken = null;
let tokenExpiry = null;

const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || process.env.TWITCH_CLIENT_ID;
// SECURE: This is only available on the server
const clientSecret = process.env.TWITCH_CLIENT_SECRET || process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET;

async function getNewAccessToken() {
    try {
        if (!clientSecret) {
            throw new Error('Twitch Client Secret is not configured');
        }

        const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials'
            }
        });

        accessToken = response.data.access_token;
        // Set expiry to slightly less than the returned expires_in to be safe
        tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000;

        return accessToken;
    } catch (error) {
        console.error('Error getting access token:', error.response?.data || error.message);
        throw new Error('Failed to authenticate with Twitch');
    }
}

async function getValidToken() {
    if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
        return accessToken;
    }
    return await getNewAccessToken();
}

/**
 * Fetches data from Twitch API securely on the server
 * @param {string} endpoint - The Twitch API endpoint (e.g., 'users', 'videos')
 * @param {object} params - Query parameters for the request
 * @returns {Promise<object>} - The data from Twitch
 */
export async function fetchFromTwitch(endpoint, params = {}) {
    try {
        const token = await getValidToken();

        const response = await axios.get(`https://api.twitch.tv/helix/${endpoint}`, {
            params,
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${token}`,
            },
        });

        return { data: response.data.data };
    } catch (error) {
        // Handle 401 Unauthorized via recursion (one retry)
        if (error.response?.status === 401) {
            try {
                // Force token refresh
                const newToken = await getNewAccessToken();
                const response = await axios.get(`https://api.twitch.tv/helix/${endpoint}`, {
                    params,
                    headers: {
                        'Client-ID': clientId,
                        'Authorization': `Bearer ${newToken}`,
                    },
                });
                return { data: response.data.data };
            } catch (retryError) {
                console.error('Error retry fetching from Twitch:', retryError.response?.data || retryError.message);
                throw new Error('Failed to fetch data from Twitch after retry');
            }
        }

        console.error('Error fetching from Twitch:', error.response?.data || error.message);
        throw new Error('Failed to fetch data from Twitch');
    }
}
