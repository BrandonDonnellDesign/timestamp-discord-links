import axios from 'axios';

let accessToken = process.env.NEXT_PUBLIC_TWITCH_AUTH_TOKEN;
const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET;

// Function to get a new access token using client credentials
async function getNewAccessToken() {
  try {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }
    });

    accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

// Create an axios instance for Twitch API calls
const twitchApi = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
  headers: {
    'Client-ID': clientId,
    'Authorization': `Bearer ${accessToken}`,
  },
});

// Add a response interceptor to handle token refresh
twitchApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get new access token
        const newToken = await getNewAccessToken();
        
        // Update the authorization header
        twitchApi.defaults.headers['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        
        // Retry the original request
        return twitchApi(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Function to make authenticated Twitch API requests
export async function fetchFromTwitch(endpoint, params = {}) {
  try {
    const response = await twitchApi.get(endpoint, { params });
    // Return the data array directly since Twitch API returns { data: [...] }
    return { data: response.data.data };
  } catch (error) {
    console.error('Error fetching from Twitch:', error);
    throw error;
  }
}

export default twitchApi; 