import express from 'express';

const router = express.Router();

// TODO: Add vacation routes
router.get('/', (_req, res) => {
    res.json({ message: 'Vacations route' });
});

export default router;
