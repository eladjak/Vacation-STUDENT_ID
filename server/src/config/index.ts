export default {
    server: {
        port: process.env.PORT || 3005,
        env: process.env.NODE_ENV || 'development',
        clientUrl: process.env.CLIENT_URL || 'http://localhost:3000'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: '24h'
    },
    bcrypt: {
        saltRounds: 10
    }
}; 