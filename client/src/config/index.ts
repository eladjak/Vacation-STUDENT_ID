const config = {
    api: {
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3005',
        endpoints: {
            login: '/api/auth/login',
            register: '/api/auth/register',
            health: '/api/health'
        }
    }
};

export default config; 