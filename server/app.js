const express = require('express');
const app = express();

// ... קוד קיים ...

// נקודת קצה לבדיקת בריאות
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// ... קוד קיים ...

module.exports = app;
